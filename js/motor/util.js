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
  // Comprueba si una imagen existe (cacheado). Si no existe, se usa bloque de color.
  _imgCache: {},
  imagenExiste(ruta) {
    if (!ruta) return Promise.resolve(false);
    if (ruta in U._imgCache) return Promise.resolve(U._imgCache[ruta]);
    return new Promise((res) => {
      const im = new Image();
      im.onload = () => { U._imgCache[ruta] = true; res(true); };
      im.onerror = () => { U._imgCache[ruta] = false; res(false); };
      im.src = ruta;
    });
  },
  // Pone imagen de fondo en un elemento o, si no existe, un bloque de color con etiqueta.
  async pintar(el, ruta, etiqueta) {
    const ok = await U.imagenExiste(ruta);
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
