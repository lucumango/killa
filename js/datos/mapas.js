// =====================================================================
// MAPAS DE EXPLORACIÓN (vista desde arriba)
// Cada carácter de `filas` es una casilla de `tam` píxeles. La leyenda dice
// de qué color se pinta y si es sólida (no se puede pisar).
// objetos: bloques con los que se interactúa (tecla E).
//   accion: 'etiqueta'  → corre esa parte del guion (hasta @volver) y sigue explorando
//   ir: 'etiqueta'      → sale del mapa y salta a esa etiqueta del guion
//   pisar: true         → se activa solo al pisarlo (para salidas)
//   sprite: 'assets/img/sprites/x.png' → si existe se dibuja; si no, bloque de color
// imagen: dibujo del mapa entero (opcional). Se estira sobre todas las casillas, así que
//   debe medir columnas*tam x filas*tam (o el doble). Con imagen, las letras de `filas`
//   solo sirven para los choques: pon CONFIG.verChoques = true para verlos en rojo.
// spriteJugador: sprite del jugador quieto (opcional). Si no existe, un bloque amarillo.
// spriteCaminar: segundo dibujo, con un pie adelante. El motor arma la caminata
//   quieto -> paso -> quieto -> paso volteado, y solo se mueve mientras caminas.
// pasosPorSegundo: qué tan rápido va esa caminata (6 por defecto).
// altoJugador: alto del dibujo en casillas (1.9 por defecto). La casilla de choque no cambia.
// =====================================================================
const MAPAS = {
  plaza: {
    nombre: 'Plaza de Armas de Ayacucho',
    tam: 40, velocidad: 4,
    imagen: 'assets/img/mapas/plaza.png',   // el dibujo: 1920 x 1200 = 48 x 30 casillas
    spriteJugador: 'assets/img/sprites/ariel_base.png',
    spriteCaminar: 'assets/img/sprites/ariel_walk.png',
    pasosPorSegundo: 6, altoJugador: 4,   // Ariel mide 4 casillas: la escala del dibujo
    // Esta grilla ya no se ve: solo dice por dónde NO se puede caminar.
    // Sale del dibujo (donde hay tinta, choca). Para ajustarla a ojo pon
    // verChoques: true en config.js y mueve los # hasta que calce.
    filas: [
      '........########...............###########......',
      '.........#######...............##########.......',
      '.........#######...............########.........',
      '..........###..................######...........',
      '#..........##..................######...........',
      '###......####..................######...........',
      '###......####..................#######........##',
      '###.....######.....................##.......####',
      '####....######........###...................###.',
      '#.........#......############...............####',
      '.................##############.............####',
      '.#####...........##############.............####',
      '#######..........##############..............#..',
      '########.........##############.................',
      '########.........##############..........####...',
      '########.........##############..........#####..',
      '########.........##############..........####...',
      '#######........#.##############..........##.....',
      '.#######.........##############.................',
      '......##........##############.............##...',
      '.....###.........#.##..######.##.........#####..',
      '########............##....##..#.........#######.',
      '########................................########',
      '########................................########',
      '####....................................#######.',
      '##......................................#######.',
      '............#####.............######.....#####..',
      '.........#########...........########...........',
      '.........#########...........########...........',
      '.........#.......#...........##.....##..........',
    ],
    leyenda: {
      '.': { nombre: 'piso de la plaza', color: '#f4f4f0' },
      '#': { nombre: 'jardines, rejas, puestos', solido: true, color: '#cfd6e6' },
    },
    inicio: { x: 23, y: 26 },
    objetos: [
      // --- lo que ya está dibujado en el mapa (por eso no llevan sprite) ---
      { id: 'heladero', x: 8, y: 4, ancho: 6, alto: 5, etiqueta: 'Heladero', accion: 'plaza_heladero' },
      { id: 'retablos', x: 31, y: 1, ancho: 6, alto: 6, etiqueta: 'Artesanía', accion: 'plaza_retablos' },
      { id: 'senores', x: 41, y: 14, ancho: 4, alto: 4, etiqueta: 'Señores', accion: 'plaza_senores' },
      { id: 'perro', x: 9, y: 23, ancho: 3, alto: 2, solido: false, etiqueta: 'Perro', accion: 'plaza_perro' },
      { id: 'monumento', x: 18, y: 9, ancho: 12, alto: 11, etiqueta: 'Monumento', accion: 'plaza_monumento' },
      { id: 'pileta', x: 1, y: 12, ancho: 6, alto: 7, etiqueta: 'Pileta', accion: 'plaza_pileta' },
      // --- todavía sin dibujar: se ven como bloques de color hasta que existan ---
      { id: 'notaria', x: 1, y: 1, ancho: 2, alto: 2, color: '#555', etiqueta: 'Notaría', provisional: true, accion: 'plaza_notaria' },
      { id: 'kiosko', x: 2, y: 26, ancho: 2, alto: 2, color: '#d9a441', etiqueta: 'Kiosko', provisional: true, accion: 'plaza_kiosko' },
      // la catedral queda fuera del dibujo, hacia arriba: se habla con ella desde el borde
      { id: 'iglesia', x: 18, y: 0, ancho: 12, alto: 1, solido: false, etiqueta: 'Catedral', accion: 'plaza_iglesia' },
      // el gato aparece recién cuando ya viste todo lo demás; al acercarte se va corriendo
      { id: 'gato', x: 21, y: 24, ancho: 3.5, alto: 2, solido: false, etiqueta: 'Gato',
        sprite: 'assets/img/sprites/gato.png', accion: 'plaza_gato', sfxCerca: 'meow1.mp3',
        aviso: 'Un gato se sentó a mirarte.',
        huir: { sprite: 'assets/img/sprites/gato_corre.png', dx: 60, dy: 420, ms: 900 },   // baja hacia la calle
        apareceCuando: ['kiosko', 'iglesia', 'pileta', 'senores', 'retablos', 'heladero', 'perro', 'monumento', 'notaria'] },
      // salida: al pisar la abertura de abajo se va a perder, pero recién después del gato
      { id: 'salida', x: 22, y: 29, ancho: 4, alto: 1, color: '#222', etiqueta: '↓ calles', provisional: true, pisar: true, ir: 'perderse',
        requiere: 'gato', avisoBloqueado: 'Todavía no. Date una vuelta por la plaza primero.' },
    ],
  },

  casa: {
    nombre: 'Casa de los Quispe Ccori — patio',
    tam: 40, velocidad: 3,
    imagen: 'assets/img/mapas/casa.png',   // el dibujo: se estira sobre las 24 x 15 casillas
    spriteJugador: 'assets/img/sprites/ariel_base.png',
    spriteCaminar: 'assets/img/sprites/ariel_walk.png',
    pasosPorSegundo: 6, altoJugador: 2.4,
    filas: [
      'MMMMMMMMMMMMMMMMMMMMMMMM',
      'M..........MMMM........M',
      'M......................M',
      'M......................M',
      'M....mmmmmmmm..........M',
      'M....mmmmmmmm..........M',
      'M......................M',
      'M......................M',
      'M......................M',
      'M......................M',
      'M......................M',
      'M......................M',
      'M......................M',
      'M......................M',
      'MMMMMMMMMM....MMMMMMMMMM',
    ],
    leyenda: {
      'M': { nombre: 'muro de adobe', solido: true, color: '#8a6a4a' },
      '.': { nombre: 'tierra apisonada', color: '#a08662' },
      'm': { nombre: 'mesa larga', solido: true, color: '#b57b3a' },
    },
    inicio: { x: 11, y: 8 },
    objetos: [
      { id: 'regleta', x: 1, y: 1, ancho: 2, alto: 1, color: '#444', etiqueta: 'Regleta', accion: 'casa_regleta' },
      { id: 'laptop', x: 4, y: 1, color: '#999', etiqueta: 'Laptop', accion: 'casa_laptop' },
      { id: 'calendario', x: 7, y: 1, color: '#6ab', etiqueta: 'Calendario', accion: 'casa_calendario' },
      { id: 'mesa_amaru', x: 19, y: 1, ancho: 3, alto: 1, color: '#e0c060', etiqueta: 'Mesa de Amaru', accion: 'casa_mesa_amaru' },
      { id: 'puku', x: 22, y: 5, color: '#5ad65a', etiqueta: 'Puku', sprite: 'assets/img/sprites/puku.png', accion: 'casa_puku' },
      { id: 'parlante', x: 16, y: 4, color: '#111', etiqueta: 'Parlante', accion: 'casa_parlante' },
      { id: 'cocina', x: 11, y: 0, ancho: 4, alto: 1, color: '#c05030', etiqueta: 'Cocina', accion: 'casa_cocina' },
      { id: 'salida', x: 10, y: 14, ancho: 4, alto: 1, color: '#222', etiqueta: '↓ al kiosko', pisar: true, ir: 'kiosko_barrio' },
    ],
    personajes: [
      // ancho/alto = la casilla con la que chocas; el dibujo es cuadrado, así que se apoya
      // en el borde de abajo y sale de 2.6 casillas, más o menos como Ariel (altoJugador: 2.4).
      { id: 'flor', x: 8, y: 7, ancho: 2.6, alto: 1, color: '#ef9c86', etiqueta: 'Flor', sprite: 'assets/img/sprites/flor.png', accion: 'casa_flor' },
      { id: 'amaru', x: 18, y: 9, ancho: 2.6, alto: 1, color: '#636878', etiqueta: 'Amaru', sprite: 'assets/img/sprites/amaru.png', accion: 'casa_amaru' },
    ],
  },
};
