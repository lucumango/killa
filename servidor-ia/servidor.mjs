// =====================================================================
// SERVIDOR PROXY PARA LA IA DEL CHAT
// El juego (navegador) NO puede guardar la clave del API sin que se vea.
// Este servidor la guarda y hace la llamada. Correr con:
//   cd servidor-ia && npm install && cp .env.example .env && npm start
//
// Funciona con Google (Gemini) o con Anthropic (Claude): pon UNA de las dos
// claves en .env y el servidor elige sola. El prompt sale del juego
// (js/datos/ia.js), acá no se escribe nada del personaje.
// =====================================================================
import http from 'node:http';
import fs from 'node:fs';

// Carga .env sin dependencias
if (fs.existsSync('.env')) for (const l of fs.readFileSync('.env', 'utf8').split('\n')) { const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2]; }

// Render (y casi cualquier hosting) manda el puerto en PORT.
const PUERTO = Number(process.env.PORT || process.env.PUERTO || 8787);
// Dominios permitidos. Se admite * al principio: *.hwcdn.net cubre los
// subdominios al azar con los que itch.io sirve los juegos.
const ORIGENES = (process.env.ORIGENES || 'http://localhost:8765').split(',').map((s) => s.trim()).filter(Boolean);
const sinEsquema = (s) => String(s).replace(/^https?:\/\//, '').replace(/\/+$/, '');
const origenVale = (o) => ORIGENES.some((p) => {
  if (p === '*' || p === o) return true;
  const pp = sinEsquema(p), oo = sinEsquema(o);
  if (pp.startsWith('*.')) return oo === pp.slice(2) || oo.endsWith(pp.slice(1));
  return pp === oo;
});

// Freno simple por IP, para que nadie se cuelgue de tu clave.
const PETICIONES_POR_MINUTO = Number(process.env.LIMITE_POR_MINUTO || 20);
const visitas = new Map();
function pasaElFreno(ip) {
  const ahora = Date.now(), min = 60_000;
  const lista = (visitas.get(ip) || []).filter((t) => ahora - t < min);
  if (lista.length >= PETICIONES_POR_MINUTO) { visitas.set(ip, lista); return false; }
  lista.push(ahora); visitas.set(ip, lista);
  if (visitas.size > 500) for (const [k, v] of visitas) if (!v.some((t) => ahora - t < min)) visitas.delete(k);
  return true;
}
const CLAVE_GOOGLE = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const PROVEEDOR = CLAVE_GOOGLE ? 'google' : 'anthropic';
const MODELO = process.env.MODELO || (PROVEEDOR === 'google' ? 'gemini-3.6-flash' : 'claude-opus-5');
// Si el modelo de arriba está saturado (pasa), se reintenta y después se usa este.
const MODELO_RESPALDO = process.env.MODELO_RESPALDO || (PROVEEDOR === 'google' ? 'gemini-3.5-flash-lite' : '');

// Lo que tiene que devolver el modelo, sí o sí.
const VISTO = { accion: 'visto', mensajes: [], quien: [] };
const ESQUEMA = {
  type: 'OBJECT',
  properties: {
    accion: { type: 'STRING', enum: ['responder', 'visto'] },
    mensajes: { type: 'ARRAY', items: { type: 'STRING' } },
    quien: { type: 'ARRAY', items: { type: 'STRING' } },
  },
  required: ['accion', 'mensajes', 'quien'],
};

// historial: [{rol:'user'|'assistant', quien, texto}]. Se juntan turnos seguidos del mismo rol.
function armarTurnos(cuerpo) {
  const turnos = [];
  for (const m of cuerpo.historial || []) {
    const texto = m.rol === 'assistant' ? `[${m.quien}] ${m.texto}` : m.texto;
    const ult = turnos[turnos.length - 1];
    if (ult && ult.rol === m.rol) ult.texto += '\n' + texto; else turnos.push({ rol: m.rol, texto });
  }
  if (!turnos.length || turnos[0].rol !== 'user') turnos.unshift({ rol: 'user', texto: '(inicio del chat)' });
  if (turnos[turnos.length - 1].rol !== 'user') turnos.push({ rol: 'user', texto: '(sigue la conversación)' });
  return turnos;
}

async function unaLlamadaGoogle(modelo, sistema, turnos) {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': CLAVE_GOOGLE },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: sistema }] },
      contents: turnos.map((t) => ({ role: t.rol === 'assistant' ? 'model' : 'user', parts: [{ text: t.texto }] })),
      generationConfig: {
        maxOutputTokens: 1024, responseMimeType: 'application/json', responseSchema: ESQUEMA,
        // Chat de WhatsApp: contesta rápido antes que pensar bonito. Sube PENSAR en .env si quieres.
        thinkingConfig: { thinkingBudget: Number(process.env.PENSAR || 0) },
      },
    }),
  });
  if (!r.ok) { const e = new Error(`google ${r.status}: ${(await r.text()).slice(0, 200)}`); e.estado = r.status; throw e; }
  const d = await r.json();
  const txt = d.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';
  try { return JSON.parse(txt); } catch { return VISTO; }
}

// Los modelos se saturan a ratos (503). Reintenta una vez y si no, usa el de respaldo.
async function conGoogle(sistema, turnos) {
  const intentos = [MODELO, MODELO, MODELO_RESPALDO].filter(Boolean);
  let ultimo;
  for (const [i, modelo] of intentos.entries()) {
    try { return await unaLlamadaGoogle(modelo, sistema, turnos); }
    catch (e) {
      ultimo = e;
      if (!(e.estado === 429 || e.estado >= 500)) throw e;   // error de verdad: no insistas
      console.warn(`  ${modelo} ${e.estado}, reintento ${i + 1}/${intentos.length}`);
      await new Promise((r) => setTimeout(r, 400));
    }
  }
  throw ultimo;
}

async function conAnthropic(sistema, turnos) {
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const { z } = await import('zod');
  const { zodOutputFormat } = await import('@anthropic-ai/sdk/helpers/zod');
  const Respuesta = z.object({ accion: z.enum(['responder', 'visto']), mensajes: z.array(z.string()), quien: z.array(z.string()) });
  const client = new Anthropic(); // lee ANTHROPIC_API_KEY
  const r = await client.messages.parse({
    model: MODELO,
    max_tokens: 1024,
    output_config: { effort: 'low', format: zodOutputFormat(Respuesta) },
    system: [{ type: 'text', text: sistema, cache_control: { type: 'ephemeral' } }],
    messages: turnos.map((t) => ({ role: t.rol, content: t.texto })),
  });
  if (r.stop_reason === 'refusal') return VISTO;
  return r.parsed_output || VISTO;
}

async function responder(cuerpo) {
  const turnos = armarTurnos(cuerpo);
  const salida = PROVEEDOR === 'google' ? await conGoogle(cuerpo.sistema, turnos) : await conAnthropic(cuerpo.sistema, turnos);
  // Red de seguridad: que "quien" y "mensajes" midan lo mismo.
  if (!salida || !Array.isArray(salida.mensajes)) return VISTO;
  if (!Array.isArray(salida.quien) || salida.quien.length !== salida.mensajes.length) {
    const uno = cuerpo.contacto || salida.quien?.[0] || '';
    salida.quien = salida.mensajes.map(() => uno);
  }
  return salida;
}

http.createServer(async (req, res) => {
  const origen = req.headers.origin || '';
  const cors = {
    'Access-Control-Allow-Origin': origenVale(origen) ? origen : ORIGENES[0] || 'null',
    'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (req.method === 'OPTIONS') { res.writeHead(204, cors); return res.end(); }
  // Página de estado: sirve para el health check de Render y para que abras
  // la URL en el navegador y veas si está vivo.
  if (req.method === 'GET' && (req.url === '/' || req.url === '/salud')) {
    res.writeHead(200, { ...cors, 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ ok: true, juego: 'Killa', proveedor: PROVEEDOR, modelo: MODELO }));
  }
  if (req.method !== 'POST' || req.url !== '/chat') { res.writeHead(404, cors); return res.end('no'); }
  if (!origenVale(origen)) {
    res.writeHead(403, { ...cors, 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'origen no permitido: ' + origen }));
  }
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || '?';
  if (!pasaElFreno(ip)) {
    res.writeHead(429, { ...cors, 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'muchos mensajes seguidos, espera un ratito' }));
  }
  let datos = '';
  req.on('data', (c) => { datos += c; if (datos.length > 200_000) req.destroy(); });
  req.on('end', async () => {
    try {
      const salida = await responder(JSON.parse(datos));
      res.writeHead(200, { ...cors, 'Content-Type': 'application/json' });
      res.end(JSON.stringify(salida));
    } catch (e) {
      console.error(e);
      res.writeHead(500, { ...cors, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: String(e.message || e) }));
    }
  });
}).listen(PUERTO, '0.0.0.0', () => console.log(`servidor-ia escuchando en el puerto ${PUERTO} (${PROVEEDOR}, modelo ${MODELO}); orígenes: ${ORIGENES.join(', ')}`));
