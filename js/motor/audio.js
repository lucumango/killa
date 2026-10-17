// Audio: música (loop), efectos, audios de palabras y el "beep" al hablar.
// El beep se genera con WebAudio (sin archivos). Si un personaje tiene
// `beep: 'assets/audio/sfx/algo.wav'` en personajes.js se usa ese archivo.
const Audio_ = {
  ctx: null,
  musica: null,
  musicaActual: null,
  volMusica: 0.6,
  volSfx: 0.8,

  // El navegador solo permite sonido después de una interacción del usuario;
  // la pantalla de dedicatoria ("presiona cualquier tecla") sirve para eso.
  activar() {
    if (!Audio_.ctx) Audio_.ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (Audio_.ctx.state === 'suspended') Audio_.ctx.resume();
  },

  // La música pasa por WebAudio: un filtro pasa-bajos y un volumen.
  // Así, para dejar oír una voz encima, en vez de bajarle el volumen a secas
  // se le bajan los agudos (que es lo que recomienda cualquier músico: la pista
  // se va "atrás" pero se sigue sintiendo). Y los cambios de pista van con fundido.
  _pista: null,     // { el, gan, filtro }
  _viejas: [],      // pistas apagándose

  _armar(el) {
    const c = Audio_.ctx;
    if (!c) return null;                       // sin WebAudio: volumen pelado
    const src = c.createMediaElementSource(el);
    const filtro = c.createBiquadFilter();
    filtro.type = 'lowpass'; filtro.frequency.value = 20000; filtro.Q.value = 0.0001;
    const gan = c.createGain(); gan.gain.value = 0;
    src.connect(filtro); filtro.connect(gan); gan.connect(c.destination);
    return { filtro, gan };
  },
  _rampa(param, valor, ms) {
    const c = Audio_.ctx, t = c.currentTime;
    param.cancelScheduledValues(t);
    param.setValueAtTime(param.value, t);
    if (ms > 0) param.linearRampToValueAtTime(valor, t + ms / 1000); else param.setValueAtTime(valor, t);
  },

  reproducirMusica(nombre) {
    if (nombre === Audio_.musicaActual) return;
    const fundido = CONFIG.fundidoMusica == null ? 900 : CONFIG.fundidoMusica;
    Audio_.pararMusica(fundido);
    if (!nombre || nombre === 'off') return;
    const el = new Audio(`assets/audio/musica/${nombre}`);
    el.crossOrigin = 'anonymous';
    // Pistas con intro (CONFIG.bucleMusica): suenan enteras la primera vez y
    // después repiten solo desde ese segundo, para no repetir la entrada.
    const desde = (CONFIG.bucleMusica || {})[nombre];
    if (desde > 0) {
      el.loop = false;
      el.addEventListener('ended', () => { el.currentTime = desde; el.play().catch(() => {}); });
    } else el.loop = true;
    const nodos = Audio_._armar(el);
    if (!nodos) el.volume = 0;                 // sin WebAudio arrancamos en silencio y subimos a mano
    el.play().catch(() => console.warn('No se pudo reproducir música:', nombre));
    Audio_._pista = { el, ...(nodos || {}) };
    Audio_.musica = el; Audio_.musicaActual = nombre;
    Audio_.ajustarMusica(fundido);             // entra con fundido
  },

  pararMusica(ms) {
    const p = Audio_._pista;
    Audio_._pista = null; Audio_.musica = null; Audio_.musicaActual = null;
    if (!p) return;
    const dur = ms == null ? (CONFIG.fundidoMusica == null ? 900 : CONFIG.fundidoMusica) : ms;
    if (!dur || !p.gan) { p.el.pause(); return; }
    Audio_._viejas.push(p);
    Audio_._rampa(p.gan.gain, 0, dur);
    setTimeout(() => { p.el.pause(); Audio_._viejas = Audio_._viejas.filter((x) => x !== p); }, dur + 60);
  },
  // Efectos. CONFIG.velocidadSfx = a qué velocidad suena cada uno (2 = al doble).
  // CONFIG.volumenSfx = cuánto se le sube a cada uno. Por encima de 1 no alcanza
  // un <audio> normal (su tope es 1), así que esos van por WebAudio, con un
  // limitador detrás para que subirle no lo haga reventar.
  _bufers: {},
  _buffer(ruta) {
    if (ruta in Audio_._bufers) return Promise.resolve(Audio_._bufers[ruta]);
    return fetch(ruta).then((r) => r.arrayBuffer()).then((d) => Audio_.ctx.decodeAudioData(d))
      .then((b) => (Audio_._bufers[ruta] = b))
      .catch(() => (Audio_._bufers[ruta] = null));
  },
  sfx(nombre) {
    const ruta = `assets/audio/sfx/${nombre}`;
    const vel = (CONFIG.velocidadSfx || {})[nombre] || 1;
    const sube = (CONFIG.volumenSfx || {})[nombre] || 1;
    const normal = () => {
      const a = new Audio(ruta);
      a.volume = Math.min(1, Audio_.volSfx * sube);
      if (vel !== 1) a.playbackRate = vel;
      a.play().catch(() => console.warn('No existe el sfx:', nombre));
    };
    if (sube <= 1 || !Audio_.ctx) return normal();
    Audio_._buffer(ruta).then((buf) => {
      if (!buf) return normal();
      const c = Audio_.ctx;
      const src = c.createBufferSource(); src.buffer = buf; src.playbackRate.value = vel;
      const g = c.createGain(); g.gain.value = Audio_.volSfx * sube;
      // Recorte suave: en vez de cortar los picos en seco los va doblando,
      // así se puede subir bastante sin que suene roto.
      const suave = c.createWaveShaper(); suave.curve = Audio_._curvaSuave(); suave.oversample = '4x';
      src.connect(g); g.connect(suave); suave.connect(c.destination);
      Audio_.agacharMusica();                       // que la música se haga a un lado
      src.onended = () => Audio_.levantarMusica();
      src.start();
    });
  },
  _curva: null,
  _curvaSuave() {
    if (Audio_._curva) return Audio_._curva;
    const n = 2048, c = new Float32Array(n);
    for (let i = 0; i < n; i++) { const x = (i / (n - 1)) * 2 - 1; c[i] = Math.tanh(x * 1.6) / Math.tanh(1.6); }
    return (Audio_._curva = c);
  },
  // ---------- volumen de la música ----------
  // Dos cosas la bajan y no se pisan entre ellas:
  //   _agachada  = cuántas palabras del celular están sonando encima
  //   _factorOjos = 1 con los ojos abiertos, baja al cerrarlos (@ojos)
  // Cuánto está "tapada" la música, de 0 a 1. Se tapa por dos motivos y gana el mayor:
  //   _agachada = hay una voz sonando encima (una palabra del celular, el mareo)
  //   _ojos     = los párpados cerrados
  _agachada: 0, _ojos: 0,
  _bajo() { return CONFIG.musicaAtenuada == null ? 0.4 : CONFIG.musicaAtenuada; },
  _corte() { return CONFIG.filtroAtenuado == null ? 900 : CONFIG.filtroAtenuado; },
  _tapado() { return Math.max(Audio_._agachada > 0 ? 1 : 0, Audio_._ojos); },
  nivelMusica() { return Audio_.volMusica * (1 - Audio_._tapado() * (1 - Audio_._bajo())); },

  // Pone el volumen y el filtro donde toca, con el fundido que le pidas.
  // El filtro es lo que hace que la pista se vaya "para atrás" en vez de
  // simplemente bajar: se le quitan los agudos (lo que recomendó Luis).
  ajustarMusica(ms) {
    const p = Audio_._pista; if (!p) return;
    const dur = ms == null ? 300 : ms;
    if (!p.gan) { p.el.volume = Audio_.nivelMusica(); return; }   // sin WebAudio
    Audio_._rampa(p.gan.gain, Audio_.nivelMusica(), dur);
    const corte = 20000 - Audio_._tapado() * (20000 - Audio_._corte());
    Audio_._rampa(p.filtro.frequency, corte, dur);
  },

  // Con los ojos: 0 = abiertos del todo, 1 = cerrados del todo.
  musicaPorOjos(cerrado) {
    Audio_._ojos = Math.max(0, Math.min(1, cerrado));
    Audio_.ajustarMusica(0);
  },

  agacharMusica() { Audio_._agachada++; Audio_.ajustarMusica(180); },
  levantarMusica() {
    if (Audio_._agachada > 0) Audio_._agachada--;
    if (Audio_._agachada > 0) return;            // todavía suena otra encima
    Audio_.ajustarMusica(650);                   // vuelve de a poquito, no de golpe
  },

  // Audio de una palabra del celular. Devuelve false si no hay archivo.
  // Mientras suena, la música de fondo se agacha para que se oiga bien.
  palabra(ruta) {
    if (!ruta) return false;
    const a = new Audio(ruta);
    a.volume = 1;
    Audio_.agacharMusica();
    let listo = false;
    const fin = () => { if (listo) return; listo = true; Audio_.levantarMusica(); };
    a.addEventListener('ended', fin); a.addEventListener('error', fin);
    a.play().catch(() => { U.aviso('Sin audio todavía: ' + ruta.split('/').pop()); fin(); });
    setTimeout(fin, 6000);   // red de seguridad, por si nunca llega el "ended"
    return true;
  },

  // Beep tipo Undertale: un pulso corto por letra.
  _beepArchivo: {},
  beep(personaje) {
    const p = personaje || {};
    // CONFIG.volumenBeep: qué tan fuerte es el "beep beep" al hablar.
    const vol = CONFIG.volumenBeep == null ? 0.14 : CONFIG.volumenBeep;
    if (p.beep) { // archivo propio
      const a = Audio_._beepArchivo[p.beep] || (Audio_._beepArchivo[p.beep] = new Audio(p.beep));
      a.currentTime = 0; a.volume = Math.min(1, Audio_.volSfx * vol * 8); a.play().catch(() => {});
      return;
    }
    if (!Audio_.ctx) return;
    const c = Audio_.ctx, o = c.createOscillator(), g = c.createGain();
    o.type = p.onda || 'square';
    o.frequency.value = (p.tono || 300) * (0.95 + Math.random() * 0.1);
    g.gain.setValueAtTime(vol, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.05);
    o.connect(g).connect(c.destination);
    o.start(); o.stop(c.currentTime + 0.05);
  },
};
