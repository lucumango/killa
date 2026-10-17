// =====================================================================
// EXPLORACIÓN (vista desde arriba). Mapas en js/datos/mapas.js.
// El jugador es un rectángulo; los objetos y personajes también,
// salvo que exista el sprite indicado.
// Caminata: con `spriteJugador` (quieto) + `spriteCaminar` (un paso) el motor
// arma el ciclo quieto -> paso -> quieto -> paso volteado al revés.
// Cada objeto con el que interactúas deja la variable `visto_<id>` en 1, así que
// los @si del guion y los `apareceCuando` / `requiere` de los mapas pueden usarla.
// =====================================================================
const Exploracion = {
  lienzo: U.$('#lienzo'), ctx: (() => { const c = U.$('#lienzo').getContext('2d'); c.imageSmoothingEnabled = false; return c; })(),
  mapa: null, nombre: null, jugador: null, teclas: {}, activo: false, resolver: null,
  sprites: {}, ocupado: false, fase: 0, andando: false, _t: 0, _cerca: null,

  correr(nombreMapa) {
    const M = MAPAS[nombreMapa];
    if (!M) throw new Error('No existe el mapa ' + nombreMapa);
    Exploracion.mapa = M; Exploracion.nombre = nombreMapa;
    Exploracion.tam = M.tam || 40;
    const ini = M.inicio || { x: 1, y: 1 };
    Exploracion.jugador = { x: ini.x * Exploracion.tam, y: ini.y * Exploracion.tam, w: Exploracion.tam * 0.8, h: Exploracion.tam * 0.8, dir: 'abajo' };
    Exploracion.disparados = new Set();
    Pantallas.mostrar('explorar');
    U.$('#explorar-nombre').textContent = (M.nombre || nombreMapa) + '   ·   flechas/WASD mover · ' + CONFIG.teclas.interactuar[0].toUpperCase() + ' interactuar · ' + CONFIG.teclas.celular[0].toUpperCase() + ' celular';
    if (M.musica) { Motor.estadoEscena.musica = M.musica; Audio_.reproducirMusica(M.musica); }
    Exploracion.todos().forEach((o) => { o._ido = false; o._dx = 0; o._dy = 0; o._sprite = null; Exploracion.cargarSprite(o.sprite); Exploracion.cargarSprite(o.huir && o.huir.sprite); Exploracion.cargarSprite(o.seVa && o.seVa.sprite); });
    Exploracion.anunciados = new Set(Exploracion.todos().filter(Exploracion.yaAparecio).map((o) => o.id));
    Exploracion.refrescarCuenta();
    [M.spriteJugador, M.spriteCaminar].forEach(Exploracion.cargarSprite);
    // El dibujo del mapa se espera: si no, se ve un momento la grilla de bloques
    // de colores antes de que aparezca la imagen.
    if (M.imagen) {
      const im = await U.cargarImagen(M.imagen);
      if (im) Exploracion.sprites[M.imagen] = im;
    }
    Exploracion.fase = 0; Exploracion.andando = false; Exploracion._t = 0; Exploracion._cerca = null;
    Exploracion.ctx.imageSmoothingEnabled = true; // el arte es a línea, no pixel art
    Exploracion.activo = true;
    // `seVa`: el que lo tenga se va caminando solo al poco rato de empezar el mapa
    // (mamá yéndose a la notaría). Se desliza fuera del cuadro, como en Pokémon.
    for (const o of Exploracion.todos()) {
      if (!o.seVa || Motor.vars['ido_' + o.id]) { if (o.seVa) o._ido = true; continue; }
      setTimeout(() => {
        if (!Exploracion.activo || Exploracion.nombre !== nombreMapa) return;
        if (o.seVa.aviso) U.aviso(o.seVa.aviso);
        Exploracion.deslizar(o, o.seVa).then(() => { Motor.vars['ido_' + o.id] = 1; });
      }, o.seVa.retraso || 1200);
    }
    window.addEventListener('keydown', Exploracion.onDown);
    window.addEventListener('keyup', Exploracion.onUp);
    requestAnimationFrame(Exploracion.bucle);
    return new Promise((res) => { Exploracion.resolver = res; });
  },
  terminar(destino) {
    if (Exploracion.ocupado) return; // hay un sub-guion corriendo; que termine primero
    Exploracion.activo = false;
    window.removeEventListener('keydown', Exploracion.onDown);
    window.removeEventListener('keyup', Exploracion.onUp);
    U.$('#explorar-pista').hidden = true;
    Exploracion.resolver && Exploracion.resolver(destino);
  },
  onDown(e) {
    if (Celular.abierto || Exploracion.ocupado) return;
    Exploracion.teclas[e.key] = true;
    if (Entrada.esInteractuar(e)) { e.preventDefault(); Exploracion.interactuar(); }
  },
  onUp(e) { Exploracion.teclas[e.key] = false; },

  solidoEn(px, py, w, h) {
    const M = Exploracion.mapa, t = Exploracion.tam;
    const x0 = Math.floor(px / t), y0 = Math.floor(py / t), x1 = Math.floor((px + w - 1) / t), y1 = Math.floor((py + h - 1) / t);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const fila = M.filas[y]; if (!fila) return true;
      const c = fila[x]; if (c === undefined) return true;
      const ley = M.leyenda[c]; if (ley && ley.solido) return true;
    }
    for (const o of Exploracion.todosObjetos()) {
      if (o.solido === false || o.ir) continue;
      const ox = o.x * t, oy = o.y * t, ow = (o.ancho || 1) * t, oh = (o.alto || 1) * t;
      if (px < ox + ow && px + w > ox && py < oy + oh && py + h > oy) return true;
    }
    return false;
  },
  todos() { const M = Exploracion.mapa; return (M.objetos || []).concat(M.personajes || []); },
  // visibles: los que ya aparecieron y todavía no se fueron
  todosObjetos() { return Exploracion.todos().filter((o) => !o._ido && Exploracion.yaAparecio(o)); },

  // Aviso de cuántas cosas quedan por mirar. Solo cuenta las que ya aparecieron,
  // para no delatar las que todavía están escondidas (el gato de la plaza).
  // Se apaga con CONFIG.contarExploracion: false.
  refrescarCuenta() {
    const el = U.$('#explorar-cuenta');
    if (!el) return;
    if (CONFIG.contarExploracion === false) { el.hidden = true; return; }
    const mirables = Exploracion.todos().filter((o) => o.accion && Exploracion.yaAparecio(o));
    const faltan = mirables.filter((o) => !Motor.vars['visto_' + o.id]).length;
    el.hidden = false;
    el.classList.toggle('listo', faltan === 0);
    el.textContent = faltan === 0 ? 'Ya viste todo'
      : faltan === 1 ? 'Te falta 1 cosa por mirar'
      : `Te faltan ${faltan} cosas por mirar`;
  },
  yaAparecio(o) { return !o.apareceCuando || o.apareceCuando.every((id) => Motor.vars['visto_' + id]); },
  cargarSprite(ruta) { if (ruta && !Exploracion.sprites[ruta]) U.imagenExiste(ruta).then((ok) => { if (ok) { const im = new Image(); im.src = ruta; Exploracion.sprites[ruta] = im; } }); },
  objetoCerca() {
    const j = Exploracion.jugador, t = Exploracion.tam;
    const cx = j.x + j.w / 2, cy = j.y + j.h / 2;
    let mejor = null, dmin = Infinity;
    for (const o of Exploracion.todosObjetos()) {
      if (!o.accion && !o.ir) continue;
      const ox = o.x * t, oy = o.y * t, ow = (o.ancho || 1) * t, oh = (o.alto || 1) * t;
      const dx = Math.max(ox - cx, 0, cx - (ox + ow)), dy = Math.max(oy - cy, 0, cy - (oy + oh));
      const d = Math.hypot(dx, dy);
      if (d < t * 0.9 && d < dmin) { dmin = d; mejor = o; }
    }
    return mejor;
  },
  async interactuar() {
    const o = Exploracion.objetoCerca();
    if (!o) return;
    if (!Exploracion.cumpleRequisito(o)) return;
    if (o.ir) { Exploracion.terminar(o.ir); return; }
    Exploracion.ocupado = true; Exploracion.teclas = {};
    if (o.huir) await Exploracion.huir(o);              // el gato se va corriendo antes de hablar
    Motor.vars['visto_' + o.id] = 1;                     // queda registrado para los @si y los apareceCuando
    const destino = o.accion ? await Motor.subGuion(o.accion) : null;
    Exploracion.refrescarCuenta();
    Exploracion.ocupado = false;
    if (destino) Exploracion.terminar(destino);
  },
  // `requiere: 'gato'` = no se puede usar hasta haber interactuado con ese otro objeto
  cumpleRequisito(o) {
    if (!o.requiere || Motor.vars['visto_' + o.requiere]) return true;
    const t = performance.now();
    if (o.avisoBloqueado && (!o._avisado || t - o._avisado > 4000)) { o._avisado = t; U.aviso(o.avisoBloqueado); }
    return false;
  },
  // Animación de huida: cambia de sprite y se desliza hasta salir del cuadro.
  huir(o) { return Exploracion.deslizar(o, o.huir); },

  // Desliza un objeto dx/dy píxeles en ms milisegundos y lo da por ido.
  // Lo usan el gato cuando huye y mamá cuando se va a la notaría.
  deslizar(o, h) {
    const ms = h.ms || 900;
    o._sprite = h.sprite || o.sprite;
    const t0 = performance.now();
    return new Promise((res) => {
      const paso = () => {
        const k = Math.min(1, (performance.now() - t0) / ms);
        o._dx = (h.dx || 0) * k; o._dy = (h.dy || 0) * k;
        if (k < 1) requestAnimationFrame(paso); else { o._ido = true; res(); }
      };
      requestAnimationFrame(paso);
    });
  },
  bucle() {
    if (!Exploracion.activo) return;
    const j = Exploracion.jugador, k = Exploracion.teclas, v = Exploracion.mapa.velocidad || 3;
    if (!Exploracion.ocupado && !Celular.abierto) {
      let dx = 0, dy = 0;
      if (k.ArrowLeft || k.a || k.A) { dx -= v; j.dir = 'izq'; }
      if (k.ArrowRight || k.d || k.D) { dx += v; j.dir = 'der'; }
      if (k.ArrowUp || k.w || k.W) { dy -= v; j.dir = 'arriba'; }
      if (k.ArrowDown || k.s || k.S) { dy += v; j.dir = 'abajo'; }
      if (dx && !Exploracion.solidoEn(j.x + dx, j.y, j.w, j.h)) j.x += dx;
      if (dy && !Exploracion.solidoEn(j.x, j.y + dy, j.w, j.h)) j.y += dy;
      Exploracion.andando = !!(dx || dy);
      // salidas automáticas (objetos con `pisar: true`)
      for (const o of Exploracion.todosObjetos()) {
        if (!o.pisar || !o.ir) continue;
        const t = Exploracion.tam, ox = o.x * t, oy = o.y * t, ow = (o.ancho || 1) * t, oh = (o.alto || 1) * t;
        if (j.x < ox + ow && j.x + j.w > ox && j.y < oy + oh && j.y + j.h > oy) {
          if (!Exploracion.cumpleRequisito(o)) continue;
          Exploracion.terminar(o.ir); return;
        }
      }
      const cerca = Exploracion.objetoCerca();
      // sonido al acercarse (el maullido del gato): una vez por acercada
      if (cerca !== Exploracion._cerca) {
        Exploracion._cerca = cerca;
        if (cerca && cerca.sfxCerca) Audio_.sfx(cerca.sfxCerca);
      }
      const pista = U.$('#explorar-pista');
      if (cerca) { pista.hidden = false; pista.textContent = `[${CONFIG.teclas.interactuar[0].toUpperCase()}] ${cerca.etiqueta || cerca.id}`; } else pista.hidden = true;
    }
    else Exploracion.andando = false;
    // reloj de la caminata: avanza solo mientras se mueve
    const ahora = performance.now();
    const dt = Exploracion._t ? Math.min((ahora - Exploracion._t) / 1000, 0.1) : 0;
    Exploracion._t = ahora;
    if (Exploracion.andando) Exploracion.fase += dt * (Exploracion.mapa.pasosPorSegundo || 6);
    else Exploracion.fase = 0;
    // algo que aparece recién ahora (el gato, cuando ya viste toda la plaza)
    for (const o of Exploracion.todosObjetos()) {
      if (Exploracion.anunciados.has(o.id)) continue;
      Exploracion.anunciados.add(o.id);
      if (o.aviso) U.aviso(o.aviso);
    }
    Exploracion.dibujar();
    requestAnimationFrame(Exploracion.bucle);
  },
  dibujar() {
    const c = Exploracion.ctx, M = Exploracion.mapa, t = Exploracion.tam, j = Exploracion.jugador;
    const W = Exploracion.lienzo.width, H = Exploracion.lienzo.height;
    const mapW = M.filas[0].length * t, mapH = M.filas.length * t;
    // cámara: sigue al jugador si el mapa es más grande que la pantalla
    const camX = Math.max(0, Math.min(j.x + j.w / 2 - W / 2, mapW - W));
    const camY = Math.max(0, Math.min(j.y + j.h / 2 - H / 2, mapH - H));
    c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
    c.save(); c.translate(-camX, -camY);
    // el piso: tu dibujo si hay `imagen` en el mapa; si no, los bloques de color
    const fondo = M.imagen && Exploracion.sprites[M.imagen];
    if (fondo) c.drawImage(fondo, 0, 0, mapW, mapH);
    else M.filas.forEach((fila, y) => { for (let x = 0; x < fila.length; x++) {
      const ley = M.leyenda[fila[x]] || {}; c.fillStyle = ley.color || '#333'; c.fillRect(x * t, y * t, t, t);
    } });
    // con CONFIG.verChoques: true se pinta encima dónde no se puede caminar
    if (CONFIG.verChoques) {
      c.fillStyle = 'rgba(255,0,0,.28)';
      M.filas.forEach((fila, y) => { for (let x = 0; x < fila.length; x++) {
        const ley = M.leyenda[fila[x]]; if (ley && ley.solido) c.fillRect(x * t, y * t, t, t);
      } });
    }
    for (const o of Exploracion.todosObjetos()) {
      const ox = o.x * t + (o._dx || 0), oy = o.y * t + (o._dy || 0), ow = (o.ancho || 1) * t, oh = (o.alto || 1) * t;
      const ruta = o._sprite || o.sprite;
      const im = ruta && Exploracion.sprites[ruta];
      // los sprites guardan su proporción y se apoyan en el borde de abajo de su casilla
      if (im) { const alto = ow * (im.naturalHeight / im.naturalWidth || 1); c.drawImage(im, ox, oy + oh - alto, ow, alto); }
      // con mapa dibujado solo se pintan los bloques de los objetos `provisional` (los que aún no están dibujados)
      else if (!fondo || o.provisional || CONFIG.verChoques) {
        c.save();
        if (fondo && !o.provisional) c.globalAlpha = 0.35;   // en modo verChoques, translúcido para ver el dibujo
        c.fillStyle = o.color || U.colorDe(o.id); c.fillRect(ox + 2, oy + 2, ow - 4, oh - 4);
        c.restore();
      }
      if (o.etiqueta && (!fondo || o.provisional || CONFIG.verChoques)) Exploracion.rotulo(c, o.etiqueta, ox + ow / 2, oy - 4);
    }
    Exploracion.dibujarJugador(c, M, t, j);
    c.restore();
  },

  // Texto chiquito sobre el mapa. Va con borde oscuro para que se lea
  // igual sobre un dibujo claro (los mapas son papel crema) que sobre uno oscuro.
  rotulo(c, texto, x, y) {
    c.font = '11px monospace'; c.textAlign = 'center';
    c.lineWidth = 3; c.lineJoin = 'round'; c.strokeStyle = 'rgba(0,0,0,.8)';
    c.strokeText(texto, x, y);
    c.fillStyle = '#fff'; c.fillText(texto, x, y);
  },

  // El jugador: quieto usa `spriteJugador`; andando alterna con `spriteCaminar`
  // y su versión volteada, para que parezca que cambia de pie.
  dibujarJugador(c, M, t, j) {
    const quieto = M.spriteJugador && Exploracion.sprites[M.spriteJugador];
    const paso = M.spriteCaminar && Exploracion.sprites[M.spriteCaminar];
    if (!quieto) { // sin sprite: bloque de color, como antes
      c.fillStyle = CONFIG.colorJugador; c.fillRect(j.x, j.y, j.w, j.h);
      Exploracion.rotulo(c, 'yo', j.x + j.w / 2, j.y - 4);
      return;
    }
    const ciclo = paso ? [[quieto, false], [paso, false], [quieto, false], [paso, true]] : [[quieto, false]];
    const [im, volteado] = ciclo[Math.floor(Exploracion.fase) % ciclo.length];
    const alto = (M.altoJugador || 1.9) * t;              // alto del dibujo en casillas
    const ancho = alto * (im.naturalWidth / im.naturalHeight || 1);
    const x = j.x + j.w / 2 - ancho / 2;                  // centrado en la casilla
    const y = j.y + j.h - alto;                           // los pies, en el borde de abajo
    if (!volteado) { c.drawImage(im, x, y, ancho, alto); return; }
    c.save(); c.translate(x + ancho, y); c.scale(-1, 1); c.drawImage(im, 0, 0, ancho, alto); c.restore();
  },
};
