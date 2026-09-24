// Ejecuta: node validar.js   → revisa que el guion no tenga etiquetas rotas, palabras o personajes inexistentes.
const fs = require('fs'), vm = require('vm');
const ctx = { window: {}, console };
vm.createContext(ctx);
for (const f of ['js/datos/config.js', 'js/datos/personajes.js', 'js/datos/palabras.js', 'js/datos/mapas.js']) vm.runInContext(fs.readFileSync(f, 'utf8'), ctx);
ctx.GUION = { archivos: {}, registrar(n, t) { ctx.GUION.archivos[n] = t; } };
for (const f of fs.readdirSync('js/datos/guion')) vm.runInContext(fs.readFileSync('js/datos/guion/' + f, 'utf8'), ctx);
const { PERSONAJES, PALABRAS, MAPAS, CONTACTOS } = vm.runInContext('({PERSONAJES, PALABRAS, MAPAS, CONTACTOS})', ctx); const GUION = ctx.GUION;
const cmds = new Set(['fondo','cuadro','musica','sfx','busto','limpiar','esperar','tarjeta','aprender','var','si','ir','llamar','volver','capitulo','guardar','explorar','mensaje','chat','celular','fin']);
let errores = 0;
const err = (m) => { errores++; console.log('✗', m); };
const todasEtiquetas = {};
for (const [cap, texto] of Object.entries(GUION.archivos)) {
  const etiquetas = new Set(), refs = [];
  texto.split('\n').forEach((raw, i) => {
    const l = raw.trim(); const n = `${cap}:${i + 1}`;
    if (!l || l.startsWith('#')) return;
    if (l.startsWith('==')) { etiquetas.add(l.slice(2).trim()); return; }
    if (l.startsWith('*')) { const m = l.match(/->\s*([\wáéíóúñ_]+)/); if (!m) err(`${n} opción sin -> etiqueta`); else refs.push([m[1], n]); return; }
    if (l.startsWith('@')) {
      const [c, ...a] = l.slice(1).split(/\s+/);
      if (!cmds.has(c.toLowerCase())) err(`${n} comando desconocido @${c}`);
      if (['ir','llamar'].includes(c)) refs.push([a[0], n]);
      if (c === 'si') { const m = l.match(/->\s*(\S+)$/); if (m) refs.push([m[1], n]); }
      if (c === 'aprender') a.forEach((id) => { if (!PALABRAS.find((p) => p.id === id)) err(`${n} palabra no definida: ${id}`); });
      if (c === 'explorar' && !MAPAS[a[0]]) err(`${n} mapa no definido: ${a[0]}`);
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
console.log(errores ? `${errores} error(es)` : '✓ Guion OK');
process.exit(errores ? 1 : 0);
