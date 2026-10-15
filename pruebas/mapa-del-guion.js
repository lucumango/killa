// Ejecuta: node pruebas/mapa-del-guion.js
// Arma mapa-del-guion.html: todo el guion en orden, marcando cada hueco de imagen
// (fondo, cuadro, mapa, animación) con el dibujo que ya existe o un "falta".
// Sirve para mirar el guion y decidir qué dibujo va en qué parte.
const fs = require('fs'), vm = require('vm'), path = require('path');

const raiz = path.join(__dirname, '..');
const ctx = { window: {}, console };
vm.createContext(ctx);
for (const f of ['js/datos/config.js', 'js/datos/personajes.js', 'js/datos/palabras.js', 'js/datos/mapas.js', 'js/datos/animaciones.js'])
  vm.runInContext(fs.readFileSync(path.join(raiz, f), 'utf8'), ctx);
ctx.GUION = { archivos: {}, registrar(n, t) { ctx.GUION.archivos[n] = t; } };
const orden = ['cap01.js', 'cap02.js', 'cap03.js', 'ruta_flor.js', 'ruta_amaru.js', 'final.js'];
const enDisco = fs.readdirSync(path.join(raiz, 'js/datos/guion'));
for (const f of orden.concat(enDisco.filter((f) => !orden.includes(f))))
  if (enDisco.includes(f)) vm.runInContext(fs.readFileSync(path.join(raiz, 'js/datos/guion/', f), 'utf8'), ctx);
const { PERSONAJES, MAPAS, ANIMACIONES } = vm.runInContext('({PERSONAJES, MAPAS, ANIMACIONES})', ctx);
const GUION = ctx.GUION;

const existe = (p) => fs.existsSync(path.join(raiz, p));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Qué archivo le toca a cada tipo de hueco
const archivoDe = {
  fondo: (n) => `assets/img/fondos/${n}.png`,
  cuadro: (n) => `assets/img/cuadros/${n}.png`,
  explorar: (n) => (MAPAS[n] && MAPAS[n].imagen) || '',
  animacion: (n) => (ANIMACIONES[n] && ANIMACIONES[n].cuerpo) || '',
};
const titulo = { fondo: 'Fondo', cuadro: 'Lámina', explorar: 'Mapa', animacion: 'Animación' };

let html = '', total = 0, hechos = 0;
const resumen = {};

for (const [cap, texto] of Object.entries(GUION.archivos)) {
  const lineas = texto.split('\n');
  html += `<h2 id="${cap}">${cap}</h2>\n`;
  let bloque = [];   // texto acumulado desde el último hueco
  // El guion vive dentro de un archivo .js, así que la línea del guion y la del
  // archivo no son la misma. Buscamos la de verdad para poder abrirla en el editor.
  const crudo = fs.readFileSync(path.join(raiz, 'js/datos/guion/', cap + '.js'), 'utf8').split('\n');
  let cursor = 0;
  const lineaEnArchivo = (contenido) => {
    for (let k = cursor; k < crudo.length; k++)
      if (crudo[k].trim() === contenido) { cursor = k + 1; return k + 1; }
    return null;
  };

  const volcarTexto = () => {
    const t = bloque.filter((l) => l.trim() && !l.trim().startsWith('#')).slice(0, 4);
    if (t.length) html += `<p class="txt">${t.map(esc).join('<br>')}${bloque.length > 4 ? ' …' : ''}</p>\n`;
    bloque = [];
  };

  lineas.forEach((raw, i) => {
    const l = raw.trim();
    const m = l.match(/^@(fondo|cuadro|explorar|animacion)\s+(\S+)/i);
    if (!m) { if (bloque.length < 60) bloque.push(l); return; }
    volcarTexto();
    const tipo = m[1].toLowerCase(), nombre = m[2];
    if (nombre === 'off' || nombre === 'ninguna') { html += `<p class="apaga">— se quita ${titulo[tipo].toLowerCase()} —</p>\n`; return; }
    const arch = archivoDe[tipo](nombre);
    const hay = arch && existe(arch);
    total++; if (hay) hechos++;
    const clave = tipo + ':' + nombre;
    resumen[clave] = resumen[clave] || { tipo, nombre, arch, hay, veces: 0, donde: [] };
    resumen[clave].veces++; resumen[clave].donde.push(`${cap}:${i + 1}`);
    const enArchivo = lineaEnArchivo(l);
    html += `<div class="hueco ${hay ? 'si' : 'no'}">
      <div class="mini">${hay ? `<img loading="lazy" src="${arch}" alt="">` : '<span>falta</span>'}</div>
      <div class="meta"><b>${titulo[tipo]}: ${esc(nombre)}</b>
        <code>${cap}:${i + 1}</code>${enArchivo ? `<span class="archivo">js/datos/guion/${cap}.js, línea ${enArchivo}</span>` : ''}
        <span class="ruta">${esc(arch || '(sin archivo asignado)')}</span></div>
    </div>\n`;
  });
  volcarTexto();
}

const filas = Object.values(resumen).sort((a, b) => (a.hay - b.hay) || b.veces - a.veces || a.nombre.localeCompare(b.nombre));
const tabla = filas.map((r) => `<tr class="${r.hay ? 'si' : 'no'}"><td>${titulo[r.tipo]}</td><td><b>${esc(r.nombre)}</b></td>
  <td>${r.veces}</td><td><code>${esc(r.donde.slice(0, 3).join(', '))}${r.donde.length > 3 ? ' …' : ''}</code></td>
  <td>${r.hay ? 'hecho' : '<b>falta</b>'}</td><td class="ruta">${esc(r.arch)}</td></tr>`).join('\n');

fs.writeFileSync(path.join(raiz, 'mapa-del-guion.html'), `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>Killa — mapa del guion</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
 :root { --papel:#fcfae2; --tinta:#223377; }
 body { margin:0; background:#f7f7f4; color:#1b1b20; font:15px/1.55 -apple-system,system-ui,sans-serif; }
 header { position:sticky; top:0; background:#222a40; color:#fff; padding:14px 24px; z-index:5; }
 header h1 { margin:0 0 4px; font-size:20px; }
 header p { margin:0; opacity:.8; font-size:13px; }
 main { max-width:860px; margin:0 auto; padding:24px 20px 80px; }
 h2 { margin:40px 0 10px; font-size:17px; text-transform:uppercase; letter-spacing:1px;
      color:#555; border-bottom:2px solid #ddd; padding-bottom:4px; }
 .txt { margin:8px 0 8px 2px; color:#444; white-space:pre-wrap; }
 .apaga { margin:6px 0; color:#999; font-size:12px; font-style:italic; }
 .hueco { display:flex; gap:12px; align-items:center; margin:14px 0; padding:8px;
          border-radius:8px; background:#fff; border:1px solid #e3e3e6; }
 .hueco.no { background:#fff6f6; border-color:#f0c9c9; }
 .mini { width:140px; height:88px; flex:0 0 140px; background:var(--papel); border-radius:5px;
         display:flex; align-items:center; justify-content:center; overflow:hidden; }
 .hueco.no .mini { background:#fbe9e9; color:#b44; font-size:12px; letter-spacing:1px; }
 .mini img { width:100%; height:100%; object-fit:cover; display:block; }
 .meta b { display:block; }
 .meta code { font-size:12px; color:#666; }
 .archivo { display:block; font-size:11px; color:#777; }
 .ruta { display:block; font-size:11px; color:#999; font-family:ui-monospace,monospace; }
 table { border-collapse:collapse; width:100%; font-size:13px; margin:12px 0 30px; }
 th { background:#222a40; color:#fff; text-align:left; padding:6px 8px; position:sticky; top:62px; }
 td { border-bottom:1px solid #e5e5e8; padding:5px 8px; vertical-align:top; }
 tr.no td { background:#fff6f6; }
 .como { background:#fff; border-left:4px solid #222a40; padding:12px 16px; margin:18px 0; }
</style></head><body>
<header><h1>Killa — mapa del guion</h1>
<p>${hechos} de ${total} apariciones ya tienen dibujo · ${filas.filter((f) => !f.hay).length} huecos distintos sin dibujo ·
generado con <code>node pruebas/mapa-del-guion.js</code></p></header>
<main>
<div class="como"><b>Para decirme dónde va un dibujo</b>, dame el código que sale al lado de cada hueco
(por ejemplo <code>cap01:199</code>) o el nombre del hueco (<code>calle_loro</code>), y el archivo que le toca.
Debajo de cada código está también la línea del archivo .js, por si lo quieres abrir en el editor.
Si el dibujo es para un momento que todavía no tiene hueco, dime el código de la línea más cercana y yo le abro uno.</div>
<h2>Resumen</h2>
<table><tr><th>Qué</th><th>Nombre</th><th>Veces</th><th>Dónde</th><th>Estado</th><th>Archivo</th></tr>
${tabla}</table>
<h2>El guion, en orden</h2>
${html}
</main></body></html>`);

console.log(`mapa-del-guion.html listo: ${hechos}/${total} apariciones con dibujo, ${filas.filter((f) => !f.hay).length} huecos distintos sin dibujo.`);
console.log('Ábrelo en http://localhost:8765/mapa-del-guion.html');
