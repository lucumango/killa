// =====================================================================
// PANTALLAS: dedicatoria, menú principal, instrucciones/créditos/agradecimientos
// =====================================================================
const Pantallas = {
  mostrar(nombre, sinOcultarCelular) {
    ['dedicatoria', 'menu', 'texto', 'escena', 'explorar'].forEach((p) => (U.$('#pantalla-' + p).hidden = p !== nombre));
    // Varias capas viven FUERA de las pantallas, para que se vean también sobre
    // el mapa: el cuadro, los sprites de escena, los párpados, el que cruza...
    // Como no son hijas de #pantalla-escena, no se esconden solas: hay que
    // apagarlas a mano al salir del juego o se quedan encima del menú.
    if (nombre !== 'escena' && nombre !== 'explorar') Pantallas.limpiarCapas();
  },

  // Deja la pantalla en limpio. Se llama al volver al menú (fin de la demo,
  // @fin, o desde el chat libre) y no toca #tarjeta cuando se está entrando
  // a la partida, porque la cortinilla la enseña justo antes de mostrar('escena').
  limpiarCapas() {
    ['#cuadro', '#cruce', '#tarjeta', '#pista-libre'].forEach((s) => { const e = U.$(s); if (e) e.hidden = true; });
    // El botón de descargar datos y el recuadro del código se cuelgan de #juego
    // al acabar la demo: si no se quitan, se quedan encima del menú y se duplican.
    U.$$('#juego > .boton-datos, #juego > .codigo-final').forEach((x) => x.remove());
    if (typeof Camara !== 'undefined') Camara.quitarActores();
    if (typeof Dialogo !== 'undefined') {
      Dialogo.limpiar();
      // Los párpados se quedan a medio cerrar si la partida acabó con sueño.
      const p = U.$('#parpados');
      if (p) { p.hidden = true; p.querySelectorAll('.parpado').forEach((f) => (f.style.height = '0%')); }
      Dialogo._ojos = 0;
      if (typeof Audio_ !== 'undefined' && Audio_.musicaPorOjos) Audio_.musicaPorOjos(0);
    }
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
    Registro.pedirCodigo();
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
      if (a === 'nueva') { Registro.encender(); Motor.nuevaPartida(); }
      else Motor.restaurar(Guardado.cargar());
      // Si la partida se guardó en el chat del final, vuelves ahí, no a la historia.
      if (a === 'continuar' && Motor.vieneDeChatLibre) {
        await Dialogo.aplicarEscena(Motor.estadoEscena);
        await Motor.chatLibre();
        return;
      }
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
    // Los agradecimientos son largos: el cuerpo se desplaza con las flechas o
    // con la rueda del mouse, y abajo avisa mientras quede texto por leer.
    const cuerpo = U.$('#texto-cuerpo'), mas = U.$('#texto-mas'), pista = U.$('#pantalla-texto .pista');
    cuerpo.scrollTop = 0;
    const seDesplaza = () => cuerpo.scrollHeight > cuerpo.clientHeight + 4;
    const quedaAbajo = () => cuerpo.scrollTop + cuerpo.clientHeight < cuerpo.scrollHeight - 4;
    const refrescar = () => {
      mas.hidden = !quedaAbajo();
      pista.textContent = seDesplaza()
        ? (quedaAbajo() ? '↑ ↓ o la rueda del mouse para leer el resto  ·  Esc para volver'
                        : 'Eso es todo  ·  Esc o Enter para volver')
        : 'Esc o Enter para volver';
    };
    cuerpo.onscroll = refrescar;
    // El texto se mide recién cuando el navegador lo pinta.
    refrescar(); requestAnimationFrame(refrescar);
    const tk = (e) => {
      const salto = cuerpo.clientHeight * 0.8;
      if (['ArrowDown', 's', 'S'].includes(e.key)) { e.preventDefault(); cuerpo.scrollTop += 60; refrescar(); return; }
      if (['ArrowUp', 'w', 'W'].includes(e.key)) { e.preventDefault(); cuerpo.scrollTop -= 60; refrescar(); return; }
      if (e.key === 'PageDown') { e.preventDefault(); cuerpo.scrollTop += salto; refrescar(); return; }
      if (e.key === 'PageUp') { e.preventDefault(); cuerpo.scrollTop -= salto; refrescar(); return; }
      // Con texto por leer, Enter no debe salirse sin querer.
      if (Entrada.esCancelar(e) || (Entrada.esAvance(e) && !quedaAbajo())) {
        window.removeEventListener('keydown', tk); cuerpo.onscroll = null; Menu.mostrar();
      }
    };
    window.addEventListener('keydown', tk);
  },
};
