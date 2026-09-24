// =====================================================================
// MAPAS DE EXPLORACIÓN (vista desde arriba)
// Cada carácter de `filas` es una casilla de `tam` píxeles. La leyenda dice
// de qué color se pinta y si es sólida (no se puede pisar).
// objetos: bloques con los que se interactúa (tecla E).
//   accion: 'etiqueta'  → corre esa parte del guion (hasta @volver) y sigue explorando
//   ir: 'etiqueta'      → sale del mapa y salta a esa etiqueta del guion
//   pisar: true         → se activa solo al pisarlo (para salidas)
//   sprite: 'assets/img/sprites/x.png' → si existe se dibuja; si no, bloque de color
// spriteJugador: sprite del jugador (opcional). Si no existe, un bloque amarillo.
// =====================================================================
const MAPAS = {
  plaza: {
    nombre: 'Plaza de Armas de Ayacucho',
    tam: 40, velocidad: 3,
    spriteJugador: 'assets/img/sprites/ariel.png',
    filas: [
      'AAAAAAAAAAAAAAAAAAAAAAAA',
      'A......................A',
      'A..pp..............pp..A',
      'A......................A',
      'A.....bb.......bb......A',
      'A......................A',
      'A..........~~..........A',
      'A..........~~..........A',
      'A......................A',
      'A.....bb.......bb......A',
      'A......................A',
      'A..pp..............pp..A',
      'A......................A',
      'A......................A',
      'AAAAAAAAAAA..AAAAAAAAAAA',
    ],
    leyenda: {
      'A': { nombre: 'portales / arcos', solido: true, color: '#6b5240' },
      '.': { nombre: 'piso de la plaza', color: '#b8a98a' },
      '~': { nombre: 'pileta', solido: true, color: '#5aa0d8' },
      'p': { nombre: 'palmera', solido: true, color: '#3f7a3a' },
      'b': { nombre: 'banca', solido: true, color: '#7a5c3a' },
    },
    inicio: { x: 11, y: 12 },
    objetos: [
      { id: 'kiosko', x: 1, y: 6, ancho: 1, alto: 2, color: '#d9a441', etiqueta: 'Kiosko', accion: 'plaza_kiosko' },
      { id: 'iglesia', x: 9, y: 0, ancho: 6, alto: 1, color: '#c98d9a', etiqueta: 'Catedral', accion: 'plaza_iglesia' },
      { id: 'pileta', x: 11, y: 6, ancho: 2, alto: 2, color: '#5aa0d8', etiqueta: 'Pileta', solido: true, accion: 'plaza_pileta' },
      { id: 'senores', x: 6, y: 4, ancho: 2, alto: 1, color: '#8a7a6a', etiqueta: 'Señores', accion: 'plaza_senores' },
      { id: 'retablos', x: 22, y: 3, ancho: 1, alto: 2, color: '#c9622d', etiqueta: 'Artesanía', accion: 'plaza_retablos' },
      { id: 'heladero', x: 16, y: 10, color: '#eee', etiqueta: 'Heladero', sprite: 'assets/img/sprites/heladero.png', accion: 'plaza_heladero' },
      { id: 'perro', x: 5, y: 9, color: '#c8873a', etiqueta: 'Perro', sprite: 'assets/img/sprites/perro.png', accion: 'plaza_perro' },
      { id: 'notaria', x: 22, y: 12, ancho: 1, alto: 1, color: '#555', etiqueta: 'Notaría', accion: 'plaza_notaria' },
      // salida: al pisar la abertura de abajo se va a perder
      { id: 'salida', x: 11, y: 14, ancho: 2, alto: 1, color: '#222', etiqueta: '↓ calles', pisar: true, ir: 'perderse' },
    ],
  },

  casa: {
    nombre: 'Casa de los Quispe Ccori — patio',
    tam: 40, velocidad: 3,
    spriteJugador: 'assets/img/sprites/ariel.png',
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
      { id: 'flor', x: 8, y: 7, color: '#ff8fb1', etiqueta: 'Flor', sprite: 'assets/img/sprites/flor.png', accion: 'casa_flor' },
      { id: 'amaru', x: 18, y: 9, color: '#7fb3ff', etiqueta: 'Amaru', sprite: 'assets/img/sprites/amaru.png', accion: 'casa_amaru' },
    ],
  },
};
