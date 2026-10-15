// Arranque del juego y teclas globales.
window.addEventListener('DOMContentLoaded', () => {
  Celular.iniciar();
  if (CONFIG.estiloPixel) U.$('#juego').classList.add('pixel');
  // Caja de diálogo dibujada (CONFIG.imagenCaja): si existe, se usa el PNG en vez
  // del rectángulo con borde. El texto sigue en el mismo sitio.
  if (CONFIG.imagenCaja) {
    const caja = U.$('#caja-dialogo');
    caja.style.backgroundImage = `url("${CONFIG.imagenCaja}")`;
    caja.classList.add('con-imagen');
  }
  Chat.historial = Chat.historialInicial();
  window.addEventListener('keydown', (e) => {
    // Tecla del celular: solo dentro del juego (escena o exploración).
    const enJuego = !U.$('#pantalla-escena').hidden || !U.$('#pantalla-explorar').hidden;
    if (Entrada.esCelular(e) && enJuego && document.activeElement !== Celular.el.input) { e.preventDefault(); if (Celular.modo === 'libre' || Celular.abierto) Celular.alternar(); }
    if (Entrada.esCancelar(e) && Celular.abierto) Celular.cerrar();
  }, true);
  Menu.dedicatoria();
});
