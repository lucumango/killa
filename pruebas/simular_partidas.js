// Simula partidas completas al azar con el motor real y una interfaz falsa.
// Uso: node pruebas/simular_partidas.js [carpeta del juego] [cantidad de partidas]
// Muestra errores, líneas por capítulo y cuántas palabras se aprenden hasta la elección de ruta.
const fs = require('fs'), vm = require('vm'), path = require('path');
const R = process.argv[2] || path.join(__dirname, '..');
const N = Number(process.argv[3] || 300);
const ctx = { console, window: {}, document: {}, setTimeout, Promise };
vm.createContext(ctx);
const run = (f) => vm.runInContext(fs.readFileSync(path.join(R, f), 'utf8'), ctx, { filename: f });
for (const f of ['js/datos/config.js', 'js/datos/personajes.js', 'js/datos/palabras.js', 'js/datos/mapas.js']) run(f);
// La simulación recorre el juego ENTERO, aunque config.js tenga puesto el corte de la demo.
vm.runInContext('CONFIG.demoHasta = null;', ctx);
vm.runInContext(`var GUION = { archivos: {}, registrar(n, t) { GUION.archivos[n] = t; } };`, ctx);
for (const f of fs.readdirSync(path.join(R, 'js/datos/guion'))) run('js/datos/guion/' + f);
vm.runInContext(`
var log = { textos: [], errores: [], fin: false, etiquetas: new Set(), fondos: new Set(), cuadros: new Set(), bustos: new Set(), chats: 0 };
var U = { aviso() {}, espera: async () => {}, $: () => ({}), $$: () => [] };
var Pantallas = { mostrar() {} };
var Registro = { activo: false, anotar() {}, encender() {}, pedirCodigo() {}, ofrecerDescarga() {} };
var Yape = { comando(t) { const p = t.trim().split(/ +/); const saldo = p[0].toLowerCase() === 'saldo'; const n = Number((saldo ? p[1] : p[0]).replace(',', '.')); if (isNaN(n)) { log.errores.push('yape mal: ' + t); return; } Motor.vars.yape = saldo ? n : Math.round(((Number(Motor.vars.yape) || 0) + n) * 100) / 100; log.yapeMin = Math.min(log.yapeMin ?? 999, Motor.vars.yape); }, reiniciar() {}, estado() { return {}; }, restaurar() {}, pintar() {} };
var Animacion = { iniciar: async () => {}, ritmo() {}, detener() {} };
var Camara = { usarFondo: async () => {}, mover: async () => {}, poner() {}, quitar() {}, caminar: async () => {} };
var Audio_ = { reproducirMusica() {}, pararMusica() {}, sfx() {} };
var Guardado = { guardar() {} };
var Menu = { mostrar() {} };
var Exploracion = { correr: async (m) => (MAPAS[m].objetos || []).find((o) => o.ir).ir };
var Celular = { abierto: false, chatActual: null, abrirDesdeGuion: async () => { log.chats++; }, abrirMapa: async () => { log.mapas = (log.mapas || 0) + 1; }, pintarMensajes() {} };
var Chat = { historial: {}, historialInicial() { return {}; }, agregar(c, de, t) { if (!CONTACTOS[c]) log.errores.push('contacto ' + c); } };
var elegir = null;
var Dialogo = {
  aplicarEscena: async (e) => { if (e.fondo) log.fondos.add(e.fondo); if (e.cuadro) log.cuadros.add(e.cuadro); },
  decir: async (q, em, t) => { log.textos.push((q || '') + ': ' + t); log.porCap = log.porCap || {}; const k = Motor.capitulo + (Motor.capitulo === 'cap03' && log.eligio ? '_post' : ''); log.porCap[k] = (log.porCap[k] || 0) + 1; if (q && q !== 'narrador' && !PERSONAJES[q].sinBusto) log.bustos.add(q + '_' + (em || 'neutral')); if (/\\{|undefined|NaN/.test(t)) log.errores.push('texto raro: ' + t); },
  elegir: async (ops) => elegir(ops),
  tarjeta: async () => {}, limpiar() {}, ocultarBusto() {}, mostrarBusto: async () => {},
  cruzar: async (n) => { if (n) log.cruces = (log.cruces || 0) + 1; },
  ojos: async () => {}, murmullo: async (v, t) => { log.textos.push('murmullo: ' + t); },
};
`, ctx);
run('js/motor/guion.js');
vm.runInContext(`
Motor.terminar = async () => { Motor.corriendo = false; log.fin = true; };
const saltarOrig = Motor.saltar;
Motor.saltar = (e) => { if (e === 'elegir_ruta' || e === 'ir_flor' || e === 'ir_amaru') { if (!log.palabrasDecision) log.palabrasDecision = Motor.palabras.slice(); } log.etiquetas.add(Motor.capitulo + ':' + e); return saltarOrig(e); };
console.error = (...a) => log.errores.push(a.map(String).join(' '));
console.warn = (...a) => log.errores.push('warn ' + a.map(String).join(' '));
`, ctx);
const todas = new Set(), fondos = new Set(), cuadros = new Set(), bustos = new Set();
let errores = 0, sinFin = 0, maxPasos = 0; const resumen = [];
(async () => {
  for (let i = 0; i < N; i++) {
    const inicial = {
      presentacion: ['viaje', 'perdi', 'vivo'][i % 3], amaru_broma: i % 2, pregunta: ['cerro', 'vivido', 'edad', '67'][i % 4],
      amaru_sabe_becas: i % 4 === 1 ? 1 : undefined,
    };
    vm.runInContext(`log.textos = []; log.errores = []; log.fin = false; log.porCap = {}; log.palabrasDecision = null; Motor.vars = ${JSON.stringify(inicial)}; Motor.palabras = []; Motor.pilaLlamadas = []; Motor.cargarCapitulo('cap01'); Motor.pc = 0; log.lineasHasta = {};`, ctx);
    let pasos = 0;
    ctx.elegir = (ops) => { pasos++; if (pasos > 400) throw new Error('bucle'); return ops[Math.floor(Math.random() * ops.length)]; };
    vm.runInContext('Motor.corriendo = false', ctx);
    await vm.runInContext('Motor.correr()', ctx);
    const L = vm.runInContext('log', ctx);
    maxPasos = Math.max(maxPasos, pasos);
    L.etiquetas.forEach((e) => todas.add(e)); L.fondos.forEach((e) => fondos.add(e)); L.cuadros.forEach((e) => cuadros.add(e)); L.bustos.forEach((e) => bustos.add(e));
    if (L.errores.length) { errores++; if (errores < 5) console.log('ERRORES', i, L.errores.slice(0, 5)); }
    if (!L.fin) sinFin++; if ((L.yapeMin ?? 0) < 0) console.log('SALDO NEGATIVO', L.yapeMin); L.yapeMin = undefined; resumen.push({ porCap: {...L.porCap}, dec: L.palabrasDecision ? L.palabrasDecision.length : null, total: vm.runInContext('Motor.palabras.length', ctx), decIds: L.palabrasDecision });
  }
  // etiquetas nunca visitadas
  const nunca = [];
  for (const cap of ['cap03', 'ruta_amaru', 'ruta_flor', 'final']) {
    const etqs = [...GUIONtxt(cap).matchAll(/^== (\S+)/gm)].map((m) => m[1]);
    etqs.forEach((e) => { if (!todas.has(cap + ':' + e)) nunca.push(cap + ':' + e); });
  }
  function GUIONtxt(c) { return vm.runInContext('GUION.archivos', ctx)[c]; }
  console.log(`${N} partidas · con errores: ${errores} · sin llegar al fin: ${sinFin} · máx. elecciones: ${maxPasos}`);
  console.log('etiquetas nunca visitadas (pueden ser de flujo directo):', nunca.join(', ') || 'ninguna');
  const avg = (f) => (resumen.reduce((a, r) => a + f(r), 0) / resumen.length).toFixed(0); const mn = (f) => Math.min(...resumen.map(f)), mx = (f) => Math.max(...resumen.map(f));
  for (const c of ['cap01','cap02','cap03','ruta_amaru','ruta_flor','final']) console.log(c, 'líneas promedio', avg((r) => r.porCap[c] || 0), 'min', mn((r) => r.porCap[c] || 0), 'max', mx((r) => r.porCap[c] || 0));
  console.log('palabras hasta la decisión: min', mn((r) => r.dec), 'promedio', avg((r) => r.dec), 'max', mx((r) => r.dec));
  const posibles = new Set(); resumen.forEach((r) => r.decIds.forEach((i) => posibles.add(i))); console.log('distintas posibles hasta la decisión:', posibles.size, 'de', vm.runInContext('PALABRAS.length', ctx));
  const siempre = [...posibles].filter((i) => resumen.every((r) => r.decIds.includes(i))); console.log('siempre:', siempre.length);
  require('fs').writeFileSync(require('path').join(require('os').tmpdir(), 'killa-palabras-decision.json'), JSON.stringify({ siempre, posibles: [...posibles] })); console.log('no siempre:', [...posibles].filter((i) => !siempre.includes(i)).join(' '));
  console.log('fondos:', [...fondos].sort().join(', '));
  console.log('cuadros:', [...cuadros].join(', '));
  console.log('bustos:', [...bustos].sort().join(', '));
})();
