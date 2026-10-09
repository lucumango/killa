// =====================================================================
// CHAT DEL CELULAR
// - Mensajes del guion (@mensaje) se agregan al historial.
// - Cuando el jugador escribe, se responde con IA (si CONFIG.ia.activa)
//   o con el modo local (reglas simples con las palabras aprendidas).
// =====================================================================
const Chat = {
  historial: {},   // contacto -> [{de:'yo'|id, texto, hora, estado:'visto'|null}]
  sinLeer: {},
  historialInicial() { const h = {}; Object.keys(CONTACTOS).forEach((c) => (h[c] = [])); return h; },

  agregar(contacto, de, texto, opts = {}) {
    if (!Chat.historial[contacto]) Chat.historial[contacto] = [];
    const m = { de, texto, hora: Chat.hora(), ...opts };
    Chat.historial[contacto].push(m);
    if (de !== 'yo') {
      Chat.sinLeer[contacto] = (Chat.sinLeer[contacto] || 0) + 1;
      if (!(Celular.abierto && Celular.chatActual === contacto)) { U.aviso(`CEL · ${CONTACTOS[contacto]?.nombre || contacto}: ${texto.slice(0, 40)}`); if (CONFIG.sfxMensaje) Audio_.sfx(CONFIG.sfxMensaje); }
    }
    if (Celular.abierto && Celular.chatActual === contacto) Celular.pintarMensajes();
    return m;
  },
  hora() { const d = new Date(); return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0'); },

  // ---- El jugador manda un mensaje ----
  async enviar(contacto, texto) {
    const mio = Chat.agregar(contacto, 'yo', texto);
    const C = CONTACTOS[contacto];
    if (!C || !C.responde) { mio.estado = 'enviado'; Celular.pintarMensajes(); return; }
    let respuesta;
    if (CONFIG.ia.activa) {
      try { respuesta = await Chat.preguntarIA(contacto, texto); }
      catch (e) { console.warn('IA falló, usando modo local:', e); respuesta = Chat.respuestaLocal(contacto, texto); }
    } else respuesta = Chat.respuestaLocal(contacto, texto);
    await Chat.aplicarRespuesta(contacto, mio, respuesta);
  },

  // respuesta = { accion: 'responder'|'visto', mensajes: [..], quien?: id }
  async aplicarRespuesta(contacto, mio, r) {
    mio.estado = 'visto'; Celular.pintarMensajes();
    if (!r || r.accion === 'visto') return; // te dejaron en visto
    const C = CONTACTOS[contacto];
    for (const [i, texto] of (r.mensajes || []).entries()) {
      const quien = (r.quien && r.quien[i]) || (C.miembros ? C.miembros[0] : contacto);
      await Chat.escribiendo(contacto, quien, 600 + Math.min(texto.length * 35, 2500));
      Chat.agregar(contacto, quien, texto);
    }
  },
  async escribiendo(contacto, quien, ms) {
    Chat.historial[contacto].push({ de: quien, texto: '', escribiendo: true });
    Celular.pintarMensajes();
    await U.espera(ms);
    Chat.historial[contacto] = Chat.historial[contacto].filter((m) => !m.escribiendo);
  },

  // ---- Modo local: sin API. Reglas sencillas para que el juego funcione offline. ----
  respuestaLocal(contacto, texto) {
    const C = CONTACTOS[contacto];
    const quien = C.miembros ? C.miembros[0] : contacto;
    const norm = U.normalizar(texto);
    const aprendidas = PALABRAS.filter((p) => Motor.palabras.includes(p.id));
    const usadas = aprendidas.filter((p) => !p.nombrePropio && norm.includes(U.normalizar(p.qu)));
    const noAprendidas = PALABRAS.filter((p) => !p.nombrePropio && !Motor.palabras.includes(p.id) && norm.includes(U.normalizar(p.qu)));
    const R = RESPUESTAS_LOCALES[quien] || RESPUESTAS_LOCALES.flor;
    const azar = (arr) => arr[Math.floor(Math.random() * arr.length)];
    if (usadas.length === 0 && noAprendidas.length === 0) {
      // ¿está en español? Entonces contestan en español; si es un intento raro, visto.
      const pareceEspanol = /\b(hola|que|qué|como|cómo|gracias|si|sí|no|ya|bien|mama|mamá|donde|dónde|estoy|voy)\b/.test(norm);
      if (pareceEspanol) return { accion: 'responder', mensajes: [azar(R.espanol)], quien: [quien] };
      return Math.random() < 0.7 ? { accion: 'visto' } : { accion: 'responder', mensajes: [azar(R.noEntiende)], quien: [quien] };
    }
    const msgs = [];
    if (usadas.length) msgs.push(azar(R.bien).replace('{palabra}', usadas[0].qu));
    if (noAprendidas.length) msgs.push(azar(R.sospecha).replace('{palabra}', noAprendidas[0].qu));
    return { accion: 'responder', mensajes: msgs, quien: msgs.map(() => quien) };
  },

  // ---- Modo IA: manda todo al servidor-ia (que sí tiene la clave). ----
  async preguntarIA(contacto, texto) {
    const C = CONTACTOS[contacto];
    const cuerpo = {
      contacto, personajes: C.miembros || [contacto],
      sistema: IA.sistema(contacto),
      historial: Chat.historial[contacto].filter((m) => !m.escribiendo).slice(-CONFIG.ia.maxHistorial).map((m) => ({ rol: m.de === 'yo' ? 'user' : 'assistant', quien: m.de, texto: m.texto })),
    };
    const resp = await fetch(CONFIG.ia.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cuerpo) });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    return await resp.json();
  },
};
