// =====================================================================
// CONFIGURACIÓN GENERAL - edita libremente
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
  //   'cap01:sutiyqa'          ~13 min - hasta el loro y conocer a los hermanos
  //   'cap01:whatsapp_mama_1'  ~20 min - + la lección de pronunciación, corta cuando vibra el celular
  //   'cap01:camino_ferreteria' ~21 min - + los chats de la mamá y el Yape
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
(clic en una para escucharla) y chatear con la gente que vayas conociendo.
Si no se te entiende nada... te pueden dejar en visto jeje

El juego se guarda solo en los puntos de guardado.`,

  creditos: `Validación en quechua y voz: ABNER VILCA RENOJO
intérprete y traductor del quechua chanka,
inscrito en el registro oficial del Ministerio de Cultura, muy amable, dispuesto y paciente!!

Música: Zerovolt0v

SÍGANLO EN KICK Y YOUTUBE, ES INCREÍBLE Y CANTA MUY BONITOOO!!!! <333

Cover del menú GatoSupercalifragilistico!!! El primer beta player

Procesamiento de los audios (quechua) por Nakato156, hizo magia xd

Los otros audios de efectos especiales fueron sacados de recursos
libres, abiertos para todos, y no nos pertenecen! Menos el yape/yapo:
esa es mi voz...

El resto de cosas en el juego fueron hechas por mi persona.

Tengo muchos nombres en internet, pero en la mayoría estoy como
lonelynode (nodo solitario) o lucumango.

Contacto: daniellavargas@ieee.org`,

  agradecimientos: `GRACIAS GRACIAS GRACIAS Al Señor Abner Vilca por prestarnos su voz y validación experta para este increíble proyecto!!!

SULPAYKI a Amorcha, quien fue mi primer acercamiento para aprender quechua y también animó la idea del proyecto.

Gracias A MIS AMIGOS que me motivaron a hacer este proyecto! Gracias a Zerovolt0v quien le dio vida y sonido a esta demo, a GatoSupercalifragilistico por la investigación, la portada y por mostrarme que también puedo. A Nakato156 por el procesamiento de los audios.

Gracias gracias a las personas que me escucharon y apoyaron la locura. Gracias papi, mami, Harvy, gracias Sam!!! gracias Manuel!! gracias Luciano!! gracias Sebas!! gracias Hernan!! Aaron!! Rody!! probablemente se lo conté a más personas-- gracias a mi hermano que sin decir nada también me motivó a dibujar de nuevo!

GRACIAS AL GAMELAB UPC LOS QUIERO MUCHO

GRACIAS A LAS PERSONAS QUE CREAN CONTENIDO EN QUECHUA

GRACIAS a todas las personas que no dejan que una lengua muera! Sea hablando, creando, aprendiendo o compartiendo!

Gracias a quienes inspiraron esta historia.

Y gracias a todos los que están probando esta demo!!!

Pásense por la página que hicimos de recurso junto a Gato! y sigan practicando quechua.

Un abrazote!
Tupananchiskama.
- Dani`,

  // ---------- Texto ----------
  velocidadTexto: 28,      // milisegundos por letra (menos = más rápido)
  beepAlHablar: true,      // "beep beep" tipo Undertale mientras habla un personaje
  volumenBeep: 0.14,       // qué tan fuerte suena ese beep (antes era 0.06 y se perdía)
  beepCadaLetras: 2,       // 1 = beep en cada letra, 2 = cada dos letras, etc.
  narradorOcultaBusto: false, // true = cuando narra, se esconde el busto del último que habló
  pausaCuadro: 1800,       // al aparecer una ilustración a pantalla completa (@cuadro), cuántos
                           // milisegundos se queda sola, sin la caja de texto abajo. 0 = sin pausa

  // ---------- Audio ----------
  musicaMenu: null,        // ej: 'menu.mp3' (en assets/audio/musica/). null = sin música
  // Sonidos del menú principal (en assets/audio/sfx/). null = sin sonido.
  sfxMenuMover: 'menu_mover.mp3',      // al moverte entre las opciones con las flechas
  sfxMenuOpcion: 'menu_opcion.mp3',    // al elegir Instrucciones, Créditos o Agradecimientos
  sfxMenuPartida: 'menu_partida.mp3',  // al elegir Empezar o Continuar partida
  pausaAlEmpezar: 1500,    // antes de arrancar la partida, cuántos milisegundos se queda
                           // el fondo texturizado en pantalla. 0 = empieza de una
  musicaAtenuada: 0.4,     // mientras escuchas una palabra en el celular, la música baja
                           // a esta parte de su volumen (0.4 = 40 %). 1 = no baja nada
  filtroAtenuado: 900,     // además se le quitan los agudos: todo lo que esté por encima
                           // de estos Hz se apaga. Así la pista se va "atrás" y la voz
                           // se oye limpia. 20000 = sin filtro
  fundidoMusica: 900,      // milisegundos de fundido al cambiar de pista o al cortarla
  // A qué velocidad suena cada efecto. 2 = al doble (más gracioso con las voces).
  velocidadSfx: { 'yape.mp3': 2, 'yapo.mp3': 2 },
  // Cuánto se le sube a cada efecto. 3 = al triple. El del mareo venía muy bajito
  // (la mitad de volumen que el ladrido) y con la música encima no se oía.
  volumenSfx: { 'nausea.mp3': 3 },
  // Pistas que tienen intro: suenan enteras la primera vez y después repiten
  // solo desde ese segundo. (El marcador LOOP del wav de Puku cae en 5.486 s.)
  bucleMusica: { 'loro.m4a': 5.486 },
  sfxMensaje: null,        // ej: 'mensaje.wav' (en assets/audio/sfx/) cuando llega un chat
  sfxPalabraNueva: 'wand.mp3', // al aprender una palabra. Si entran varias de golpe, suena UNA sola vez. null = sin sonido
  audioAlPasarMouse: false, // en la lista de palabras cada palabra tiene su botón "oír".
                           // true = además suena al pasar el mouse por encima (molesto, pero ahí está)

  // ---------- Arte ----------
  estiloPixel: false,      // true = TODO se escala con bordes duros (juego 100 % pixel). false = bustos, fondos y mapa de exploración suavizados (dibujo a línea)

  // ---------- Yape (la app de plata del celular) ----------
  yape: {
    titular: 'Ariel Stella Villanueva',  // el nombre que sale en la tarjeta
    saldoInicial: 0,          // con cuánta plata empieza
    moneda: 'S/',
    sfx: 'yape.mp3',          // cuando entra plata (tu voz haciendo el sonidito clásico)
    sfxPago: 'yapo.mp3',      // al pagar. null = usa el de arriba
                              // Los dos van al doble de velocidad; se cambia en velocidadSfx
  },

  // (El tamaño y la caminata de quien cruza la pantalla con @cruzar están
  //  en js/datos/animaciones.js, en la tabla CRUCES.)

  // ---------- Exploración ----------
  colorJugador: '#f2d16b',
  contarExploracion: true, // arriba a la derecha del mapa, cuántas cosas te faltan por mirar.
                           // Solo cuenta las que ya se ven (no delata las escondidas)
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
    url: 'http://localhost:8787/chat',   // el servidor corriendo en TU compu
    // Cuando el juego está subido (itch.io), usa esta en vez de la de arriba.
    // El juego se da cuenta solo: si lo abres en localhost usa la de arriba.
    // Pon acá la URL que te da Render, terminada en /chat.
    urlPublica: 'https://killa-2gpy.onrender.com/chat',
    maxHistorial: 20,                    // cuántos mensajes previos se le mandan a la IA
  },
};
