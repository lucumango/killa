const G = require('child_process').execSync('npm root -g').toString().trim();
const { chromium } = require(G + '/playwright');
const fs = require('fs'), path = require('path'), os = require('os');
const base = fs.readFileSync(path.join(__dirname, '..', 'Killa.html'), 'utf8');
const TMP = path.join(os.tmpdir(), 'killa-twine-prueba.html');
function variant(setup, start) {
  const body = `${setup}(go-to: "${start}")`.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  let s = base.replace('</tw-storydata>', `<tw-passagedata pid="999" name="TESTSTART" tags="" position="0,0" size="100,100">${body}</tw-passagedata></tw-storydata>`);
  return s.replace(/startnode="\d+"/, 'startnode="999"');
}
// prefs: list of link-text substrings to prefer, in order of consumption
async function play(b, name, setup, start, prefs, maxSteps=80) {
  fs.writeFileSync(TMP, variant(setup, start));
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
  await p.goto('file://' + TMP);
  const trail = [];
  let i = 0;
  for (let step = 0; step < maxSteps; step++) {
    await p.waitForTimeout(150);
    const info = await p.evaluate(() => {
      const ps = document.querySelector('tw-passage');
      const txt = ps ? ps.innerText : '';
      const errs = [...document.querySelectorAll('tw-error')].map(e => e.innerText.slice(0,200));
      const links = [...document.querySelectorAll('tw-passage tw-link, tw-passage .enchantment-link')].map(l => l.innerText);
      return { txt, errs, links, html: ps ? ps.innerHTML : '' };
    });
    const tags = await p.evaluate(() => document.querySelector('tw-passage')?.getAttribute('tags') || '');
    trail.push(info);
    if (info.errs.length) errs.push(`step ${step}: ${info.errs.join(' || ')}`);
    for (const line of info.txt.split('\n')) {
      if (/^\s*\* /.test(line) || /\((if|set|link|unless|print|else)[-a-z]*:/.test(line) || /\]\]/.test(line) || /\$[a-zA-Z]/.test(line) || /(^|\s)_[a-z]/.test(line))
        errs.push(`step ${step}: sospechoso: ${line.slice(0,120)}`);
    }
    if (!info.links.length) break;
    let pick = 0;
    if (i < prefs.length) {
      const k = info.links.findIndex(l => l.includes(prefs[i]));
      if (k >= 0) { pick = k; i++; }
    }
    await p.locator('tw-passage tw-link, tw-passage .enchantment-link').nth(pick).click();
  }
  const last = trail[trail.length - 1];
  console.log(`\n### ${name}: ${trail.length} pasos, prefs usadas ${i}/${prefs.length}. Final: ${last.txt.slice(-120).replace(/\n/g,' / ')}`);
  errs.forEach(e => console.log('  ✗', e));
  await p.close();
  return trail;
}
module.exports = { play };
if (require.main === module) (async () => {
  const b = await chromium.launch();
  const S = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  for (const c of S) {
    const t = await play(b, c.name, c.setup, c.start, c.prefs, c.max || 80);
    if (c.dump) fs.writeFileSync(path.join(os.tmpdir(), `killa-dump-${c.name}.txt`), t.map((x,k)=>`--- ${k}\n${x.txt}`).join('\n'));
  }
  await b.close();
})();
