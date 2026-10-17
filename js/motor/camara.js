// =====================================================================
// CÁMARA Y ACTORES DE ESCENA
// Para los fondos que son más altos que la pantalla (como calle_loro):
// se encuadra una parte y la cámara se desplaza cuando el guion lo pide.
// Los actores son sprites pegados AL DIBUJO, no a la pantalla, así que
// cuando la cámara sube o baja se mueven con el fondo.
//
// Desde el guion:
//   @camara abajo            encuadra la parte de abajo (de una)
//   @camara arriba 2200      sube el encuadre en 2,2 segundos
//   @camara 40 1500          a la altura que quieras (0 = arriba, 100 = abajo)
//   @actor flor 78 39        pone a Flor en ese punto DEL DIBUJO (en %)
//   @actor flor off          la quita
//   @mover flor 80 76 2600   la hace caminar hasta ahí en 2,6 segundos
// =====================================================================
const Camara = {
  y: 1,            // 0 = mirando arriba del dibujo, 1 = mirando abajo
  fondo: null,     // ruta del fondo que se está midiendo
  _nat: {},        // ruta -> tamaño real del PNG
  actores: {},     // id -> { el, bx, by, def, fase }
  _tic: null,

  // ---------- medidas ----------
  medir(ruta) {
    if (ruta in Camara._nat) return Promise.resolve(Camara._nat[ruta]);
    return new Promise((res) => {
      const im = new Image();
      im.onload = () => res((Camara._nat[ruta] = { w: im.naturalWidth, h: im.naturalHeight }));
      im.onerror = () => res((Camara._nat[ruta] = null));
      im.src = ruta;
    });
  },
  // Cómo queda el dibujo dentro de la pantalla con background-size: cover.
  geo() {
    const juego = U.$('#juego');
    const W = juego.offsetWidth || 960, H = juego.offsetHeight || 600;
    const nat = Camara._nat[Camara.fondo];
    if (!nat) return { W, H, dw: W, dh: H, ox: 0, oy: 0 };
    const esc = Math.max(W / nat.w, H / nat.h);
    const dw = nat.w * esc, dh = nat.h * esc;
    return { W, H, dw, dh, ox: dw - W, oy: dh - H };
  },

  // ---------- encuadre ----------
  async usarFondo(nombre) {
    Camara.quitarActores();
    Camara.y = 1;                                   // por defecto, la parte de abajo
    Camara.fondo = nombre ? `assets/img/fondos/${nombre}.png` : null;
    if (Camara.fondo) await Camara.medir(Camara.fondo);
    Camara.pintar();
  },
  // 'arriba' | 'centro' | 'abajo' | un número de 0 a 100
  async mover(donde, ms) {
    const mapa = { arriba: 0, alto: 0, centro: 0.5, medio: 0.5, abajo: 1, bajo: 1 };
    const d = String(donde || '').toLowerCase();
    const destino = d in mapa ? mapa[d] : Math.max(0, Math.min(1, (Number(d) || 0) / 100));
    const dur = Math.max(0, Number(ms) || 0);
    if (!dur) { Camara.y = destino; Camara.pintar(); return; }
    const ini = Camara.y, t0 = performance.now();
    await new Promise((res) => {
      const paso = () => {
        const k = Math.min(1, (performance.now() - t0) / dur);
        Camara.y = ini + (destino - ini) * (k * k * (3 - 2 * k));   // suave al entrar y al salir
        Camara.pintar();
        if (k < 1) requestAnimationFrame(paso); else res();
      };
      requestAnimationFrame(paso);
    });
  },

  // ---------- actores ----------
  capa() {
    let c = U.$('#actores');
    if (!c) { c = document.createElement('div'); c.id = 'actores'; c.className = 'actores';
      U.$('#juego').insertBefore(c, U.$('#cuadro')); }
    return c;
  },
  poner(id, tipo, bx, by) {
    if (tipo === 'off' || bx === 'off') return Camara.quitar(id);
    const def = (typeof CRUCES !== 'undefined' && CRUCES[tipo]) || { marcos: [tipo] };
    let a = Camara.actores[id];
    if (!a) {
      const el = document.createElement('div'); el.className = 'actor';
      Camara.capa().appendChild(el);
      a = Camara.actores[id] = { el, fase: 0 };
    }
    a.def = def; a.tipo = tipo;
    a.bx = Math.max(0, Math.min(1, (Number(bx) || 0) / 100));
    a.by = Math.max(0, Math.min(1, (Number(by) || 0) / 100));
    a.el.style.backgroundImage = `url("assets/img/sprites/${def.marcos[0]}.png")`;
    Camara.pintar();
  },
  quitar(id) {
    const a = Camara.actores[id];
    if (a) { a.el.remove(); delete Camara.actores[id]; }
  },
  quitarActores() { Object.keys(Camara.actores).forEach(Camara.quitar); },

  // Camina hasta un punto del dibujo alternando los dibujos de la caminata.
  async caminar(id, bx, by, ms) {
    const a = Camara.actores[id];
    if (!a) { console.warn('@mover: no hay ningún actor que se llame ' + id); return; }
    const x1 = Math.max(0, Math.min(1, (Number(bx) || 0) / 100));
    const y1 = Math.max(0, Math.min(1, (Number(by) || 0) / 100));
    const x0 = a.bx, y0 = a.by, dur = Math.max(100, Number(ms) || 2000);
    const mira = x1 < x0;                       // hacia dónde camina
    const t0 = performance.now();
    await new Promise((res) => {
      const paso = () => {
        const t = (performance.now() - t0) / 1000;
        const k = Math.min(1, (t * 1000) / dur);
        a.bx = x0 + (x1 - x0) * k; a.by = y0 + (y1 - y0) * k;
        a.fase = t * (a.def.porSegundo || 6);
        a.mira = mira;
        Camara.pintar();
        if (k < 1) requestAnimationFrame(paso); else res();
      };
      requestAnimationFrame(paso);
    });
    a.fase = 0; Camara.pintar();                // queda quieto al llegar
  },

  // ---------- dibujar ----------
  pintar() {
    const f = U.$('#fondo');
    if (f) f.style.backgroundPosition = `center ${Camara.y * 100}%`;
    const g = Camara.geo();
    for (const a of Object.values(Camara.actores)) {
      const alto = Number(a.def.alto) || 150;
      // el punto que das es DONDE PISA: los pies del dibujo
      const x = a.bx * g.dw - g.ox * 0.5;
      const y = a.by * g.dh - g.oy * Camara.y;
      a.el.style.height = alto + 'px';
      a.el.style.width = Math.round(alto * 1.3) + 'px';
      a.el.style.left = Math.round(x - alto * 0.65) + 'px';
      a.el.style.top = Math.round(y - alto) + 'px';
      // caminata: quieto, paso, quieto, paso volteado (igual que en el mapa)
      const m = a.def.marcos || [];
      let img = m[0], volteado = false;
      if (a.fase && m.length > 1) {
        const ciclo = [[m[0], false], [m[1], false], [m[0], false], [m[1], true]];
        [img, volteado] = ciclo[Math.floor(a.fase) % 4];
      }
      a.el.style.backgroundImage = `url("assets/img/sprites/${img}.png")`;
      const espejo = (!!a.def.espejo) !== (!!a.mira);
      a.el.style.transform = (espejo !== volteado) ? 'scaleX(-1)' : 'none';
    }
  },
};
