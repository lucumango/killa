// Arranque del juego y teclas globales.
window.addEventListener('DOMContentLoaded', () => {
  Celular.iniciar();
  if (CONFIG.estiloPixel) U.$('#juego').classList.add('pixel');
  // Caja de diálogo dibujada (CONFIG.imagenCaja): si existe, se usa el PNG en vez
  // del rectángulo con borde. El texto sigue en el mismo sitio. La lista de
  // opciones usa el mismo dibujo, estirado, para que no desentonen.
  if (CONFIG.imagenCaja) {
    for (const sel of ['#caja-dialogo', '#opciones']) {
      const el = U.$(sel);
      el.style.backgroundImage = `url("${CONFIG.imagenCaja}")`;
      el.classList.add('con-imagen');
    }
  }
  Chat.historial = Chat.historialInicial();

  // Teclas que el navegador usa para desplazar la página. Cuando el juego está
  // metido en una página ajena (itch.io), si no las reclamamos el navegador
  // mueve la página de atrás mientras caminas. Las pedimos para el juego,
  // salvo cuando estás escribiendo en el chat.
  const TECLAS_DE_SCROLL = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
    ' ', 'Spacebar', 'PageUp', 'PageDown', 'Home', 'End']);
  window.addEventListener('keydown', (e) => {
    if (document.activeElement === Celular.el.input) return;   // está escribiendo
    if (e.ctrlKey || e.metaKey || e.altKey) return;            // atajos del navegador
    if (TECLAS_DE_SCROLL.has(e.key)) e.preventDefault();
  }, { capture: true });

  window.addEventListener('keydown', (e) => {
    // Tecla del celular: solo dentro del juego (escena o exploración).
    const enJuego = !U.$('#pantalla-escena').hidden || !U.$('#pantalla-explorar').hidden;
    if (Entrada.esCelular(e) && enJuego && document.activeElement !== Celular.el.input) { e.preventDefault(); if (Celular.modo === 'libre' || Celular.abierto) Celular.alternar(); }
    if (Entrada.esCancelar(e) && Celular.abierto) Celular.cerrar();
  }, true);
  Menu.dedicatoria();
});
