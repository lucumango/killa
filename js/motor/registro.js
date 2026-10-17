// =====================================================================
// REGISTRO PARA EL ESTUDIO
// Anota lo que hace el jugador para poder analizarlo después. No guarda
// nada personal: solo el código de participante que tú le des (K01, K02...).
//
// Se enciende con CONFIG.estudio.activo = true en config.js.
// Al terminar la demo sale un botón "Descargar mis datos" que baja un .json.
//
// Lo que anota: cuándo empezó y terminó, cada decisión que tomó, qué miró en
// la plaza, qué palabras aprendió y cuáles escuchó, cuándo abrió el celular,
// y cada mensaje del chat con lo que le contestaron.
// =====================================================================
const Registro = {
  activo: false,
  codigo: '',
  inicio: 0,
  eventos: [],

  encender(codigo) {
    Registro.activo = !!(CONFIG.estudio && CONFIG.estudio.activo);
    if (!Registro.activo) return;
    Registro.codigo = String(codigo || Registro.codigo || '').trim();
    Registro.inicio = Date.now();
    Registro.eventos = [];
    Registro.anotar('inicio', { navegador: navigator.userAgent.slice(0, 120), pantalla: `${screen.width}x${screen.height}` });
  },

  anotar(que, datos) {
    if (!Registro.activo) return;
    Registro.eventos.push({
      t: Math.round((Date.now() - Registro.inicio) / 100) / 10,   // segundos desde que empezó
      que,
      ...(datos || {}),
    });
  },

  // Lo que se descarga al final
  resumen() {
    const porTipo = {};
    for (const e of Registro.eventos) porTipo[e.que] = (porTipo[e.que] || 0) + 1;
    const chats = Registro.eventos.filter((e) => e.que === 'chat_envia');
    return {
      participante: Registro.codigo || '(sin código)',
      empezo: new Date(Registro.inicio).toISOString(),
      termino: new Date().toISOString(),
      duracion_min: Math.round((Date.now() - Registro.inicio) / 6000) / 10,
      palabras_aprendidas: (typeof Motor !== 'undefined' ? Motor.palabras : []).slice(),
      cuantas_palabras: (typeof Motor !== 'undefined' ? Motor.palabras.length : 0),
      palabras_escuchadas: [...new Set(Registro.eventos.filter((e) => e.que === 'palabra_oye').map((e) => e.palabra))],
      decisiones: Registro.eventos.filter((e) => e.que === 'elige').map((e) => e.texto),
      miro_en_la_plaza: [...new Set(Registro.eventos.filter((e) => e.que === 'mira').map((e) => e.cosa))],
      mensajes_enviados: chats.length,
      veces_abrio_el_celular: porTipo.celular_abre || 0,
      cuenta_por_tipo: porTipo,
      eventos: Registro.eventos,
    };
  },

  // Manda la partida al servidor, para no depender de que el jugador te
  // pase el archivo. Si no hay servidor o falla, no pasa nada: el botón de
  // descargar sigue estando. CONFIG.estudio.enviar lo enciende.
  async enviar() {
    if (!Registro.activo || !(CONFIG.estudio && CONFIG.estudio.enviar)) return false;
    const base = (typeof Chat !== 'undefined' && Chat.urlIA) ? Chat.urlIA() : '';
    const url = base.replace(/\/chat$/, '/registro');
    if (!url) return false;
    try {
      const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Registro.resumen()) });
      Registro._enviado = r.ok;
      return r.ok;
    } catch { Registro._enviado = false; return false; }
  },

  descargar() {
    const d = Registro.resumen();
    const nombre = `killa_${(Registro.codigo || 'anon').replace(/[^\w-]/g, '')}_${new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-')}.json`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' }));
    a.download = nombre;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    return nombre;
  },

  // Caja para escribir el código de participante, en el menú.
  pedirCodigo() {
    if (!(CONFIG.estudio && CONFIG.estudio.activo)) return;
    let c = U.$('#codigo-estudio');
    if (!c) {
      c = document.createElement('div'); c.id = 'codigo-estudio'; c.className = 'codigo-estudio';
      c.innerHTML = '<label for="cod">Código de participante</label><input id="cod" maxlength="12" autocomplete="off" placeholder="K01">';
      U.$('#pantalla-menu').appendChild(c);
      const i = c.querySelector('input');
      i.addEventListener('keydown', (e) => e.stopPropagation());   // que no muevan el menú al escribir
      i.addEventListener('input', () => { Registro.codigo = i.value.trim(); });
    }
    c.querySelector('input').value = Registro.codigo;
    c.hidden = false;
  },

  // Botón de descarga, al terminar
  ofrecerDescarga(donde) {
    if (!Registro.activo) return;
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'boton-datos';
    b.textContent = 'Descargar mis datos';
    b.onclick = () => { const n = Registro.descargar(); b.textContent = 'Descargado: ' + n; b.disabled = true; };
    // intenta mandarlo solo, en silencio
    Registro.enviar().then((ok) => { if (ok) b.textContent = 'Datos enviados ✓ (o descárgalos)'; });
    b.addEventListener('keydown', (e) => e.stopPropagation());
    (donde || U.$('#juego')).appendChild(b);
    return b;
  },
};
