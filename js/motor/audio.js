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
    a.loop = true; a.volume = Audio_.volMusica;
    a.play().catch(() => console.warn('No se pudo reproducir música:', nombre));
    Audio_.musica = a; Audio_.musicaActual = nombre;
  },
  pararMusica() {
    if (Audio_.musica) { Audio_.musica.pause(); Audio_.musica = null; Audio_.musicaActual = null; }
  },
  sfx(nombre) {
    const a = new Audio(`assets/audio/sfx/${nombre}`);
    a.volume = Audio_.volSfx;
    a.play().catch(() => console.warn('No existe el sfx:', nombre));
  },
  // Audio de una palabra del celular. Devuelve false si no hay archivo.
  palabra(ruta) {
    if (!ruta) return false;
    const a = new Audio(ruta);
    a.play().catch(() => U.aviso('Sin audio todavía: ' + ruta.split('/').pop()));
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
