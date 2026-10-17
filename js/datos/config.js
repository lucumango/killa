// =====================================================================
// CONFIGURACIÓN GENERAL — edita libremente
// =====================================================================
const CONFIG = {
  titulo: 'Killa',
  subtitulo: '',   // texto chico debajo del título (vacío = nada)
  fondoMenu: 'assets/img/fondo_menu.png',   // dibujo detrás del menú. null = solo color de fondo
  imagenCaja: 'assets/img/caja.png',  // dibujo de la caja de diálogo. null = rectángulo con borde
                           // El PNG va de 660 x 150 (o el doble, se estira solo).
  tituloEnElFondo: true,   // true = el título ya está pintado en fondoMenu, así que no se escribe encima
  fondoDedicatoria: 'assets/img/fondo_dedicatoria.png',  // el dibujo detrás de la dedicatoria.
                           // Pantalla entera: 960 x 600 (o más grande, misma proporción). null = azul liso
  fondoTarjeta: 'assets/img/fondo_dedicatoria.png',      // lo mismo para las tarjetas ("Capítulo 1 | La
                           // carretera", "PUNTO DE GUARDADO", "CONTINUARÁ"). null = azul liso
  fondoTexto: 'assets/img/fondo_dedicatoria.png',        // lo mismo para las pantallas de Instrucciones,
                           // Créditos y Agradecimientos. null = azul liso
  primerCapitulo: 'cap01',           // archivo de js/datos/guion/ con el que empieza la partida

  // ---------- Modo demo ----------
  // Corta la partida al llegar a esa etiqueta del guion ('capitulo:etiqueta') y muestra
  // la tarjeta de abajo. `null` = se juega el juego entero. No toca el guion: para
  // alargar o acortar la demo solo cambias el nombre de la etiqueta.
  //   'cap01:sutiyqa'          ~13 min — hasta el loro y conocer a los hermanos
  //   'cap01:whatsapp_mama_1'  ~20 min — + la lección de pronunciación, corta cuando vibra el celular
  //   'cap01:camino_ferreteria' ~21 min — + los chats de la mamá y el Yape
  demoHasta: 'cap01:whatsapp_mama_1',
  tarjetaDemo: 'FIN DE LA DEMO | Lo que sigue todavía lo estamos haciendo. | Mientras tanto, quédate conversando con ellos.',

  // Al acabarse la demo, en vez de volver al menú, te deja el celular abierto para
  // seguir chateando con Flor y Amaru. `false` = vuelve al menú y ya.
  demoChatLibre: true,
  demoPista: 'C o Esc abre y cierra el celular  ·  Enter para volver al menú',
  // Con qué mensajes arrancan esos chats. Sin esto los contactos ni salen en la lista,
  // porque están ocultos hasta que les llega algo. Formato: 'contacto | quién | texto',
  // donde "quién" es `yo` o el id del personaje. Edítalos como quieras.
  demoChatsIniciales: [
    'flor | flor | oe ya te agregué',
    'flor | flor | practica conmigo ah, no te hagas',
    'amaru | amaru | soy amaru',
    'amaru | amaru | si escribes mal te corrijo, avisado estás',
    'grupo | flor | BIENVENIDO AL GRUPO',
    'grupo | flor | regla 1: se intenta en quechua',
    'grupo | amaru | regla 2: no hay regla 2',
  ],

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
  audioAlPasarMouse: false, // en la lista de palabras cada palabra tiene su botón "oír".
                           // true = además suena al pasar el mouse por encima (molesto, pero ahí está)

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

  // ---------- Quien cruza la pantalla (@cruzar en el guion) ----------
  // Qué tan grande sale cada uno, en px (la pantalla mide 600 de alto).
  // `_` es el tamaño por defecto; el resto son excepciones por nombre de sprite.
  altoCruce: { _: 230, gato: 105, gato_corre: 105 },
  pisoCruce: 150,          // a qué altura pisa, contando desde abajo (la caja de diálogo tapa 170)

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
    activa: true,            // necesita el servidor corriendo: cd servidor-ia && npm start
                             // si no está, el chat usa solo las respuestas locales y no se rompe nada
    url: 'http://localhost:8787/chat',   // cuando lo subas a internet, pon la URL pública del servidor
    maxHistorial: 20,                    // cuántos mensajes previos se le mandan a la IA
  },
};
