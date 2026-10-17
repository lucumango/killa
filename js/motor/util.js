// Utilidades pequeñas compartidas por el motor.
const U = {
  $: (sel) => document.querySelector(sel),
  $$: (sel) => Array.from(document.querySelectorAll(sel)),
  espera: (ms) => new Promise((r) => setTimeout(r, ms)),
  // Color estable a partir de un texto (para placeholders de arte).
  colorDe(texto) {
    let h = 0;
    for (const c of String(texto)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return `hsl(${h % 360}, 45%, 38%)`;
  },
  // Carga una imagen y espera a que esté LISTA PARA PINTAR (decode), no solo
  // descargada. Si no se espera al decode, al cambiar de fondo el navegador
  // sigue mostrando el anterior mientras procesa el nuevo.
  // Guarda el objeto Image, no un booleano, para que no se descarte de memoria.
  _imgCache: {},
  cargarImagen(ruta) {
    if (!ruta) return Promise.resolve(false);
    if (ruta in U._imgCache) return Promise.resolve(U._imgCache[ruta]);
    return new Promise((res) => {
      const im = new Image();
      const listo = () => { U._imgCache[ruta] = im; res(im); };
      im.onload = () => (im.decode ? im.decode().then(listo, listo) : listo());
      im.onerror = () => { U._imgCache[ruta] = false; res(false); };
      im.src = ruta;
    });
  },
  imagenExiste(ruta) { return U.cargarImagen(ruta).then(Boolean); },

  // Cuánto del alto del PNG ocupa realmente el dibujo (0 a 1). Se usa para que
  // un personaje no crezca y se encoja al cambiar de cara, cuando sus dibujos
  // están encuadrados distinto. Se mide una vez y se guarda.
  _tinta: {},
  async medirTinta(ruta) {
    if (ruta in U._tinta) return U._tinta[ruta];
    const im = await U.cargarImagen(ruta);
    if (!im) return (U._tinta[ruta] = 1);
    try {
      const c = document.createElement('canvas');
      c.width = im.naturalWidth; c.height = im.naturalHeight;
      const g = c.getContext('2d', { willReadFrequently: true });
      g.drawImage(im, 0, 0);
      const p = g.getImageData(0, 0, c.width, c.height).data;
      let y0 = c.height, y1 = -1;
      for (let y = 0; y < c.height; y++) {
        for (let x = 0; x < c.width; x += 2) {
          if (p[(y * c.width + x) * 4 + 3] > 24) { if (y < y0) y0 = y; y1 = y; break; }
        }
      }
      return (U._tinta[ruta] = y1 < 0 ? 1 : (y1 - y0 + 1) / c.height);
    } catch { return (U._tinta[ruta] = 1); }
  },

  // Va cargando imágenes en segundo plano, sin hacer esperar a nadie, para que
  // cuando el guion las pida ya estén listas y el cambio sea instantáneo.
  precargar(rutas) {
    let i = 0;
    const siguiente = () => {
      if (i >= rutas.length) return;
      U.cargarImagen(rutas[i++]).then(() => setTimeout(siguiente, 0));
    };
    for (let k = 0; k < 3; k++) siguiente();   // de tres en tres, sin atorar la red
  },

  // Pone imagen de fondo en un elemento o, si no existe, un bloque de color con etiqueta.
  async pintar(el, ruta, etiqueta) {
    const ok = await U.cargarImagen(ruta);
    el.classList.add('placeholder');
    if (ok) { el.style.backgroundImage = `url("${ruta}")`; el.style.backgroundColor = ''; el.textContent = ''; }
    else { el.style.backgroundImage = 'none'; el.style.backgroundColor = U.colorDe(etiqueta); el.textContent = etiqueta + ' (sin imagen)'; }
  },
  aviso(texto, ms = 2600) {
    const cont = U.$('#avisos');
    while (cont.children.length >= 3) cont.firstChild.remove(); // máximo 3 avisos a la vez
    const d = document.createElement('div');
    d.className = 'aviso'; d.textContent = texto;
    cont.appendChild(d);
    setTimeout(() => d.remove(), ms);
  },
  // Espera una tecla de "avanzar" (Enter, Espacio, Z) o un clic.
  esperarAvance() {
    return new Promise((res) => {
      const tk = (e) => { if (Celular.abierto) return; if (Entrada.esAvance(e)) { e.preventDefault(); fin(); } };
      const tc = () => { if (!Celular.abierto) fin(); };
      const fin = () => { window.removeEventListener('keydown', tk); U.$('#juego').removeEventListener('click', tc); res(); };
      window.addEventListener('keydown', tk);
      U.$('#juego').addEventListener('click', tc);
    });
  },
  normalizar(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9'ñ ]/g, ' ').replace(/\s+/g, ' ').trim();
  },
};

// Teclado centralizado. Cambia las teclas en js/datos/config.js.
const Entrada = {
  teclas: CONFIG.teclas,
  esAvance: (e) => Entrada.teclas.avanzar.includes(e.key),
  esCancelar: (e) => Entrada.teclas.cancelar.includes(e.key),
  esCelular: (e) => Entrada.teclas.celular.includes(e.key),
  esInteractuar: (e) => Entrada.teclas.interactuar.includes(e.key),
  esSaltar: (e) => Entrada.teclas.saltar.includes(e.key),
  // Menús verticales con flechas / W-S.
  navegarLista(elems, indice, e) {
    if (['ArrowUp', 'w', 'W'].includes(e.key)) indice = (indice - 1 + elems.length) % elems.length;
    if (['ArrowDown', 's', 'S'].includes(e.key)) indice = (indice + 1) % elems.length;
    elems.forEach((li, i) => li.classList.toggle('seleccionado', i === indice));
    if (elems[indice] && elems[indice].scrollIntoView) elems[indice].scrollIntoView({ block: 'nearest' });
    return indice;
  },
};

// Escala la caja del juego para que quepa en la ventana.
function ajustarEscala() {
  const j = U.$('#juego');
  const esc = Math.min(window.innerWidth / 960, window.innerHeight / 600);
  j.style.transform = `scale(${esc})`;
}
window.addEventListener('resize', ajustarEscala);
ajustarEscala();
