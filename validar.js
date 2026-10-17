// Ejecuta: node validar.js   → revisa que el guion no tenga etiquetas rotas, palabras o personajes inexistentes.
const fs = require('fs'), vm = require('vm');
const ctx = { window: {}, console };
vm.createContext(ctx);
for (const f of ['js/datos/config.js', 'js/datos/personajes.js', 'js/datos/palabras.js', 'js/datos/mapas.js', 'js/datos/animaciones.js']) vm.runInContext(fs.readFileSync(f, 'utf8'), ctx);
ctx.GUION = { archivos: {}, registrar(n, t) { ctx.GUION.archivos[n] = t; } };
for (const f of fs.readdirSync('js/datos/guion')) vm.runInContext(fs.readFileSync('js/datos/guion/' + f, 'utf8'), ctx);
const { PERSONAJES, PALABRAS, MAPAS, CONTACTOS, ANIMACIONES } = vm.runInContext('({PERSONAJES, PALABRAS, MAPAS, CONTACTOS, ANIMACIONES})', ctx); const GUION = ctx.GUION;
const cmds = new Set(['fondo','cuadro','musica','animacion','ritmo','cruzar','sfx','busto','limpiar','esperar','tarjeta','aprender','var','si','ir','llamar','volver','capitulo','guardar','explorar','mensaje','chat','celular','mapa','ojos','camara','actor','mover','murmullo','velocidad','yape','fin']);
let errores = 0;
const err = (m) => { errores++; console.log('✗', m); };
const todasEtiquetas = {};
// Revisa que una condición tenga paréntesis balanceados y operadores conocidos.
function revisarCondicion(c, n) {
  let p = 0; for (const ch of c) { if (ch === '(') p++; if (ch === ')') p--; if (p < 0) break; }
  if (p !== 0) err(`${n} paréntesis desbalanceados en la condición: ${c}`);
  if (/[^=!<>]=[^=]|(?<!&)&(?!&)|(?<!\|)\|(?!\|)/.test(' ' + c + ' ')) err(`${n} operador raro en la condición (usa ==, !=, &&, ||): ${c}`);
}
for (const [cap, texto] of Object.entries(GUION.archivos)) {
  const etiquetas = new Set(), refs = [];
  texto.split('\n').forEach((raw, i) => {
    let l = raw.trim(); const n = `${cap}:${i + 1}`;
    if (!l || l.startsWith('#')) return;
    const mc = l.match(/^\[si\s+(.+?)\]\s+(.*)$/i);   // [si condición] al inicio de la línea
    if (mc) { revisarCondicion(mc[1], n); l = mc[2]; }
    else if (l.startsWith('[')) err(`${n} condición mal escrita (debe ser "[si ...] texto")`);
    if (l.startsWith('==')) { etiquetas.add(l.slice(2).trim()); return; }
    if (l.startsWith('*')) { const m = l.match(/->\s*([\wáéíóúñ_]+)/); if (!m) err(`${n} opción sin -> etiqueta`); else refs.push([m[1], n]);
      const ms = l.match(/\[si\s+(.+)\]\s*$/); if (ms) revisarCondicion(ms[1], n); return; }
    if (l.startsWith('@')) {
      const [c, ...a] = l.slice(1).split(/\s+/);
      if (!cmds.has(c.toLowerCase())) err(`${n} comando desconocido @${c}`);
      if (['ir','llamar'].includes(c)) refs.push([a[0], n]);
      if (c === 'si') { const m = l.match(/^@si\s+(.*?)\s*->\s*(\S+)$/); if (m) { refs.push([m[2], n]); revisarCondicion(m[1], n); } else err(`${n} @si mal escrito`); }
      if (c === 'aprender') a.forEach((id) => { if (!PALABRAS.find((p) => p.id === id)) err(`${n} palabra no definida: ${id}`); });
      if (c === 'explorar' && !MAPAS[a[0]]) err(`${n} mapa no definido: ${a[0]}`);
      if (c === 'animacion' && !['off','ninguna'].includes(a[0]) && !ANIMACIONES[a[0]]) err(`${n} animación no definida: ${a[0]}`);
      if (c === 'yape' && !/^(saldo\s+)?[+-]?(\d+([.,]\d+)?|\{[\wáéíóúñ]+\})(\s|$)/i.test(a.join(' '))) err(`${n} @yape mal escrito: ${a.join(' ')}`);
      if (c === 'capitulo' && !GUION.archivos[a[0]]) err(`${n} capítulo no definido: ${a[0]}`);
      if (c === 'mensaje') { const m = a.join(' ').split('|')[0].trim(); if (!CONTACTOS[m]) err(`${n} contacto no definido: ${m}`); }
      if (c === 'chat' && a[0] && !CONTACTOS[a[0]]) err(`${n} contacto no definido: ${a[0]}`);
      return;
    }
    const m = l.match(/^([a-záéíóúñ_]+)\s*(?:\(([a-záéíóúñ_]+)\))?:\s/i);
    if (m && !PERSONAJES[m[1].toLowerCase()] && m[1].toLowerCase() !== 'narrador') console.log('⚠', `${n} "${m[1]}:" no es un personaje → se mostrará como narración`);
  });
  refs.forEach(([e, n]) => { if (!etiquetas.has(e)) err(`${n} etiqueta no existe: ${e}`); });
  todasEtiquetas[cap] = etiquetas;
  // objetos de mapas que apuntan a etiquetas
}
for (const [nombre, M] of Object.entries(MAPAS)) for (const o of (M.objetos || []).concat(M.personajes || [])) {
  const e = o.accion || o.ir; if (!e) continue;
  if (!Object.values(todasEtiquetas).some((s) => s.has(e))) err(`mapa ${nombre}, objeto ${o.id}: etiqueta no existe: ${e}`);
}
// Sonidos que el guion pide y todavía no están en assets/audio/sfx/.
// No es un error: el juego sigue andando sin ellos, solo se queda callado en esa línea.
{
  const pedidos = new Map();   // archivo de sonido -> dónde se pide
  const anota = (f, donde) => { if (f) (pedidos.get(f) || pedidos.set(f, []).get(f)).push(donde); };
  for (const [cap, texto] of Object.entries(GUION.archivos))
    texto.split('\n').forEach((raw, i) => { const m = raw.trim().match(/^@sfx\s+(\S+)/i); if (m) anota(m[1], `${cap}:${i + 1}`); });
  const CONFIG = vm.runInContext('CONFIG', ctx) || {};
  anota(CONFIG.sfxPalabraNueva, 'config.js (sfxPalabraNueva)');
  anota(CONFIG.sfxMensaje, 'config.js (sfxMensaje)');
  anota(CONFIG.yape?.sfx, 'config.js (yape.sfx)');
  anota(CONFIG.yape?.sfxPago, 'config.js (yape.sfxPago)');
  for (const [nombre, M] of Object.entries(MAPAS)) for (const o of (M.objetos || []).concat(M.personajes || []))
    anota(o.sfxCerca, `mapa ${nombre}, objeto ${o.id}`);
  const faltan = [...pedidos].filter(([f]) => !fs.existsSync('assets/audio/sfx/' + f));
  if (faltan.length) {
    console.log(`\nSonidos que faltan en assets/audio/sfx/ (el juego corre igual, nomás no suena):`);
    faltan.forEach(([f, donde]) => console.log(`   ${f} — ${donde.length === 1 ? '1 vez' : donde.length + ' veces'}: ${donde.slice(0, 3).join(', ')}${donde.length > 3 ? ', ...' : ''}`));
  }
}
console.log(errores ? `${errores} error(es)` : '✓ Guion OK');
process.exit(errores ? 1 : 0);
