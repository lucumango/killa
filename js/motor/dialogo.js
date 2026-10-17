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

  // Alguien cruza la pantalla de lado a lado y sale. Desde el guion:
  //   @cruzar gato 2400 meow1.mp3      (sprite, milisegundos, sonido al entrar)
  //   @cruzar ariel 3000               (de izquierda a derecha, por defecto)
  //   @cruzar gato 2400 meow1.mp3 der  (al revés: de derecha a izquierda)
  // El sprite sale de assets/img/sprites/<nombre>.png. Si no existe, no pasa nada
  // y el guion sigue igual, para que nunca se trabe por un dibujo que falta.
  async cruzar(nombre, ms, sfx, desde) {
    const ruta = `assets/img/sprites/${nombre}.png`;
    if (!(await U.imagenExiste(ruta))) { console.warn('@cruzar: falta', ruta); return; }
    const el = U.$('#cruce');
    // Tamaño: CONFIG.altoCruce puede ser un número para todos, o una tabla por sprite.
    const tabla = CONFIG.altoCruce;
    const alto = Number(typeof tabla === 'object' && tabla ? (tabla[nombre] ?? tabla._) : tabla) || 230;
    el.style.height = alto + 'px';
    el.style.width = Math.round(alto * 1.1) + 'px';
    el.style.bottom = (Number(CONFIG.pisoCruce) || 150) + 'px';
    el.style.backgroundImage = `url("${ruta}")`;
    el.hidden = false;
    const alReves = /^(der|derecha|<-|izq_)/i.test(String(desde || ''));
    const dur = Math.max(200, Number(ms) || 2400);
    if (sfx && sfx !== '-') Audio_.sfx(sfx);
    const t0 = performance.now();
    await new Promise((res) => {
      const paso = () => {
        const k = Math.min(1, (performance.now() - t0) / dur);
        // de fuera por un lado a fuera por el otro
        const x = alReves ? 100 - k * 125 : -25 + k * 125;
        el.style.left = x + '%';
        el.style.transform = alReves ? 'scaleX(-1)' : 'none';
        if (k < 1) requestAnimationFrame(paso); else res();
      };
      requestAnimationFrame(paso);
    });
    el.hidden = true; el.style.backgroundImage = 'none';
  },

  async mostrarBusto(id, emocion) {
    const p = PERSONAJES[id];
    if (!p || p.sinBusto || Motor.estadoEscena.cuadro) { Dialogo.ocultarBusto(); return; }
    const em = emocion || 'neutral';
    const b = Dialogo.el.busto;
    b.hidden = false;
    b.classList.toggle('derecha', p.lado === 'derecha' || p.lado === 'der'); // ver `lado` en personajes.js
    b.style.setProperty('--escala', p.escalaBusto || 1); // ver `escalaBusto` en personajes.js
    // Mientras falten dibujos: si no está esa emoción se usa otra del mismo personaje,
    // antes de caer al bloque de color. El orden de abajo es el de preferencia.
    const dondeEsta = (e) => (p.bustos && p.bustos[e]) || `assets/img/bustos/${id}_${e}.png`;
    const intentos = [em, 'neutral', p.bustoRespaldo, ...Object.keys(p.bustos || {}), 'feliz', 'seria', 'curioso'];
    let ruta = dondeEsta(em), ok = false;
    for (const e of intentos) {
      if (!e) continue;
      const r = dondeEsta(e);
      if (await U.imagenExiste(r)) { ruta = r; ok = true; break; }
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
    // Dibujo detrás de la tarjeta (CONFIG.fondoTarjeta). Sin él queda el azul liso.
    t.style.backgroundImage = CONFIG.fondoTarjeta ? `url("${CONFIG.fondoTarjeta}")` : 'none';
    await U.espera(300);
    await U.esperarAvance();
    t.hidden = true;
  },
};
