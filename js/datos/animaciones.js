// =====================================================================
// ANIMACIONES DE ESCENA  (se encienden en el guion con: @animacion carro)
// ---------------------------------------------------------------------
// Cada animación son dos (o más) PNG transparentes DEL MISMO TAMAÑO,
// dibujados uno encima del otro, como capas de Photoshop/Procreate:
//   - "ruedas": se dibuja abajo y cada rueda gira sobre su propio centro.
//   - "cuerpo": se dibuja encima y sube y baja (el rebote del carro).
// Como los dos PNG miden lo mismo, todo queda calzado solo: tú dibujas
// las ruedas en la misma posición en que están en el dibujo del carro y
// el motor las encuentra y las hace girar.
//
// Si falta un PNG, el motor pinta un bloque de color con el nombre del
// archivo que espera (igual que con los fondos y los bustos).
// =====================================================================
const ANIMACIONES = {

  carro: {
    // --- imágenes (PNG con fondo transparente, mismo tamaño las dos) ---
    cuerpo: 'assets/img/animaciones/carro_cuerpo.png',
    ruedas: 'assets/img/animaciones/carro_ruedas.png',

    // --- el paisaje que pasa de largo ---
    // Cada capa se repite en bucle hacia la izquierda. "vel" son píxeles de
    // pantalla por segundo: mientras más cerca está algo, más rápido pasa
    // (eso es el parallax, lo que da la sensación de profundidad).
    // "y" sube (-) o baja (+) esa capa sola, sin mover las demás.
    color: '#fcfae2',   // el cielo (un color plano). Es el crema del papel de tus dibujos. null = transparente.
    tinta: '#33448c',   // color de las capas que dibuja el motor (el azul de tu lápiz)
    capas: [
      { img: 'assets/img/animaciones/carretera_nubes.png',  vel: -9,  y: 10 },
      { img: 'assets/img/animaciones/carretera_cerros.png', vel: -42, y: 0 },

      // El suelo y la pista los dibuja el motor, así salen rectos de verdad
      // y el bucle cierra exacto. Las medidas son en píxeles de pantalla.
      // grosor va en px de pantalla; 0.75 = 1.5 px reales (igual de fino que tu lápiz)
      { tipo: 'linea',   y: 212, grosor: 0.75 },                                               // suelo, debajo de los cerros
      { tipo: 'guiones', y: 398, grosor: 0.75, vel: -320, largo: 54, hueco: 30, alto: 11 },   // pista, debajo de las llantas
    ],

    // --- encuadre ---
    escala: 0.85,     // 1 = el PNG ocupa toda la pantalla. 0.8 = más chico.
    x: 0,             // mover el carro a la derecha (+) o izquierda (-), en px
    y: -70,           // mover el carro abajo (+) o arriba (-), en px
                      //   (así las ruedas quedan encima de la caja de diálogo)

    suavizado: true,  // true = dibujo a línea (bordes suaves). false = pixel art.

    // --- rebote de la carrocería (la pista está fea) ---
    rebote: 7,        // cuántos px sube y baja. 0 = quieto.
    reboteVel: 2.2,   // rebotes por segundo
    reboteRuedas: 0.3,// cuánto del rebote copian las ruedas (0 = pegadas al piso)

    // --- ladeo en las curvas ---
    ladeo: 0.8,       // inclinación máxima, en grados. 0 = sin curvas.
    ladeoVel: 0.33,   // qué tan seguido se ladea (vueltas por segundo)
    bamboleo: 3,      // vaivén de izquierda a derecha, en px

    // --- giro de las ruedas ---
    ruedaVel: 2.6,    // vueltas por segundo. Negativo = al revés.
    ruedaVaiven: 0,   // 0 = giro completo. Si pones p. ej. 25, en vez de dar
                      //     vueltas la rueda se mece 25 grados a cada lado.

    // Centros de giro de las ruedas. 'auto' = el motor los busca solo
    // (separa los dibujos que estén sueltos en el PNG de ruedas).
    // Si quieres mandarlos a mano: [{x:657, y:920, r:75}, {x:1186, y:922, r:75}]
    // (en píxeles del PNG original, no de la pantalla).
    centrosRueda: 'auto',
  },

};

// =====================================================================
// QUIEN CRUZA LA PANTALLA (en el guion: @cruzar gato 2300 meow1.mp3)
// Camina de un borde al otro y sale. La caminata es la misma del mapa:
// quieto, un pie, quieto, el otro pie (el motor voltea el segundo paso).
//   marcos: los dibujos que se alternan, de assets/img/sprites/<nombre>.png
//   alto:   qué tan grande sale, en px de los 600 que mide la pantalla
//   piso:   a qué altura apoya los pies, contando desde abajo
//   espejo: true si el dibujo mira a la izquierda y hay que voltearlo
//   porSegundo: cuántos cambios de pie por segundo
// =====================================================================
const CRUCES = {
  ariel: { marcos: ['ariel_base', 'ariel_walk'], alto: 165, piso: 40, porSegundo: 6 },
  gato:  { marcos: ['gato', 'gato_corre'],       alto: 56,  piso: 40, porSegundo: 7, espejo: true },
  flor:  { marcos: ['flor'],                     alto: 150, piso: 40 },
  amaru: { marcos: ['amaru'],                    alto: 150, piso: 40 },
  mama:  { marcos: ['mama'],                     alto: 160, piso: 40 },
};
