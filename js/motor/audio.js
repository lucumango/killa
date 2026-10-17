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

  reproducirMusica(nombre) {
    if (nombre === Audio_.musicaActual) return;
    Audio_.pararMusica();
    if (!nombre || nombre === 'off') return;
    const a = new Audio(`assets/audio/musica/${nombre}`);
    a.volume = Audio_.volMusica;
    // Pistas con intro (CONFIG.bucleMusica): suenan enteras la primera vez y
    // después repiten solo desde ese segundo, para no repetir la entrada.
    const desde = (CONFIG.bucleMusica || {})[nombre];
    if (desde > 0) {
      a.loop = false;
      a.addEventListener('ended', () => { a.currentTime = desde; a.play().catch(() => {}); });
    } else a.loop = true;
    a.play().catch(() => console.warn('No se pudo reproducir música:', nombre));
    Audio_.musica = a; Audio_.musicaActual = nombre;
  },
  pararMusica() {
    if (Audio_.musica) { Audio_.musica.pause(); Audio_.musica = null; Audio_.musicaActual = null; }
  },
  sfx(nombre) {
    const a = new Audio(`assets/audio/sfx/${nombre}`);
    a.volume = Audio_.volSfx;
    // CONFIG.velocidadSfx: a qué velocidad suena cada efecto (2 = al doble).
    const v = (CONFIG.velocidadSfx || {})[nombre];
    if (v > 0) a.playbackRate = v;
    a.play().catch(() => console.warn('No existe el sfx:', nombre));
  },
  // Baja la música mientras suena otra cosa encima y la devuelve a su sitio
  // al terminar (CONFIG.musicaAtenuada). Aguanta que le den a varias seguidas.
  _agachada: 0, _subiendo: null,
  agacharMusica() {
    const m = Audio_.musica; if (!m) return;
    Audio_._agachada++;
    if (Audio_._subiendo) { clearInterval(Audio_._subiendo); Audio_._subiendo = null; }
    const bajo = CONFIG.musicaAtenuada == null ? 0.12 : CONFIG.musicaAtenuada;
    m.volume = Math.min(m.volume, Audio_.volMusica * bajo);
  },
  levantarMusica() {
    if (Audio_._agachada > 0) Audio_._agachada--;
    if (Audio_._agachada > 0) return;            // todavía suena otra encima
    const m = Audio_.musica; if (!m) return;
    if (Audio_._subiendo) clearInterval(Audio_._subiendo);
    Audio_._subiendo = setInterval(() => {       // vuelve de a poquito, no de golpe
      const m2 = Audio_.musica;
      if (!m2 || m2.volume >= Audio_.volMusica - 0.01) {
        if (m2) m2.volume = Audio_.volMusica;
        clearInterval(Audio_._subiendo); Audio_._subiendo = null; return;
      }
      m2.volume = Math.min(Audio_.volMusica, m2.volume + Audio_.volMusica * 0.08);
    }, 40);
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
    if (p.beep) { // archivo propio
      const a = Audio_._beepArchivo[p.beep] || (Audio_._beepArchivo[p.beep] = new Audio(p.beep));
      a.currentTime = 0; a.volume = Audio_.volSfx * 0.5; a.play().catch(() => {});
      return;
    }
    if (!Audio_.ctx) return;
    const c = Audio_.ctx, o = c.createOscillator(), g = c.createGain();
    o.type = p.onda || 'square';
    o.frequency.value = (p.tono || 300) * (0.95 + Math.random() * 0.1);
    g.gain.setValueAtTime(0.06, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.05);
    o.connect(g).connect(c.destination);
    o.start(); o.stop(c.currentTime + 0.05);
  },
};
