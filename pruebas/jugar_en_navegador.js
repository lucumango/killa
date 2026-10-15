// Juega el juego real en Chromium desde el capítulo 3, eligiendo opciones según preferencias.
// Uso: node pruebas/jugar_en_navegador.js   (necesita Playwright instalado de forma global)
const G = require('child_process').execSync('npm root -g').toString().trim();
const { chromium } = require(G + '/playwright');
const casos = [
  { nombre: 'amaru-todo', vars: { presentacion: 'perdi', amaru_broma: 1, pregunta: 'vivido', amaru_sabe_becas: 1, yape: 30.5 },
    prefs: ['comer', 'Ring Pop', 'Llevarlo', 'Frugele', 'Llevarlo', 'Volver al mostrador', 'otras cosas', 'Linterna', 'Llevarlo', 'Volver al mostrador', 'Ya está', 'Haykataq', 'yapita', 'Escribirle a Amaru', 'mikhuy', 'AMARU', 'su nombre', 'Seguir', 'tengo algo', 'Seguir', 'Tengo algo', 'Seguir', 'Vienes', 'Volver a la tarde', 'FLOR', 'ventana', 'Sí.', 'Espera. Tengo', 'Contestar', 'Haku', 'Terminar'] },
  { nombre: 'flor-nada', vars: { presentacion: 'viaje', amaru_broma: 0, pregunta: 'edad', yape: 28 },
    prefs: ['Ya está', 'Cuánto', 'Pagar', 'Escribir al grupo', 'punchaw', 'FLOR', 'mesa', 'Sí.', 'Miski', 'Contestar', 'Haku', 'Volver a la tarde', 'AMARU', 'foto', 'Seguir', 'Ayacucho', 'Seguir', 'postulas', 'Seguir', 'No decir nada', 'Terminar'] },
];
(async () => {
  const b = await chromium.launch();
  for (const c of casos) {
    const p = await b.newPage();
    const errores = [];
    p.on('pageerror', (e) => errores.push('pageerror ' + e.message));
    p.on('console', (m) => { if (['error', 'warning'].includes(m.type()) && !/Failed to load resource|404/.test(m.text())) errores.push(m.type() + ' ' + m.text()); });
    await p.addInitScript(() => { window.addEventListener('DOMContentLoaded', () => { Menu.dedicatoria = () => {}; }); });
    await p.goto('file://' + require('path').resolve(__dirname, '..', 'index.html'));
    await p.waitForTimeout(500);
    await p.evaluate((vars) => {
      CONFIG.velocidadTexto = 0; CONFIG.beepAlHablar = false; const e0 = U.espera; U.espera = (ms) => (ms > 0 ? e0(Math.min(ms, 30)) : Promise.resolve());
      const a0 = U.aviso; window.__avisos = []; U.aviso = (t, ms) => { window.__avisos.push(t); return a0(t, ms); };
      Object.values(PERSONAJES).forEach((x) => { x.velocidad = 0; });
      Motor.nuevaPartida(); Motor.vars = vars; Motor.cargarCapitulo('cap03'); Motor.pc = 0;
      window.__fin = false; const t = Motor.terminar; Motor.terminar = async () => { window.__fin = true; await t(); };
      window.__textos = []; const d = Dialogo.decir; Dialogo.decir = (q, e, t2) => { window.__textos.push(q + ': ' + t2); return d(q, e, t2); };
      Motor.correr();
    }, c.vars);
    let k = 0, pasos = 0;
    const elegidas = [];
    while (pasos++ < 30000) {
      const st = await p.evaluate(() => ({
        fin: window.__fin,
        ops: document.querySelector('#opciones') && !document.querySelector('#opciones').hidden ? [...document.querySelectorAll('#opciones li')].map((l) => l.textContent) : null,
        cel: Celular.abierto,
        aviso: window.__avisos.join(' '),
      }));
      if (/Error en guion/.test(st.aviso)) errores.push('aviso: ' + st.aviso);
      if (st.fin) break;
      if (st.cel) { await p.evaluate(() => Celular.cerrar()); continue; }
      if (st.ops) {
        let i = 0;
        if (k < c.prefs.length) { const j = st.ops.findIndex((o) => o.includes(c.prefs[k])); if (j >= 0) { i = j; k++; } }
        elegidas.push(st.ops[i]);
        await p.locator('#opciones li').nth(i).click();
        await p.waitForTimeout(20);
        continue;
      }
      await p.keyboard.press('Enter');
      await p.waitForTimeout(15);
    }
    const textos = await p.evaluate(() => window.__textos);
    const raros = textos.filter((t) => /\{|undefined|NaN|\[si/.test(t));
    console.log(`### ${c.nombre}: ${textos.length} líneas, prefs ${k}/${c.prefs.length}, fin=${await p.evaluate(() => window.__fin)}`);
    console.log('   elegidas:', elegidas.join(' | ').slice(0, 900));
    [...new Set(errores)].slice(0, 10).forEach((e) => console.log('   ✗', e));
    raros.forEach((t) => console.log('   ? ', t));
    require('fs').writeFileSync(require('path').join(require('os').tmpdir(), `killa-textos-${c.nombre}.txt`), textos.join('\n'));
    await p.close();
  }
  await b.close();
})();
