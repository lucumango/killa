// =====================================================================
// ANIMACIONES DE ESCENA (capa de canvas encima del fondo)
// Se encienden desde el guion:  @animacion carro   /   @animacion off
// Las definiciones (imágenes y velocidades) están en js/datos/animaciones.js
// =====================================================================
const Animacion = {
  actual: null,      // nombre de la animación encendida
  _def: null,        // definición en uso
  _img: {},          // imágenes ya cargadas
  _desnivel: {},     // cuánto desencaja cada capa al repetirse (ver _medirDesnivel)
  _piezas: null,     // centros/recortes de las ruedas
  _lienzo: null,
  _ctx: null,
  _bucle: null,
  _t0: 0,
  _token: 0,         // evita que una carga lenta pise a una animación más nueva

  // ---------- encender / apagar ----------
  async iniciar(nombre) {
    if (!nombre || nombre === 'off' || nombre === 'ninguna') return Animacion.detener();
    const def = ANIMACIONES[nombre];
    if (!def) { console.warn('Animación no definida en animaciones.js:', nombre); return Animacion.detener(); }
    if (Animacion.actual === nombre && Animacion._bucle) { Animacion._lienzoEl().hidden = false; return; } // ya está corriendo
    const mio = ++Animacion._token;
    Animacion.actual = nombre;
    Animacion._def = def;
    for (const c of (def.capas || [])) await Animacion._cargar(c.img, c.quitarFondo);
    const cuerpo = await Animacion._cargar(def.cuerpo, def.quitarFondo);
    const ruedas = await Animacion._cargar(def.ruedas, def.quitarFondo);
    if (mio !== Animacion._token) return;             // ya cambiaron de animación
    Animacion._piezas = Animacion._centrosDeRueda(def, ruedas);
    Animacion._arrancarBucle();
  },

  detener() {
    Animacion._token++;
    Animacion.actual = null; Animacion._def = null; Animacion._piezas = null;
    if (Animacion._bucle) { cancelAnimationFrame(Animacion._bucle); Animacion._bucle = null; }
    const l = Animacion._lienzoEl();
    if (l) { l.hidden = true; Animacion._ctx && Animacion._ctx.clearRect(0, 0, l.width, l.height); }
  },

  // ---------- interno ----------
  _lienzoEl() {
    if (!Animacion._lienzo) {
      Animacion._lienzo = U.$('#animacion');
      if (Animacion._lienzo) Animacion._ctx = Animacion._lienzo.getContext('2d');
    }
    return Animacion._lienzo;
  },

  _cargar(ruta, quitarFondo) {
    if (!ruta) return Promise.resolve(null);
    if (ruta in Animacion._img) return Promise.resolve(Animacion._img[ruta]);
    return new Promise((res) => {
      const im = new Image();
      im.onload = () => { const r = Animacion._quitarFondo(im, ruta, quitarFondo); Animacion._img[ruta] = r; res(r); };
      im.onerror = () => { Animacion._img[ruta] = null; console.warn('Falta la imagen', ruta, '→ se dibuja un bloque de color'); res(null); };
      im.src = ruta;
    });
  },

  // Si exportaste el PNG con fondo blanco en vez de transparente, lo arregla
  // acá mismo: el blanco se vuelve transparente y la línea se queda.
  // quitarFondo: 'auto' (por defecto) lo hace solo si detecta fondo blanco;
  // true lo fuerza; false lo deja tal cual.
  _quitarFondo(im, ruta, modo) {
    if (modo === false) return im;
    try {
      const c = document.createElement('canvas');
      c.width = im.naturalWidth; c.height = im.naturalHeight;
      const g = c.getContext('2d', { willReadFrequently: true });
      g.drawImage(im, 0, 0);
      const d = g.getImageData(0, 0, c.width, c.height);
      const px = d.data;
      if (modo !== true) { // auto: ¿las cuatro esquinas son blanco opaco?
        const esq = [0, (c.width - 1) * 4, (c.height - 1) * c.width * 4, (c.height * c.width - 1) * 4];
        const blanca = (i) => px[i + 3] > 200 && px[i] > 235 && px[i + 1] > 235 && px[i + 2] > 235;
        if (!esq.every(blanca)) return im;
        console.log('[animacion]', ruta, 'venía con fondo blanco: lo hice transparente.');
      }
      for (let i = 0; i < px.length; i += 4) {
        const a = 255 - Math.min(px[i], px[i + 1], px[i + 2]);
        if (a <= 0) { px[i + 3] = 0; continue; }
        // deshacer la mezcla con el blanco para que el trazo no quede desteñido
        for (let k = 0; k < 3; k++) px[i + k] = Math.max(0, Math.min(255, 255 - (255 - px[i + k]) * 255 / a));
        px[i + 3] = Math.min(px[i + 3], a);
      }
      g.putImageData(d, 0, 0);
      c.naturalWidth = c.width; c.naturalHeight = c.height;
      return c;
    } catch (e) { return im; }
  },

  // Una capa que se repite en bucle solo cierra bien si el borde derecho
  // sigue a la misma altura que el izquierdo. A mano eso nunca sale exacto,
  // así que medimos la diferencia y después inclinamos la capa lo justo para
  // que empalme. (Son décimas de grado: no se nota, y el salto desaparece.)
  _medirDesnivel(img, ruta) {
    if (ruta in Animacion._desnivel) return Animacion._desnivel[ruta];
    let delta = 0;
    try {
      const w = img.naturalWidth, h = img.naturalHeight;
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      const g = c.getContext('2d', { willReadFrequently: true });
      g.drawImage(img, 0, 0);
      const d = g.getImageData(0, 0, w, h).data;
      const arriba = (x) => { for (let y = 0; y < h; y++) if (d[(y * w + x) * 4 + 3] > 40) return y; return -1; };
      let xi = 0; while (xi < w && arriba(xi) < 0) xi++;
      let xf = w - 1; while (xf > 0 && arriba(xf) < 0) xf--;
      if (xi < xf) {
        const dif = arriba(xf) - arriba(xi);
        if (Math.abs(dif) <= h * 0.08) delta = dif;   // solo si es un desnivel chico
      }
    } catch (e) { /* lienzo sin permiso de lectura: lo dejamos derecho */ }
    if (delta) console.log('[animacion]', ruta, 'no cerraba el bucle por', delta, 'px: lo nivelé.');
    Animacion._desnivel[ruta] = delta;
    return delta;
  },

  // Busca los dibujos sueltos dentro del PNG de ruedas y devuelve el recorte
  // de cada uno. Así cada rueda gira sobre su propio centro sin que tengas
  // que medir nada: basta con dibujarlas separadas en la misma capa.
  _centrosDeRueda(def, img) {
    if (Array.isArray(def.centrosRueda)) {
      return def.centrosRueda.map((c) => ({ x0: c.x - c.r, y0: c.y - c.r, w: c.r * 2, h: c.r * 2, cx: c.x, cy: c.y }));
    }
    if (!img) return null;
    try {
      const c = document.createElement('canvas');
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      const g = c.getContext('2d', { willReadFrequently: true });
      g.drawImage(img, 0, 0);
      const d = g.getImageData(0, 0, c.width, c.height).data;
      const usada = new Uint8Array(c.width);
      const arriba = new Int32Array(c.width).fill(c.height);
      const abajo = new Int32Array(c.width).fill(-1);
      for (let y = 0; y < c.height; y++) {
        const fila = y * c.width;
        for (let x = 0; x < c.width; x++) {
          if (d[(fila + x) * 4 + 3] > 16) { usada[x] = 1; if (y < arriba[x]) arriba[x] = y; if (y > abajo[x]) abajo[x] = y; }
        }
      }
      const piezas = []; let ini = -1, hueco = 0;
      const HUECO = Math.max(8, Math.round(c.width * 0.01)); // columnas vacías que se perdonan
      for (let x = 0; x <= c.width; x++) {
        const on = x < c.width && usada[x];
        if (on) { if (ini < 0) ini = x; hueco = 0; }
        else if (ini >= 0 && ++hueco > HUECO) {
          const fin = x - hueco;
          let y0 = c.height, y1 = -1;
          for (let i = ini; i <= fin; i++) { if (arriba[i] < y0) y0 = arriba[i]; if (abajo[i] > y1) y1 = abajo[i]; }
          if (fin - ini > 4) piezas.push({ x0: ini, y0, w: fin - ini + 1, h: y1 - y0 + 1, cx: (ini + fin) / 2, cy: (y0 + y1) / 2 });
          ini = -1; hueco = 0;
        }
      }
      if (piezas.length) console.log(`[animacion] ${piezas.length} rueda(s) detectada(s):`, piezas.map((p) => `x:${Math.round(p.cx)} y:${Math.round(p.cy)} r:${Math.round(p.w / 2)}`).join('  '));
      return piezas.length ? piezas : null;
    } catch (e) { // p. ej. si abres el juego con doble clic (file://) en vez de un servidor
      console.warn('[animacion] no pude leer los píxeles de las ruedas; giran como una sola pieza.', e.message);
      return null;
    }
  },

  _arrancarBucle() {
    const l = Animacion._lienzoEl();
    if (!l) return;
    l.hidden = false;
    Animacion._t0 = performance.now();
    if (Animacion._bucle) cancelAnimationFrame(Animacion._bucle);
    const paso = (ahora) => {
      Animacion._bucle = requestAnimationFrame(paso);
      if (!Animacion._def || l.offsetParent === null) return; // escena oculta: no dibujes
      Animacion._dibujar((ahora - Animacion._t0) / 1000);
    };
    Animacion._bucle = requestAnimationFrame(paso);
  },

  _dibujar(t) {
    const d = Animacion._def, g = Animacion._ctx, l = Animacion._lienzo;
    g.clearRect(0, 0, l.width, l.height);
    const suave = d.suavizado !== false;            // dibujo a línea: suavizado. Pixel art: ponlo en false.
    g.imageSmoothingEnabled = suave;
    l.classList.toggle('pixel', !suave);
    const u = l.width / 960;                        // el lienzo va a doble resolución; los px del
                                                    // archivo de datos son px de pantalla (960x600)

    const cuerpo = Animacion._img[d.cuerpo], ruedas = Animacion._img[d.ruedas];
    const ref = cuerpo || ruedas;
    const iw = ref ? ref.naturalWidth : 1920, ih = ref ? ref.naturalHeight : 1200;
    const f = (d.escala == null ? 1 : d.escala) * Math.min(l.width / iw, l.height / ih);

    const tau = Math.PI * 2;
    const rebote = Math.sin(t * tau * (d.reboteVel || 0)) * (d.rebote || 0) * u;
    const ladeo = Math.sin(t * tau * (d.ladeoVel || 0)) * (d.ladeo || 0) * Math.PI / 180;
    const vaivenX = Math.sin(t * tau * (d.ladeoVel || 0) * 1.7) * (d.bamboleo || 0) * u;
    const reboteRuedas = rebote * (d.reboteRuedas == null ? 0.3 : d.reboteRuedas);
    const giro = d.ruedaVaiven
      ? Math.sin(t * tau * (d.ruedaVel || 0)) * d.ruedaVaiven * Math.PI / 180
      : t * tau * (d.ruedaVel || 0);

    // --- color de fondo propio de la animación (el cielo) ---
    if (d.color) { g.fillStyle = d.color; g.fillRect(0, 0, l.width, l.height); }

    // --- capas de paisaje que se desplazan en bucle (nubes, cerros, pista) ---
    for (const c of (d.capas || [])) {
      // capas dibujadas por código (rectas de verdad y el bucle cierra exacto)
      if (c.tipo === 'linea' || c.tipo === 'guiones') { Animacion._capaTrazada(g, l, u, d, c, t); continue; }
      const im = Animacion._img[c.img];
      if (!im) continue;
      const cf = (c.escala == null ? (d.escala == null ? 1 : d.escala) : c.escala) * Math.min(l.width / im.naturalWidth, l.height / im.naturalHeight);
      const cw = im.naturalWidth * cf, ch = im.naturalHeight * cf;
      const cy = (l.height - ch) / 2 + (d.y || 0) * u + (c.y || 0) * u;
      const base = (l.width - cw) / 2 + (d.x || 0) * u + (c.x || 0) * u;
      const desp = (((t * (c.vel || 0) * u) % cw) + cw) % cw;
      const inclina = c.nivelar === false ? 0 : -Animacion._medirDesnivel(im, c.img) / im.naturalWidth;
      let x = base + desp;
      while (x > 0) x -= cw;                      // empieza fuera de pantalla por la izquierda
      for (; x < l.width; x += cw) {
        if (!inclina) { g.drawImage(im, x, cy, cw, ch); continue; }
        g.save();
        g.translate(x, cy);
        g.transform(1, inclina, 0, 1, 0, 0);      // inclina lo justo para que empalme
        g.drawImage(im, 0, 0, cw, ch);
        g.restore();
      }
    }

    g.save();
    g.translate(l.width / 2 + (d.x || 0) * u + vaivenX, l.height / 2 + (d.y || 0) * u);
    g.rotate(ladeo);
    g.scale(f, f);
    g.translate(-iw / 2, -ih / 2);

    // --- ruedas (debajo de la carrocería) ---
    g.save();
    g.translate(0, reboteRuedas / f);
    if (ruedas && Animacion._piezas) {
      for (const p of Animacion._piezas) {
        g.save();
        g.translate(p.cx, p.cy); g.rotate(giro);
        g.drawImage(ruedas, p.x0, p.y0, p.w, p.h, -p.w / 2, -p.h / 2, p.w, p.h);
        g.restore();
      }
    } else if (ruedas) {
      g.drawImage(ruedas, 0, 0);
    } else {
      Animacion._ruedasFalsas(g, iw, ih, giro, d.ruedas);
    }
    g.restore();

    // --- carrocería (rebota) ---
    g.save();
    g.translate(0, rebote / f);
    if (cuerpo) g.drawImage(cuerpo, 0, 0);
    else Animacion._bloqueFalso(g, iw, ih, d.cuerpo);
    g.restore();

    g.restore();
  },

  // Capas hechas con código: el suelo (una raya) y la pista (rectangulitos en
  // fila que se desplazan). Las medidas van en píxeles de pantalla (960 x 600).
  _capaTrazada(g, l, u, d, c, t) {
    const tinta = c.color || d.tinta || '#2d4fff';
    const y = (c.y || 0) * u;   // posición directa en la pantalla de 960x600
    const grosor = (c.grosor == null ? 1.5 : c.grosor) * u;  // 1.5 = 3 px reales
    g.strokeStyle = tinta; g.fillStyle = tinta; g.lineWidth = grosor;

    if (c.tipo === 'linea') {
      g.beginPath(); g.moveTo(0, y); g.lineTo(l.width, y); g.stroke();
      return;
    }
    // guiones: rectángulos en fila, repetidos sin costura
    const largo = (c.largo == null ? 54 : c.largo) * u;
    const alto = (c.alto == null ? 11 : c.alto) * u;
    const paso = largo + (c.hueco == null ? 30 : c.hueco) * u;
    const tmb = (c.temblor || 0) * u;        // 0 = rectángulos exactos; 2 o 3 = hechos a mano
    const s = t * (c.vel || 0) * u;
    const az = (n) => { const h = Math.sin(n * 127.1) * 43758.5453; return h - Math.floor(h) - 0.5; };
    for (let k = Math.floor((-paso - s) / paso); k <= Math.ceil((l.width - s) / paso); k++) {
      const x = k * paso + s;
      if (!tmb) { c.relleno ? g.fillRect(x, y, largo, alto) : g.strokeRect(x, y, largo, alto); continue; }
      g.save();
      g.translate(x + az(k) * tmb, y + az(k + 91) * tmb);
      g.rotate(az(k + 17) * 0.03);
      const L = largo + az(k + 53) * tmb * 2, A = alto + az(k + 7) * tmb;
      c.relleno ? g.fillRect(0, 0, L, A) : g.strokeRect(0, 0, L, A);
      g.restore();
    }
  },

  // Bloques de color mientras no exista el dibujo (misma idea que los fondos).
  _bloqueFalso(g, iw, ih, ruta) {
    const w = iw * 0.62, h = ih * 0.3, x = (iw - w) / 2, y = ih * 0.38;
    g.fillStyle = U.colorDe(ruta || 'cuerpo');
    g.fillRect(x, y, w, h);
    g.fillStyle = 'rgba(255,255,255,.75)';
    g.font = `${Math.round(ih * 0.03)}px monospace`;
    g.textAlign = 'center';
    g.fillText((ruta || 'cuerpo') + ' (sin imagen)', iw / 2, y + h / 2);
  },
  _ruedasFalsas(g, iw, ih, giro, ruta) {
    const r = ih * 0.07, y = ih * 0.7;
    for (const x of [iw * 0.34, iw * 0.66]) {
      g.save(); g.translate(x, y); g.rotate(giro);
      g.fillStyle = U.colorDe(ruta || 'ruedas');
      g.beginPath(); g.arc(0, 0, r, 0, Math.PI * 2); g.fill();
      g.strokeStyle = 'rgba(255,255,255,.8)'; g.lineWidth = r * 0.12;
      g.beginPath(); g.moveTo(0, 0); g.lineTo(0, -r * 0.8); g.stroke();
      g.restore();
    }
  },
};
