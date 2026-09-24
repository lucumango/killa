// =====================================================================
// SERVIDOR PROXY PARA LA IA DEL CHAT
// El juego (navegador) NO puede guardar la clave del API sin que se vea.
// Este servidor la guarda y hace la llamada. Correr con:
//   cd servidor-ia && npm install && cp .env.example .env && npm start
// =====================================================================
import http from 'node:http';
import fs from 'node:fs';
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';

// Carga .env sin dependencias
if (fs.existsSync('.env')) for (const l of fs.readFileSync('.env', 'utf8').split('\n')) { const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2]; }

const PUERTO = Number(process.env.PUERTO || 8787);
const ORIGENES = (process.env.ORIGENES || 'http://localhost:8000').split(',').map((s) => s.trim());
const MODELO = process.env.MODELO || 'claude-opus-5';
const client = new Anthropic(); // lee ANTHROPIC_API_KEY

const Respuesta = z.object({
  accion: z.enum(['responder', 'visto']),
  mensajes: z.array(z.string()),
  quien: z.array(z.string()),
});

async function responder(cuerpo) {
  // historial: [{rol:'user'|'assistant', quien, texto}]. Se juntan turnos seguidos del mismo rol.
  const messages = [];
  for (const m of cuerpo.historial || []) {
    const texto = m.rol === 'assistant' ? `[${m.quien}] ${m.texto}` : m.texto;
    const ult = messages[messages.length - 1];
    if (ult && ult.role === m.rol) ult.content += '\n' + texto; else messages.push({ role: m.rol, content: texto });
  }
  if (!messages.length || messages[0].role !== 'user') messages.unshift({ role: 'user', content: '(inicio del chat)' });
  if (messages[messages.length - 1].role !== 'user') messages.push({ role: 'user', content: '(sigue la conversación)' });

  const r = await client.messages.parse({
    model: MODELO,
    max_tokens: 1024,
    output_config: { effort: 'low', format: zodOutputFormat(Respuesta) },
    system: [{ type: 'text', text: cuerpo.sistema, cache_control: { type: 'ephemeral' } }],
    messages,
  });
  if (r.stop_reason === 'refusal') return { accion: 'visto', mensajes: [], quien: [] };
  return r.parsed_output || { accion: 'visto', mensajes: [], quien: [] };
}

http.createServer(async (req, res) => {
  const origen = req.headers.origin || '';
  const cors = {
    'Access-Control-Allow-Origin': ORIGENES.includes(origen) || ORIGENES.includes('*') ? origen : ORIGENES[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (req.method === 'OPTIONS') { res.writeHead(204, cors); return res.end(); }
  if (req.method !== 'POST' || req.url !== '/chat') { res.writeHead(404, cors); return res.end('no'); }
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
}).listen(PUERTO, () => console.log(`servidor-ia escuchando en http://localhost:${PUERTO}/chat (modelo ${MODELO})`));
