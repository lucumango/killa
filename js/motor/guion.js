// =====================================================================
// INTÉRPRETE DEL GUION
// Lee los archivos de js/datos/guion/*.js (texto plano) y ejecuta línea
// por línea. El formato está explicado en LEEME.md.
// =====================================================================
// (GUION.registrar está definido en index.html, antes de cargar los capítulos)

const Motor = {
  lineas: [],       // líneas parseadas del capítulo actual
  etiquetas: {},    // nombre -> índice de línea
  capitulo: null,
  pc: 0,            // línea actual
  vars: {},         // variables del guion (@var)
  palabras: [],     // ids de palabras aprendidas
  chats: {},        // historial por contacto (lo maneja Chat)
  estadoEscena: { fondo: null, cuadro: null, musica: null, animacion: null },
  pilaLlamadas: [],
  corriendo: false,
  enExploracion: null, // nombre del mapa si estamos explorando

  // ---------- Parseo ----------
  cargarCapitulo(nombre) {
    const crudo = GUION.archivos[nombre];
    if (crudo == null) throw new Error('No existe el capítulo ' + nombre);
    Motor.capitulo = nombre;
    Motor.lineas = []; Motor.etiquetas = {};
    const reHablante = /^([a-záéíóúñ_]+)\s*(?:\(([a-záéíóúñ_]+)\))?:\s?(.*)$/i;
    crudo.split('\n').forEach((raw, n) => {
      let l = raw.trim();
      if (!l || l.startsWith('#')) return;
      const num = n + 1;
      // [si condición] al inicio: la línea solo corre si se cumple.
      let cond = null;
      const mc = l.match(/^\[si\s+(.+?)\]\s+(.*)$/i);
      if (mc) { cond = mc[1]; l = mc[2]; }
      const empujar = (obj) => { if (cond) obj.cond = cond; Motor.lineas.push(obj); };
      if (l.startsWith('==')) { Motor.etiquetas[l.slice(2).trim()] = Motor.lineas.length; return; }
      if (l.startsWith('*')) {
        const m = l.slice(1).match(/^(.*?)\s*->\s*([\wáéíóúñ_]+)\s*(?:\[si\s+(.+)\])?$/i);
        if (!m) { console.warn(`Opción mal escrita (línea ${num}): ${l}`); return; }
        empujar({ tipo: 'opcion', texto: m[1].trim(), ir: m[2], si: m[3] || null, num });
        return;
      }
      if (l.startsWith('@')) {
        const [cmd, ...resto] = l.slice(1).split(/\s+/);
        empujar({ tipo: 'cmd', cmd: cmd.toLowerCase(), args: resto, arg: resto.join(' '), num });
        return;
      }
      const m = l.match(reHablante);
      if (m && (PERSONAJES[m[1].toLowerCase()] || m[1].toLowerCase() === 'narrador')) {
        empujar({ tipo: 'dialogo', quien: m[1].toLowerCase(), emocion: (m[2] || '').toLowerCase(), texto: m[3], num });
      } else {
        empujar({ tipo: 'dialogo', quien: 'narrador', emocion: '', texto: l, num });
      }
    });
  },

  // ---------- Estado / guardado ----------
  estado() {
    return {
      capitulo: Motor.capitulo, pc: Motor.pc, vars: Motor.vars, palabras: Motor.palabras,
      chats: Chat.historial, escena: Motor.estadoEscena, exploracion: Motor.enExploracion,
      yape: Yape.estado(),
    };
  },
  restaurar(est) {
    Motor.cargarCapitulo(est.capitulo);
    Motor.pc = est.pc; Motor.vars = est.vars || {}; Motor.palabras = est.palabras || [];
    Chat.historial = est.chats || Chat.historialInicial();
    Motor.estadoEscena = est.escena || { fondo: null, cuadro: null, musica: null, animacion: null };
    Motor.enExploracion = est.exploracion || null;
    Yape.restaurar(est.yape);
  },
  nuevaPartida() {
    Motor.vars = {}; Motor.palabras = []; Chat.historial = Chat.historialInicial(); Yape.reiniciar();
    Motor.estadoEscena = { fondo: null, cuadro: null, musica: null, animacion: null }; Motor.enExploracion = null;
    Motor.cargarCapitulo(CONFIG.primerCapitulo); Motor.pc = 0;
  },

  aprender(ids) {
    let nuevas = 0;
    ids.forEach((id) => {
      if (!PALABRAS.find((p) => p.id === id)) { console.warn('Palabra no definida en palabras.js:', id); return; }
      if (!Motor.palabras.includes(id)) { Motor.palabras.push(id); U.aviso('CEL · Nueva palabra: ' + id); nuevas++; }
    });
    // un solo sonido aunque entren varias palabras de golpe
    if (nuevas && CONFIG.sfxPalabraNueva) Audio_.sfx(CONFIG.sfxPalabraNueva);
  },

  // Condiciones: "nombre == valor", "nombre != valor", "nombre > 3", "nombre" (existe y no vacío),
  // "true", y combinaciones con && (y), || (o), ! (no) y paréntesis.
  evaluar(expr) {
    const toks = String(expr).match(/\(|\)|&&|\|\||==|!=|>=|<=|>|<|!|[^\s()!&|<>=]+/g) || [];
    let i = 0;
    const ver = () => toks[i], tomar = () => toks[i++];
    const comparar = () => {
      const nombre = tomar();
      if (nombre === 'true') return true;
      if (nombre === 'false') return false;
      const v = Motor.vars[nombre];
      const op = ver();
      if (!['==', '!=', '>=', '<=', '>', '<'].includes(op)) return !!v;
      tomar();
      const crudo = tomar() ?? '';
      const w = isNaN(crudo) ? crudo : Number(crudo);
      const x = v === undefined || v === '' || isNaN(v) ? v : Number(v);
      switch (op) { case '==': return x == w; case '!=': return x != w; case '>': return x > w; case '<': return x < w; case '>=': return x >= w; case '<=': return x <= w; }
      return false;
    };
    const primario = () => {
      if (ver() === '!') { tomar(); return !primario(); }
      if (ver() === '(') { tomar(); const r = o(); if (ver() === ')') tomar(); return r; }
      return comparar();
    };
    const y = () => { let r = primario(); while (ver() === '&&') { tomar(); const d = primario(); r = r && d; } return r; };
    const o = () => { let r = y(); while (ver() === '||') { tomar(); const d = y(); r = r || d; } return r; };
    try { return o(); } catch (e) { console.warn('Condición mal escrita:', expr); return false; }
  },

  // Reemplaza {variable} por su valor, y {variable:2} con dos decimales (para la plata).
  interpolar(texto) {
    return texto.replace(/\{([\wáéíóúñ]+)(?::(\d))?\}/g, (_, n, d) => {
      const v = Motor.vars[n];
      if (v === undefined) return '';
      return d !== undefined && !isNaN(v) ? Number(v).toFixed(Number(d)) : String(v);
    });
  },

  saltar(etiqueta) {
    if (!(etiqueta in Motor.etiquetas)) throw new Error('No existe la etiqueta == ' + etiqueta);
    Motor.pc = Motor.etiquetas[etiqueta];
  },

  // ---------- Bucle principal ----------
  async correr() {
    if (Motor.corriendo) return;
    Motor.corriendo = true;
    Pantallas.mostrar('escena');
    await Dialogo.aplicarEscena(Motor.estadoEscena);
    try {
      while (Motor.corriendo && Motor.pc < Motor.lineas.length) {
        if (await Motor.cortarDemo()) break;
        const L = Motor.lineas[Motor.pc];
        try { await Motor.ejecutar(L); }
        catch (e) { console.error(`Error en línea ${L.num} del guion (${L.tipo} ${L.cmd || ''}):`, e); U.aviso('Error en guion, línea ' + L.num); Motor.pc++; }
      }
      if (Motor.corriendo) await Motor.terminar();
    } finally { Motor.corriendo = false; }
  },
  async terminar() {
    Motor.corriendo = false; Audio_.pararMusica(); Dialogo.limpiar();
    Menu.mostrar();
  },

  // Corte de la demo (CONFIG.demoHasta, en config.js). Al llegar a esa etiqueta
  // muestra la tarjeta de despedida y vuelve al menú. Con null se juega entero.
  async cortarDemo() {
    if (!CONFIG.demoHasta) return false;
    const [cap, et] = String(CONFIG.demoHasta).split(':');
    if (Motor.capitulo !== cap) return false;
    if (Motor.etiquetas[et] === undefined) {
      if (!Motor._avisoDemo) { Motor._avisoDemo = true; console.warn(`CONFIG.demoHasta: no existe la etiqueta == ${et} en ${cap}`); }
      return false;
    }
    if (Motor.pc !== Motor.etiquetas[et]) return false;
    Audio_.pararMusica();
    await Dialogo.tarjeta(String(CONFIG.tarjetaDemo || 'FIN DE LA DEMO').replace(/\s*\|\s*/g, '\n'));
    await Motor.terminar();
    return true;
  },

  async ejecutar(L) {
    if (L.cond && L.tipo !== 'opcion' && !Motor.evaluar(L.cond)) { Motor.pc++; return; }
    if (L.tipo === 'dialogo') {
      Motor.pc++;
      await Dialogo.decir(L.quien, L.emocion, Motor.interpolar(L.texto));
      return;
    }
    if (L.tipo === 'opcion') { // bloque de opciones consecutivas
      const ops = [];
      let i = Motor.pc;
      while (i < Motor.lineas.length && Motor.lineas[i].tipo === 'opcion') { ops.push(Motor.lineas[i]); i++; }
      const visibles = ops.filter((o) => (!o.si || Motor.evaluar(o.si)) && (!o.cond || Motor.evaluar(o.cond)))
        .map((o) => ({ ...o, texto: Motor.interpolar(o.texto) }));
      if (!visibles.length) { console.warn('Menú sin opciones visibles (línea ' + L.num + ')'); Motor.pc = i; return; }
      const elegida = await Dialogo.elegir(visibles);
      Motor.pc = i;
      Motor.saltar(elegida.ir);
      return;
    }
    // ---------- comandos ----------
    const a = L.args, arg = L.arg;
    Motor.pc++;
    switch (L.cmd) {
      case 'fondo':      Motor.estadoEscena.fondo = arg === 'off' ? null : arg; Motor.estadoEscena.cuadro = null; await Dialogo.aplicarEscena(Motor.estadoEscena); break;
      case 'cuadro':     Motor.estadoEscena.cuadro = arg === 'off' ? null : arg; await Dialogo.aplicarEscena(Motor.estadoEscena); break;
      case 'musica':     Motor.estadoEscena.musica = arg === 'off' ? null : arg; Audio_.reproducirMusica(Motor.estadoEscena.musica); break;
      case 'animacion':  Motor.estadoEscena.animacion = (arg === 'off' || arg === 'ninguna') ? null : arg; await Animacion.iniciar(Motor.estadoEscena.animacion); break;
      case 'sfx':        Audio_.sfx(arg); break;
      case 'busto':      if (arg === 'off') Dialogo.ocultarBusto(); else await Dialogo.mostrarBusto(a[0], a[1] || 'neutral'); break;
      case 'limpiar':    Dialogo.limpiar(); break;
      case 'esperar':    await U.espera(Number(arg) || 500); break;
      case 'tarjeta':    await Dialogo.tarjeta(arg.replace(/\s*\|\s*/g, '\n')); break;
      case 'aprender':   Motor.aprender(a); break;
      case 'yape':       Yape.comando(Motor.interpolar(arg)); break;   // @yape -{cuenta} Kiosko
      case 'var': {      const m = arg.match(/^(\S+)\s*(\+=|-=|=)\s*(.*)$/); if (!m) throw new Error('@var mal escrito');
                         const crudo = Motor.interpolar(m[3]);   // permite @var plata = {yape}
                         const val = isNaN(crudo) ? crudo.trim() : Number(crudo);
                         if (m[2] === '=') Motor.vars[m[1]] = val; else if (m[2] === '+=') Motor.vars[m[1]] = (Number(Motor.vars[m[1]]) || 0) + val; else Motor.vars[m[1]] = (Number(Motor.vars[m[1]]) || 0) - val;
                         break; }
      case 'si': {       const m = arg.match(/^(.*?)\s*->\s*(\S+)$/); if (!m) throw new Error('@si mal escrito'); if (Motor.evaluar(m[1])) Motor.saltar(m[2]); break; }
      case 'ir':         Motor.saltar(arg); break;
      case 'llamar':     Motor.pilaLlamadas.push(Motor.pc); Motor.saltar(arg); break;
      case 'volver':     if (Motor.pilaLlamadas.length) Motor.pc = Motor.pilaLlamadas.pop(); else if (Motor.enExploracion) { Motor.corriendo = false; } break;
      case 'capitulo':   Motor.cargarCapitulo(arg); Motor.pc = 0; break;
      case 'guardar':    Guardado.guardar(Motor.estado()); break;
      case 'explorar':   await Motor.explorar(arg); break;
      case 'mensaje': {  const m = arg.match(/^(\S+)\s*\|\s*(\S+)\s*\|\s*(.*)$/) || arg.match(/^(\S+)\s*\|\s*(.*)$/);
                         if (!m) throw new Error('@mensaje mal escrito');
                         if (m.length === 4) Chat.agregar(m[1], m[2], m[3]); else Chat.agregar(m[1], m[1], m[2]);
                         break; }
      case 'chat':       await Celular.abrirDesdeGuion(a[0], a[1] || 'leer'); break;
      case 'celular':    await Celular.abrirDesdeGuion(null, 'leer'); break;
      case 'fin':        await Motor.terminar(); break;
      default:           console.warn('Comando desconocido @' + L.cmd + ' (línea ' + L.num + ')');
    }
  },

  // Exploración: corre el mapa hasta que un objeto haga `ir:` a una etiqueta.
  async explorar(mapa) {
    Motor.enExploracion = mapa;
    Dialogo.limpiar();
    const destino = await Exploracion.correr(mapa);
    Motor.enExploracion = null;
    Pantallas.mostrar('escena');
    await Dialogo.aplicarEscena(Motor.estadoEscena);
    if (destino) Motor.saltar(destino);
  },
  // Sub-guion disparado por un objeto del mapa (corre hasta @volver).
  async subGuion(etiqueta) {
    const pcGuardado = Motor.pc;
    Motor.saltar(etiqueta);
    let destino = null;
    while (Motor.pc < Motor.lineas.length) {
      const L = Motor.lineas[Motor.pc];
      if (L.cond && L.tipo !== 'opcion' && !Motor.evaluar(L.cond)) { Motor.pc++; continue; }
      if (L.tipo === 'cmd' && L.cmd === 'volver') { Motor.pc++; break; }
      if (L.tipo === 'cmd' && L.cmd === 'ir') { destino = L.arg; Motor.pc++; break; } // @ir dentro de un sub-guion termina la exploración
      await Motor.ejecutar(L);
    }
    Dialogo.limpiar();
    if (!destino) Motor.pc = pcGuardado;
    return destino;
  },
};
