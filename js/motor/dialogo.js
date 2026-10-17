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

  // Los ojos que se cierran y se abren. Desde el guion:
  //   @ojos cerrar        se cierran y se quedan cerrados (el sueño en el carro)
  //   @ojos abrir         se abren
  //   @ojos cerrar 2500   lo mismo, pero tardando 2,5 segundos
  //   @ojos medio         a medio cerrar, para la modorra
  // El dibujo es el mismo papel azul de la dedicatoria (CONFIG.fondoDedicatoria).
  _ojos: 0,   // 0 = abiertos, 1 = cerrados del todo
  async ojos(como, ms) {
    const p = U.$('#parpados');
    const fin = como === 'abrir' ? 0 : como === 'medio' ? 0.42 : 0.5;   // 0.5 = juntos en el medio
    const dur = Math.max(0, Number(ms) || (como === 'abrir' ? 900 : 1800));
    const img = CONFIG.fondoDedicatoria ? `url("${CONFIG.fondoDedicatoria}")` : 'none';
    const franjas = [...p.querySelectorAll('.parpado')];
    franjas.forEach((f) => (f.style.backgroundImage = img));
    p.hidden = false;
    const ini = Dialogo._ojos, t0 = performance.now();
    await new Promise((res) => {
      const paso = () => {
        const k = dur ? Math.min(1, (performance.now() - t0) / dur) : 1;
        const suave = k * k * (3 - 2 * k);                     // arranca y frena suave
        const v = ini + (fin - ini) * suave;
        franjas.forEach((f) => (f.style.height = v * 100 + '%'));
        Audio_.musicaPorOjos(v / 0.5);   // la música se apaga con los párpados
        if (k < 1) requestAnimationFrame(paso); else res();
      };
      requestAnimationFrame(paso);
    });
    Dialogo._ojos = fin;
    if (!fin) p.hidden = true;
  },

  // Alguien cruza la pantalla de lado a lado y sale. Desde el guion:
  //   @cruzar gato 2400 meow1.mp3      (sprite, milisegundos, sonido al entrar)
  //   @cruzar ariel 3000               (de izquierda a derecha, por defecto)
  //   @cruzar gato 2400 meow1.mp3 der  (al revés: de derecha a izquierda)
  // El sprite sale de assets/img/sprites/<nombre>.png. Si no existe, no pasa nada
  // y el guion sigue igual, para que nunca se trabe por un dibujo que falta.
  async cruzar(nombre, ms, sfx, desde) {
    // La ficha está en CRUCES (js/datos/animaciones.js). Si no está, se usa el
    // sprite con ese nombre y valores por defecto, para no romper nada.
    const d = (typeof CRUCES !== 'undefined' && CRUCES[nombre]) || { marcos: [nombre] };
    const rutas = (d.marcos || [nombre]).map((m) => `assets/img/sprites/${m}.png`);
    const hay = [];
    for (const r of rutas) if (await U.imagenExiste(r)) hay.push(r);
    if (!hay.length) { console.warn('@cruzar: no encontré el dibujo de', nombre); return; }

    const el = U.$('#cruce');
    const alto = Number(d.alto) || 150;
    el.style.height = alto + 'px';
    el.style.width = Math.round(alto * 1.3) + 'px';   // ancho holgado: el dibujo se centra solo
    el.style.bottom = (Number(d.piso) || 40) + 'px';
    el.hidden = false;

    const alReves = /^(der|derecha|<-)/i.test(String(desde || ''));
    const dur = Math.max(200, Number(ms) || 2400);
    // Mismo ciclo que la caminata del mapa: quieto, paso, quieto, paso volteado.
    const quieto = hay[0], paso2 = hay[1] || hay[0];
    const ciclo = hay.length > 1 ? [[quieto, false], [paso2, false], [quieto, false], [paso2, true]]
                                 : [[quieto, false]];
    const porSeg = Number(d.porSegundo) || 6;
    // Mirar hacia donde camina: `espejo` corrige los dibujos que miran al otro lado.
    const miraIzq = alReves !== !!d.espejo;
    if (sfx && sfx !== '-') Audio_.sfx(sfx);

    const t0 = performance.now();
    await new Promise((res) => {
      const tic = () => {
        const t = (performance.now() - t0) / 1000;
        const k = Math.min(1, (t * 1000) / dur);
        el.style.left = (alReves ? 100 - k * 125 : -25 + k * 125) + '%';
        const [img, volteado] = ciclo[Math.floor(t * porSeg) % ciclo.length];
        el.style.backgroundImage = `url("${img}")`;
        el.style.transform = (miraIzq !== volteado) ? 'scaleX(-1)' : 'none';
        if (k < 1) requestAnimationFrame(tic); else res();
      };
      requestAnimationFrame(tic);
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
    // @velocidad manda sobre la del personaje, para las líneas que van más lento
    const vel = Motor.velocidadForzada || (p && p.velocidad) || CONFIG.velocidadTexto;
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

  // Hablan en quechua delante de ti y no entiendes nada: sale como narración
  // pero con los beeps de las voces que le pases, alternándose.
  //   @murmullo mama conductor [...... Ayacucho ...... ]
  async murmullo(voces, texto) {
    const e = Dialogo.el;
    const miId = ++Dialogo._id;
    const quienes = (voces || []).map((v) => PERSONAJES[v]).filter(Boolean);
    e.caja.hidden = false; e.caja.classList.add('narracion');
    if (CONFIG.narradorOcultaBusto) Dialogo.ocultarBusto();
    e.texto.textContent = ''; e.flecha.hidden = true;
    let saltar = false;
    const onSkip = (ev) => { if (Celular.abierto) return; if (Entrada.esAvance(ev) || Entrada.esSaltar(ev)) saltar = true; };
    const onClick = () => { if (!Celular.abierto) saltar = true; };
    window.addEventListener('keydown', onSkip); U.$('#juego').addEventListener('click', onClick);
    const vel = CONFIG.velocidadTexto;
    let turno = 0, desde = 0;
    for (let i = 0; i < texto.length; i++) {
      if (miId !== Dialogo._id) break;
      if (saltar) { e.texto.textContent = texto; break; }
      const ch = texto[i];
      e.texto.textContent += ch;
      // cada tanto cambia de voz, como cuando dos se van respondiendo
      if (quienes.length && i - desde > 6 + Math.floor(Math.random() * 8)) { turno = (turno + 1) % quienes.length; desde = i; }
      if (ch !== ' ' && quienes.length && CONFIG.beepAlHablar && i % CONFIG.beepCadaLetras === 0) Audio_.beep(quienes[turno]);
      await U.espera('.,;:!?…'.includes(ch) ? vel * 6 : vel);
    }
    window.removeEventListener('keydown', onSkip); U.$('#juego').removeEventListener('click', onClick);
    await U.espera(60);
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
        const antes = idx;
        idx = Entrada.navegarLista(lis, idx, e);
        // el mismo sonidito del menú al moverte entre las opciones
        if (idx !== antes && CONFIG.sfxMenuMover) Audio_.sfx(CONFIG.sfxMenuMover);
        if (Entrada.esAvance(e)) { e.preventDefault(); fin(idx); }
      };
      window.addEventListener('keydown', tk);
      lis.forEach((li, i) => {
        li.onclick = () => fin(i);
        li.onmouseenter = () => {
          if (idx !== i && CONFIG.sfxMenuMover) Audio_.sfx(CONFIG.sfxMenuMover);
          idx = i; lis.forEach((x, j) => x.classList.toggle('seleccionado', j === i));
        };
      });
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
