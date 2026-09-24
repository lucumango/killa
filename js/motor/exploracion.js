// =====================================================================
// EXPLORACIÓN (vista desde arriba). Mapas en js/datos/mapas.js.
// El jugador es un rectángulo; los objetos y personajes también,
// salvo que exista el sprite indicado.
// =====================================================================
const Exploracion = {
  lienzo: U.$('#lienzo'), ctx: U.$('#lienzo').getContext('2d'),
  mapa: null, nombre: null, jugador: null, teclas: {}, activo: false, resolver: null,
  sprites: {}, ocupado: false,

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
    (M.objetos || []).concat(M.personajes || []).forEach((o) => { if (o.sprite) U.imagenExiste(o.sprite).then((ok) => { if (ok) { const im = new Image(); im.src = o.sprite; Exploracion.sprites[o.sprite] = im; } }); });
    if (M.spriteJugador) U.imagenExiste(M.spriteJugador).then((ok) => { if (ok) { const im = new Image(); im.src = M.spriteJugador; Exploracion.sprites[M.spriteJugador] = im; } });
    Exploracion.activo = true;
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
  todosObjetos() { const M = Exploracion.mapa; return (M.objetos || []).concat(M.personajes || []); },
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
    if (o.ir) { Exploracion.terminar(o.ir); return; }
    Exploracion.ocupado = true; Exploracion.teclas = {};
    const destino = await Motor.subGuion(o.accion);
    Exploracion.ocupado = false;
    if (destino) Exploracion.terminar(destino);
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
      // salidas automáticas (objetos con `pisar: true`)
      for (const o of Exploracion.todosObjetos()) {
        if (!o.pisar || !o.ir) continue;
        const t = Exploracion.tam, ox = o.x * t, oy = o.y * t, ow = (o.ancho || 1) * t, oh = (o.alto || 1) * t;
        if (j.x < ox + ow && j.x + j.w > ox && j.y < oy + oh && j.y + j.h > oy) { Exploracion.terminar(o.ir); return; }
      }
      const cerca = Exploracion.objetoCerca();
      const pista = U.$('#explorar-pista');
      if (cerca) { pista.hidden = false; pista.textContent = `[${CONFIG.teclas.interactuar[0].toUpperCase()}] ${cerca.etiqueta || cerca.id}`; } else pista.hidden = true;
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
    M.filas.forEach((fila, y) => { for (let x = 0; x < fila.length; x++) {
      const ley = M.leyenda[fila[x]] || {}; c.fillStyle = ley.color || '#333'; c.fillRect(x * t, y * t, t, t);
    } });
    for (const o of Exploracion.todosObjetos()) {
      const ox = o.x * t, oy = o.y * t, ow = (o.ancho || 1) * t, oh = (o.alto || 1) * t;
      const im = o.sprite && Exploracion.sprites[o.sprite];
      if (im) c.drawImage(im, ox, oy, ow, oh);
      else { c.fillStyle = o.color || U.colorDe(o.id); c.fillRect(ox + 2, oy + 2, ow - 4, oh - 4); }
      if (o.etiqueta) { c.fillStyle = '#fff'; c.font = '11px monospace'; c.textAlign = 'center'; c.fillText(o.etiqueta, ox + ow / 2, oy - 4); }
    }
    const imj = M.spriteJugador && Exploracion.sprites[M.spriteJugador];
    if (imj) c.drawImage(imj, j.x, j.y, j.w, j.h);
    else { c.fillStyle = CONFIG.colorJugador; c.fillRect(j.x, j.y, j.w, j.h); c.fillStyle = '#fff'; c.font = '11px monospace'; c.textAlign = 'center'; c.fillText('yo', j.x + j.w / 2, j.y - 4); }
    c.restore();
  },
};
