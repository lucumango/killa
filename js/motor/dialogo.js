// =====================================================================
// CAJA DE DIÁLOGO, BUSTOS, FONDOS, CUADROS Y OPCIONES
// =====================================================================
const Dialogo = {
  el: {
    fondo: U.$('#fondo'), cuadro: U.$('#cuadro'), busto: U.$('#busto'), caja: U.$('#caja-dialogo'),
    nombre: U.$('#nombre-hablante'), texto: U.$('#texto-dialogo'), flecha: U.$('#flecha-continuar'),
    opciones: U.$('#opciones'), tarjeta: U.$('#tarjeta'),
  },
  ultimoHablante: null,
  _id: 0,

  async aplicarEscena(est) {
    const e = Dialogo.el;
    if (est.fondo) { e.fondo.hidden = false; await U.pintar(e.fondo, `assets/img/fondos/${est.fondo}.png`, 'fondo: ' + est.fondo); }
    else { e.fondo.style.backgroundImage = 'none'; e.fondo.style.backgroundColor = '#000'; e.fondo.textContent = ''; }
    if (est.cuadro) { e.cuadro.hidden = false; Dialogo.ocultarBusto(); await U.pintar(e.cuadro, `assets/img/cuadros/${est.cuadro}.png`, 'cuadro: ' + est.cuadro); }
    else e.cuadro.hidden = true;
    if (est.animacion) Animacion.iniciar(est.animacion); else Animacion.detener();
    if (est.musica) Audio_.reproducirMusica(est.musica);
  },

  async mostrarBusto(id, emocion) {
    const p = PERSONAJES[id];
    if (!p || p.sinBusto || Motor.estadoEscena.cuadro) { Dialogo.ocultarBusto(); return; }
    const em = emocion || 'neutral';
    let ruta = (p.bustos && p.bustos[em]) || `assets/img/bustos/${id}_${em}.png`;
    const b = Dialogo.el.busto;
    b.hidden = false;
    b.classList.toggle('derecha', p.lado === 'derecha' || p.lado === 'der'); // ver `lado` en personajes.js
    let ok = await U.imagenExiste(ruta);
    if (!ok && em !== 'neutral') { // si falta esa emoción, usa el busto neutral
      const neutral = (p.bustos && p.bustos.neutral) || `assets/img/bustos/${id}_neutral.png`;
      if (await U.imagenExiste(neutral)) { ruta = neutral; ok = true; }
    }
    if (ok) { b.style.backgroundImage = `url("${ruta}")`; b.style.backgroundColor = 'transparent'; b.querySelector('.busto-etiqueta').textContent = ''; }
    else { b.style.backgroundImage = 'none'; b.style.backgroundColor = p.color || U.colorDe(id); b.querySelector('.busto-etiqueta').textContent = `${p.nombre} · ${em} (sin imagen)`; }
  },
  ocultarBusto() { Dialogo.el.busto.hidden = true; },
  limpiar() { Dialogo.el.caja.hidden = true; Dialogo.el.opciones.hidden = true; Dialogo.ocultarBusto(); },

  // Muestra un diálogo con efecto máquina de escribir + beep y espera tecla.
  async decir(quien, emocion, texto) {
    const e = Dialogo.el;
    const miId = ++Dialogo._id;
    const p = quien === 'narrador' ? null : PERSONAJES[quien];
    e.caja.hidden = false;
    e.caja.classList.toggle('narracion', !p);
    if (p) {
      e.nombre.textContent = p.nombre; e.nombre.style.color = p.color || '#fff';
      await Dialogo.mostrarBusto(quien, emocion);
    } else if (CONFIG.narradorOcultaBusto) Dialogo.ocultarBusto();
    e.texto.textContent = ''; e.flecha.hidden = true;

    // máquina de escribir
    let saltar = false;
    const onSkip = (ev) => { if (Celular.abierto) return; if (Entrada.esAvance(ev) || Entrada.esSaltar(ev)) saltar = true; };
    const onClick = () => { if (!Celular.abierto) saltar = true; };
    window.addEventListener('keydown', onSkip); U.$('#juego').addEventListener('click', onClick);
    const vel = (p && p.velocidad) || CONFIG.velocidadTexto;
    for (let i = 0; i < texto.length; i++) {
      if (miId !== Dialogo._id) break; // otro diálogo tomó la caja
      if (saltar) { e.texto.textContent = texto; break; }
      const ch = texto[i];
      e.texto.textContent += ch;
      if (ch !== ' ' && p && CONFIG.beepAlHablar && i % CONFIG.beepCadaLetras === 0) Audio_.beep(p);
      await U.espera('.,;:!?…'.includes(ch) ? vel * 6 : vel);
    }
    window.removeEventListener('keydown', onSkip); U.$('#juego').removeEventListener('click', onClick);
    await U.espera(60); // evita que la misma tecla que saltó también avance
    e.flecha.hidden = false;
    await U.esperarAvance();
  },

  // Menú de opciones. Devuelve la opción elegida.
  elegir(ops) {
    const ul = Dialogo.el.opciones;
    ul.innerHTML = ''; ul.hidden = false;
    ops.forEach((o) => { const li = document.createElement('li'); li.textContent = o.texto; ul.appendChild(li); });
    const lis = U.$$('#opciones li');
    let idx = 0; lis[0].classList.add('seleccionado');
    return new Promise((res) => {
      const fin = (i) => { window.removeEventListener('keydown', tk); ul.hidden = true; res(ops[i]); };
      const tk = (e) => {
        if (Celular.abierto) return;
        idx = Entrada.navegarLista(lis, idx, e);
        if (Entrada.esAvance(e)) { e.preventDefault(); fin(idx); }
      };
      window.addEventListener('keydown', tk);
      lis.forEach((li, i) => { li.onclick = () => fin(i); li.onmouseenter = () => { idx = i; lis.forEach((x, j) => x.classList.toggle('seleccionado', j === i)); }; });
    });
  },

  // Pantalla negra con texto centrado (títulos, "PUNTO DE GUARDADO", "CONTINUARÁ").
  async tarjeta(texto) {
    const t = Dialogo.el.tarjeta;
    t.textContent = texto; t.hidden = false;
    await U.espera(300);
    await U.esperarAvance();
    t.hidden = true;
  },
};
