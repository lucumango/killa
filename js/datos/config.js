// =====================================================================
// CONFIGURACIÓN GENERAL — edita libremente
// =====================================================================
const CONFIG = {
  titulo: 'Killa',
  subtitulo: '',   // texto chico debajo del título (vacío = nada)
  fondoMenu: 'assets/img/fondo_menu.png',   // dibujo detrás del menú. null = solo color de fondo
  imagenCaja: null,        // ej: 'assets/img/caja.png' para que la caja de diálogo sea un dibujo tuyo
                           // en vez del rectángulo con borde. El PNG va de 660 x 150 (o el doble).
  tituloEnElFondo: true,   // true = el título ya está pintado en fondoMenu, así que no se escribe encima
  primerCapitulo: 'cap01',           // archivo de js/datos/guion/ con el que empieza la partida

  // Pantalla de inicio (antes del menú). Usa saltos de línea normales.
  dedicatoria: `A quienes parten en busca de las estrellas
y guardan, entre sus palabras, el camino de regreso.`,

  instrucciones: `Enter / Espacio / Z ........ avanzar el texto (o saltar la animación)
Flechas / W A S D .......... moverte cuando exploras
E .......................... interactuar con cosas y personas
C .......................... abrir / cerrar el celular
Esc ........................ cerrar el celular / volver

En el celular puedes ver las palabras en quechua que vas aprendiendo
(toca una para escucharla) y chatear con la gente que conozcas.
Si escribes en quechua y no se entiende... te pueden dejar en visto.

El juego se guarda solo en los puntos de guardado.`,

  creditos: `Guion e ilustraciones: (tu nombre)
Código: hecho con cariño en HTML/JS
Música: (pendiente)
Voces en quechua: (pendiente)`,

  agradecimientos: `A Flor, a Amaru y a Puku, que no existen pero casi.
A la gente de Ayacucho.
A quien lea esto.`,

  // ---------- Texto ----------
  velocidadTexto: 28,      // milisegundos por letra (menos = más rápido)
  beepAlHablar: true,      // "beep beep" tipo Undertale mientras habla un personaje
  beepCadaLetras: 2,       // 1 = beep en cada letra, 2 = cada dos letras, etc.
  narradorOcultaBusto: false, // true = cuando narra, se esconde el busto del último que habló

  // ---------- Audio ----------
  musicaMenu: null,        // ej: 'menu.mp3' (en assets/audio/musica/). null = sin música
  sfxMensaje: null,        // ej: 'mensaje.wav' (en assets/audio/sfx/) cuando llega un chat
  sfxPalabraNueva: 'wand.mp3', // al aprender una palabra. Si entran varias de golpe, suena UNA sola vez. null = sin sonido
  audioAlPasarMouse: true, // en la lista de palabras: true = suena al pasar el mouse; false = solo al hacer clic

  // ---------- Arte ----------
  estiloPixel: false,      // true = TODO se escala con bordes duros (juego 100 % pixel). false = bustos, fondos y mapa de exploración suavizados (dibujo a línea)

  // ---------- Yape (la app de plata del celular) ----------
  yape: {
    titular: 'Ariel Cosimo Villanueva',  // el nombre que sale en la tarjeta
    saldoInicial: 0,          // con cuánta plata empieza
    moneda: 'S/',
    sfx: null,                // ej: 'yape.mp3' cuando entra plata. null = sin sonido
    sfxPago: null,            // ej: 'yape_pago.mp3' al pagar. null = usa el de arriba
  },

  // ---------- Exploración ----------
  colorJugador: '#f2d16b',
  verChoques: false,       // true = pinta de rojo las casillas por donde no se puede caminar (para calzar el dibujo con la grilla)

  // ---------- Teclas ----------
  teclas: {
    avanzar: ['Enter', ' ', 'z', 'Z'],
    saltar: ['x', 'X', 'Control'],   // completa el texto de golpe
    cancelar: ['Escape'],
    interactuar: ['e', 'E', 'Enter', ' '],
    celular: ['c', 'C', 'Tab'],
  },

  // ---------- IA para el chat ----------
  // Si activa = false, el chat responde con reglas locales (ver js/datos/ia.js → RESPUESTAS_LOCALES).
  // Si activa = true, manda los mensajes al servidor de servidor-ia/ (que guarda la clave del API).
  ia: {
    activa: false,
    url: 'http://localhost:8787/chat',   // cuando lo subas a internet, pon la URL pública del servidor
    maxHistorial: 20,                    // cuántos mensajes previos se le mandan a la IA
  },
};
