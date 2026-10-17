// =====================================================================
// REGISTRO PARA EL ESTUDIO
// Anota lo que hace el jugador para poder analizarlo después. No guarda
// nada personal: solo el código de participante que tú le des (K01, K02...).
//
// Se enciende con CONFIG.estudio.activo = true en config.js.
// Al terminar la demo sale un botón "Descargar mis datos" que baja un .json.
//
// Lo que anota: cuándo empezó y terminó, cada decisión que tomó, qué miró en
// la plaza, qué palabras aprendió y cuáles escuchó, cuándo abrió el celular,
// y cada mensaje del chat con lo que le contestaron.
// =====================================================================
const Registro = {
  activo: false,
  codigo: '',
  inicio: 0,
  eventos: [],

  // Código de participante. Si no hay, se inventa uno y se guarda en el
  // navegador, para que si vuelve a jugar siga siendo el mismo. Así la gente
  // que juega lejos no tiene que escribir nada: lo lee y lo copia al formulario.
  CLAVE_GUARDADA: 'killa-participante',
  CLAVE_INTENTOS: 'killa-intentos',
  miCodigo() {
    if (Registro.codigo) return Registro.codigo;
    let c = null;
    try { c = localStorage.getItem(Registro.CLAVE_GUARDADA); } catch {}
    if (!c) {
      const letras = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';   // sin I, O, 0, 1: se confunden
      c = 'K-' + Array.from({ length: 4 }, () => letras[Math.floor(Math.random() * letras.length)]).join('');
      try { localStorage.setItem(Registro.CLAVE_GUARDADA, c); } catch {}
    }
    Registro.codigo = c;
    return c;
  },

  encender(codigo) {
    Registro.activo = !!(CONFIG.estudio && CONFIG.estudio.activo);
    if (!Registro.activo) return;
    Registro.codigo = String(codigo || Registro.codigo || '').trim() || Registro.miCodigo();
    Registro.inicio = Date.now();
    Registro.eventos = [];
    // Cuántas veces ha jugado ya esta persona. Sirve para distinguir
    // "el mismo jugó dos veces" de "a dos jugadores les tocó el mismo código".
    let n = 0;
    try { n = Number(localStorage.getItem(Registro.CLAVE_INTENTOS)) || 0; } catch {}
    Registro.intento = n + 1;
    try { localStorage.setItem(Registro.CLAVE_INTENTOS, String(Registro.intento)); } catch {}
    Registro._ultimoEnviado = 0;
    Registro.anotar('inicio', { navegador: navigator.userAgent.slice(0, 120), pantalla: `${screen.width}x${screen.height}` });
    Registro.vigilar();
  },

  anotar(que, datos) {
    if (!Registro.activo) return;
    Registro.eventos.push({
      t: Math.round((Date.now() - Registro.inicio) / 100) / 10,   // segundos desde que empezó
      que,
      ...(datos || {}),
    });
  },

  // Lo que se descarga al final
  resumen() {
    const porTipo = {};
    for (const e of Registro.eventos) porTipo[e.que] = (porTipo[e.que] || 0) + 1;
    const chats = Registro.eventos.filter((e) => e.que === 'chat_envia');
    return {
      participante: Registro.codigo || '(sin código)',
      intento: Registro.intento || 1,     // 1 = su primera partida
      empezo: new Date(Registro.inicio).toISOString(),
      termino: new Date().toISOString(),
      duracion_min: Math.round((Date.now() - Registro.inicio) / 6000) / 10,
      palabras_aprendidas: (typeof Motor !== 'undefined' ? Motor.palabras : []).slice(),
      cuantas_palabras: (typeof Motor !== 'undefined' ? Motor.palabras.length : 0),
      palabras_escuchadas: [...new Set(Registro.eventos.filter((e) => e.que === 'palabra_oye').map((e) => e.palabra))],
      decisiones: Registro.eventos.filter((e) => e.que === 'elige').map((e) => e.texto),
      miro_en_la_plaza: [...new Set(Registro.eventos.filter((e) => e.que === 'mira').map((e) => e.cosa))],
      mensajes_enviados: chats.length,
      veces_abrio_el_celular: porTipo.celular_abre || 0,
      cuenta_por_tipo: porTipo,
      eventos: Registro.eventos,
    };
  },

  // Manda la partida al servidor, para no depender de que el jugador te
  // pase el archivo. Si no hay servidor o falla, no pasa nada: el botón de
  // descargar sigue estando. CONFIG.estudio.enviar lo enciende.
  url() {
    const base = (typeof Chat !== 'undefined' && Chat.urlIA) ? Chat.urlIA() : '';
    return base ? base.replace(/\/chat$/, '/registro') : '';
  },

  async enviar(parcial) {
    if (!Registro.activo || !(CONFIG.estudio && CONFIG.estudio.enviar)) return false;
    const url = Registro.url();
    if (!url) return false;
    const cuerpo = JSON.stringify({ ...Registro.resumen(), parcial: !!parcial });
    Registro._ultimoEnviado = Registro.eventos.length;
    try {
      const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: cuerpo });
      Registro._enviado = r.ok;
      return r.ok;
    } catch { Registro._enviado = false; return false; }
  },

  // Va mandando lo que lleva cada tanto y al cerrar la pestaña, para que si
  // alguien abandona a mitad no se pierda todo (y se vea DÓNDE lo dejó).
  _ultimoEnviado: 0, _reloj: null, _vigilando: false,
  vigilar() {
    if (Registro._vigilando || !Registro.activo) return;
    if (!(CONFIG.estudio && CONFIG.estudio.enviar)) return;
    Registro._vigilando = true;
    const cada = Math.max(15, Number(CONFIG.estudio.cadaSegundos) || 60) * 1000;
    Registro._reloj = setInterval(() => {
      if (Registro.eventos.length > Registro._ultimoEnviado) Registro.enviar(true);
    }, cada);
    // Al cerrar o cambiar de pestaña: sendBeacon llega aunque la página se vaya.
    const alIrse = () => {
      if (!Registro.activo || Registro.eventos.length <= Registro._ultimoEnviado) return;
      const url = Registro.url();
      if (!url || !navigator.sendBeacon) return;
      Registro._ultimoEnviado = Registro.eventos.length;
      try {
        // text/plain a propósito: con application/json el navegador pediría
        // permiso con un preflight, y sendBeacon no puede hacerlo al cerrar.
        navigator.sendBeacon(url, new Blob([JSON.stringify({ ...Registro.resumen(), parcial: true })],
          { type: 'text/plain;charset=UTF-8' }));
      } catch {}
    };
    window.addEventListener('pagehide', alIrse);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') alIrse(); });
  },

  descargar() {
    const d = Registro.resumen();
    const nombre = `killa_${(Registro.codigo || 'anon').replace(/[^\w-]/g, '')}_${new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-')}.json`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' }));
    a.download = nombre;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    return nombre;
  },

  // Caja para escribir el código de participante, en el menú.
  pedirCodigo() {
    if (!(CONFIG.estudio && CONFIG.estudio.activo)) return;
    let c = U.$('#codigo-estudio');
    if (!c) {
      c = document.createElement('div'); c.id = 'codigo-estudio'; c.className = 'codigo-estudio';
      c.innerHTML = '<label for="cod">Tu código de participante</label>'
        + '<div class="codigo-fila"><input id="cod" maxlength="12" autocomplete="off" spellcheck="false">'
        + '<button type="button" id="cod-copiar">copiar</button></div>'
        + '<small>Antes de jugar, apunta este código: te lo van a pedir en el formulario.</small>';
      U.$('#pantalla-menu').appendChild(c);
      const i = c.querySelector('input');
      i.addEventListener('keydown', (e) => e.stopPropagation());   // que no muevan el menú al escribir
      i.addEventListener('input', () => { Registro.codigo = i.value.trim(); });
      const bc = c.querySelector('#cod-copiar');
      bc.addEventListener('keydown', (e) => e.stopPropagation());
      bc.onclick = async () => {
        try { await navigator.clipboard.writeText(i.value); }
        catch { i.select(); try { document.execCommand('copy'); } catch {} }
        bc.textContent = 'copiado'; setTimeout(() => (bc.textContent = 'copiar'), 1600);
      };
    }
    c.querySelector('input').value = Registro.miCodigo();
    c.hidden = false;
  },

  // Botón de descarga, al terminar
  ofrecerDescarga(donde) {
    if (!Registro.activo) return;
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'boton-datos';
    b.textContent = 'Descargar mis datos';
    const cod = document.createElement('div');
    cod.className = 'codigo-final';
    cod.innerHTML = 'Tu código: <b>' + Registro.miCodigo() + '</b><small>Ponlo en el formulario de después</small>';
    (donde || U.$('#juego')).appendChild(cod);
    b.onclick = () => { const n = Registro.descargar(); b.textContent = 'Descargado: ' + n; b.disabled = true; };
    // intenta mandarlo solo, en silencio
    Registro.enviar(false).then((ok) => { if (ok) b.textContent = 'Datos enviados ✓ (o descárgalos)'; });
    b.addEventListener('keydown', (e) => e.stopPropagation());
    (donde || U.$('#juego')).appendChild(b);
    return b;
  },
};
