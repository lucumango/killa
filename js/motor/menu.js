// =====================================================================
// PANTALLAS: dedicatoria, menú principal, instrucciones/créditos/agradecimientos
// =====================================================================
const Pantallas = {
  mostrar(nombre, sinOcultarCelular) {
    ['dedicatoria', 'menu', 'texto', 'escena', 'explorar'].forEach((p) => (U.$('#pantalla-' + p).hidden = p !== nombre));
    // El cuadro está fuera de las pantallas (para que se vea también sobre el mapa),
    // así que hay que esconderlo a mano cuando salimos del juego.
    if (nombre !== 'escena' && nombre !== 'explorar') U.$('#cuadro').hidden = true;
  },
};

const Menu = {
  idx: 0,
  dedicatoria() {
    Pantallas.mostrar('dedicatoria');
    U.$('.dedicatoria').textContent = CONFIG.dedicatoria;
    // Dibujo detrás de la dedicatoria (CONFIG.fondoDedicatoria). Sin él queda el azul liso.
    U.$('#pantalla-dedicatoria').style.backgroundImage = CONFIG.fondoDedicatoria ? `url("${CONFIG.fondoDedicatoria}")` : 'none';
    const tk = (e) => { window.removeEventListener('keydown', tk); U.$('#juego').removeEventListener('click', tk); Audio_.activar(); Menu.mostrar(); };
    window.addEventListener('keydown', tk); U.$('#juego').addEventListener('click', tk);
  },
  mostrar() {
    Pantallas.mostrar('menu');
    U.$('#titulo-juego').textContent = CONFIG.titulo; U.$('#subtitulo-juego').textContent = CONFIG.subtitulo;
    // Fondo dibujado del menú (CONFIG.fondoMenu). Si el título ya está pintado ahí, no se escribe encima.
    const pm = U.$('#pantalla-menu');
    pm.style.backgroundImage = CONFIG.fondoMenu ? `url("${CONFIG.fondoMenu}")` : 'none';
    pm.classList.toggle('con-fondo', !!CONFIG.fondoMenu);
    U.$('#titulo-juego').hidden = !!(CONFIG.fondoMenu && CONFIG.tituloEnElFondo);
    U.$('#subtitulo-juego').hidden = !CONFIG.subtitulo;
    if (CONFIG.musicaMenu) Audio_.reproducirMusica(CONFIG.musicaMenu);
    const lis = U.$$('#menu-opciones li');
    const cont = U.$('[data-accion=continuar]');
    cont.classList.toggle('deshabilitado', !Guardado.existe());
    Menu.idx = Guardado.existe() ? 0 : 1;
    lis.forEach((li, i) => li.classList.toggle('seleccionado', i === Menu.idx));
    const tk = (e) => {
      const antes = Menu.idx;
      Menu.idx = Entrada.navegarLista(lis, Menu.idx, e);
      if (Menu.idx !== antes && CONFIG.sfxMenuMover) Audio_.sfx(CONFIG.sfxMenuMover);
      if (Entrada.esAvance(e)) { e.preventDefault(); fin(lis[Menu.idx].dataset.accion); }
    };
    const fin = (accion) => {
      if (accion === 'continuar' && !Guardado.existe()) return;
      window.removeEventListener('keydown', tk);
      lis.forEach((li) => (li.onclick = null));
      // Empezar y continuar tienen su propio sonido; el resto comparte otro.
      const empieza = accion === 'nueva' || accion === 'continuar';
      const son = empieza ? CONFIG.sfxMenuPartida : CONFIG.sfxMenuOpcion;
      if (son) Audio_.sfx(son);
      Menu.accion(accion);
    };
    window.addEventListener('keydown', tk);
    lis.forEach((li, i) => {
      li.onclick = () => fin(li.dataset.accion);
      li.onmouseenter = () => {
        if (Menu.idx !== i && CONFIG.sfxMenuMover) Audio_.sfx(CONFIG.sfxMenuMover);
        Menu.idx = i; lis.forEach((x, j) => x.classList.toggle('seleccionado', j === i));
      };
    });
  },
  async accion(a) {
    if (a === 'nueva' || a === 'continuar') {
      await Menu.cortinilla();              // el papel texturizado, un momento, antes de jugar
      if (a === 'nueva') Motor.nuevaPartida();
      else Motor.restaurar(Guardado.cargar());
      Motor.correr();
      return;
    }
    Menu.textoPantalla(a);
  },

  // Pantalla de papel entre el menú y la partida (CONFIG.pausaAlEmpezar).
  // Usa el mismo dibujo de la dedicatoria. Sin él, queda el azul liso.
  async cortinilla() {
    const ms = Number(CONFIG.pausaAlEmpezar) || 0;
    if (!ms) return;
    Audio_.pararMusica();
    const t = U.$('#tarjeta');
    t.textContent = '';
    t.style.backgroundImage = CONFIG.fondoDedicatoria ? `url("${CONFIG.fondoDedicatoria}")` : 'none';
    t.hidden = false;
    Pantallas.mostrar('escena');
    await U.espera(ms);
    t.hidden = true;
  },
  textoPantalla(clave) {
    const titulos = { instrucciones: 'Instrucciones', creditos: 'Créditos', agradecimientos: 'Agradecimientos' };
    Pantallas.mostrar('texto');
    // Dibujo detrás de instrucciones / créditos / agradecimientos (CONFIG.fondoTexto).
    const pt = U.$('#pantalla-texto');
    pt.style.backgroundImage = CONFIG.fondoTexto ? `url("${CONFIG.fondoTexto}")` : 'none';
    pt.classList.toggle('con-fondo', !!CONFIG.fondoTexto);
    U.$('#texto-titulo').textContent = titulos[clave];
    U.$('#texto-cuerpo').textContent = CONFIG[clave];
    const tk = (e) => { if (Entrada.esAvance(e) || Entrada.esCancelar(e)) { window.removeEventListener('keydown', tk); Menu.mostrar(); } };
    window.addEventListener('keydown', tk);
  },
};
