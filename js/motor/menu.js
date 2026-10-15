// =====================================================================
// PANTALLAS: dedicatoria, menú principal, instrucciones/créditos/agradecimientos
// =====================================================================
const Pantallas = {
  mostrar(nombre, sinOcultarCelular) {
    ['dedicatoria', 'menu', 'texto', 'escena', 'explorar'].forEach((p) => (U.$('#pantalla-' + p).hidden = p !== nombre));
  },
};

const Menu = {
  idx: 0,
  dedicatoria() {
    Pantallas.mostrar('dedicatoria');
    U.$('.dedicatoria').textContent = CONFIG.dedicatoria;
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
      Menu.idx = Entrada.navegarLista(lis, Menu.idx, e);
      if (Entrada.esAvance(e)) { e.preventDefault(); fin(lis[Menu.idx].dataset.accion); }
    };
    const fin = (accion) => {
      if (accion === 'continuar' && !Guardado.existe()) return;
      window.removeEventListener('keydown', tk);
      lis.forEach((li) => (li.onclick = null));
      Menu.accion(accion);
    };
    window.addEventListener('keydown', tk);
    lis.forEach((li, i) => { li.onclick = () => fin(li.dataset.accion); li.onmouseenter = () => { Menu.idx = i; lis.forEach((x, j) => x.classList.toggle('seleccionado', j === i)); }; });
  },
  accion(a) {
    if (a === 'nueva') { Motor.nuevaPartida(); Motor.correr(); return; }
    if (a === 'continuar') { Motor.restaurar(Guardado.cargar()); Motor.correr(); return; }
    Menu.textoPantalla(a);
  },
  textoPantalla(clave) {
    const titulos = { instrucciones: 'Instrucciones', creditos: 'Créditos', agradecimientos: 'Agradecimientos' };
    Pantallas.mostrar('texto');
    U.$('#texto-titulo').textContent = titulos[clave];
    U.$('#texto-cuerpo').textContent = CONFIG[clave];
    const tk = (e) => { if (Entrada.esAvance(e) || Entrada.esCancelar(e)) { window.removeEventListener('keydown', tk); Menu.mostrar(); } };
    window.addEventListener('keydown', tk);
  },
};
