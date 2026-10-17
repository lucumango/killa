// =====================================================================
// CELULAR (overlay): pestañas Palabras, Chats y Yape (ver yape.js).
// Se abre con la tecla configurada (CONFIG.teclas.celular) o desde el guion (@chat).
// =====================================================================
const Celular = {
  abierto: false, tab: 'palabras', chatActual: null, _resolverCierre: null, modo: 'libre', bloqueado: false,
  el: { raiz: U.$('#celular'), palabras: U.$('#celular-palabras'), chats: U.$('#celular-chats'), yape: U.$('#celular-yape'), mapa: U.$('#celular-mapa'), lista: U.$('#chat-lista'), ventana: U.$('#chat-ventana'), mensajes: U.$('#chat-mensajes'), input: U.$('#chat-input'), form: U.$('#chat-form'), nombre: U.$('#chat-nombre') },

  iniciar() {
    U.$$('.celular-barra button').forEach((b) => b.onclick = () => Celular.irTab(b.dataset.tab));
    U.$('.celular-cerrar').onclick = () => Celular.cerrar();
    U.$('#chat-volver').onclick = () => Celular.mostrarLista();
    Celular.el.form.onsubmit = (e) => { e.preventDefault(); const t = Celular.el.input.value.trim(); if (!t || Celular.bloqueado) return; Celular.el.input.value = ''; Chat.enviar(Celular.chatActual, t); };
    Celular.el.input.addEventListener('keydown', (e) => e.stopPropagation()); // que las teclas del juego no interfieran al escribir
  },
  abrir(tab) {
    Celular.abierto = true; Celular.el.raiz.hidden = false;
    Registro.anotar('celular_abre', { pestana: tab || Celular.tab });
    Celular.irTab(tab || Celular.tab);
  },
  cerrar() {
    Celular.abierto = false; Celular.el.raiz.hidden = true; Celular.chatActual = null;
    if (Celular._resolverCierre) { const r = Celular._resolverCierre; Celular._resolverCierre = null; r(); }
  },
  alternar() { Celular.abierto ? Celular.cerrar() : Celular.abrir(); },
  esperarCierre() { return new Promise((r) => { Celular._resolverCierre = r; }); },

  // Desde el guion: @chat flor escribir  |  @chat mama leer  |  @celular
  async abrirDesdeGuion(contacto, modo) {
    Celular.modo = 'guion';
    Celular.abrir(contacto ? 'chats' : 'palabras');
    if (contacto) { Celular.abrirChat(contacto); Celular.bloqueado = modo !== 'escribir'; }
    await Celular.esperarCierre();
    Celular.bloqueado = false; Celular.modo = 'libre';
  },

  // Desde el guion: @mapa - abre el mapa con la raya de señal y el puntito azul
  // gordo, y espera a que lo cierren. No es una pestaña: es un momento del guion.
  async abrirMapa() {
    Celular.modo = 'guion'; Celular.bloqueado = true;
    Celular.abierto = true; Celular.el.raiz.hidden = false;
    U.$$('.celular-barra button').forEach((b) => b.classList.remove('activo'));
    Celular.el.palabras.hidden = true; Celular.el.chats.hidden = true; Celular.el.yape.hidden = true;
    Celular.el.mapa.hidden = false;
    await Celular.esperarCierre();
    Celular.el.mapa.hidden = true;
    Celular.bloqueado = false; Celular.modo = 'libre';
    Celular.irTab(Celular.tab);
  },

  irTab(tab) {
    Celular.tab = tab;
    U.$$('.celular-barra button').forEach((b) => b.classList.toggle('activo', b.dataset.tab === tab));
    Celular.el.palabras.hidden = tab !== 'palabras'; Celular.el.chats.hidden = tab !== 'chats';
    Celular.el.yape.hidden = tab !== 'yape'; Celular.el.mapa.hidden = true;
    if (tab === 'palabras') Celular.pintarPalabras();
    else if (tab === 'yape') Yape.pintar();
    else Celular.mostrarLista();
  },

  // ---- Palabras aprendidas ----
  pintarPalabras() {
    const cont = Celular.el.palabras; cont.innerHTML = '';
    const aprendidas = PALABRAS.filter((p) => Motor.palabras.includes(p.id));
    if (!aprendidas.length) { cont.innerHTML = '<p style="color:#777">Todavía no aprendes ninguna palabra.</p>'; return; }
    const cats = [...new Set(aprendidas.map((p) => p.categoria || 'otros'))];
    for (const cat of cats) {
      const h = document.createElement('div'); h.className = 'palabra-categoria'; h.textContent = cat; cont.appendChild(h);
      for (const p of aprendidas.filter((x) => (x.categoria || 'otros') === cat)) {
        const d = document.createElement('div'); d.className = 'palabra';
        // El audio se oye con el botón, no al pasar el mouse por encima.
        d.innerHTML = `<span><span class="qu">${p.qu}</span>${p.nota ? `<span class="nota">${p.nota}</span>` : ''}</span>`
          + `<span class="es">${p.es}</span>`
          + (p.audio ? '<button type="button" class="oir" title="Escuchar">► oír</button>'
                     : '<span class="sin-audio">sin audio</span>');
        const tocar = () => {
          if (Audio_.sonando) return;                 // una por vez: deja que acabe
          U.$$('.palabra.activa').forEach((x) => x.classList.remove('activa'));
          d.classList.add('activa');
          if (!p.audio) return;
          if (Audio_.palabra(p.audio)) {
            Registro.anotar('palabra_oye', { palabra: p.id });
            d.classList.add('sonando');
            const soltar = setInterval(() => {
              if (Audio_.sonando) return;
              clearInterval(soltar); d.classList.remove('sonando');
            }, 120);
          }
        };
        const boton = d.querySelector('.oir');
        if (boton) boton.onclick = (e) => { e.stopPropagation(); tocar(); };
        d.onclick = tocar;   // tocar la fila también suena, por si le dan al texto
        if (CONFIG.audioAlPasarMouse) d.onmouseenter = tocar;   // apagado por defecto en config.js
        cont.appendChild(d);
      }
    }
  },

  // ---- Chats ----
  mostrarLista() {
    Celular.chatActual = null; Celular.el.ventana.hidden = true; Celular.el.lista.hidden = false;
    const l = Celular.el.lista; l.innerHTML = '';
    for (const [id, C] of Object.entries(CONTACTOS)) {
      if (C.oculto && !(Chat.historial[id] || []).length) continue;
      const ult = (Chat.historial[id] || []).slice(-1)[0];
      const d = document.createElement('div'); d.className = 'contacto';
      d.innerHTML = `<span><b>${C.nombre}</b><br><small style="color:#888">${ult ? ult.texto.slice(0, 34) : ''}</small></span>${Chat.sinLeer[id] ? `<span class="sinleer">${Chat.sinLeer[id]}</span>` : ''}`;
      d.onclick = () => Celular.abrirChat(id);
      l.appendChild(d);
    }
  },
  abrirChat(id) {
    Celular.chatActual = id; Chat.sinLeer[id] = 0;
    Celular.el.lista.hidden = true; Celular.el.ventana.hidden = false;
    Celular.el.nombre.textContent = CONTACTOS[id]?.nombre || id;
    Celular.el.form.hidden = !(CONTACTOS[id]?.responde);
    Celular.pintarMensajes();
    setTimeout(() => Celular.el.input.focus(), 50);
  },
  pintarMensajes() {
    if (!Celular.chatActual) return;
    const c = Celular.el.mensajes; c.innerHTML = '';
    const C = CONTACTOS[Celular.chatActual];
    for (const m of Chat.historial[Celular.chatActual] || []) {
      const d = document.createElement('div');
      d.className = 'msg ' + (m.de === 'yo' ? 'yo' : 'otro') + (m.escribiendo ? ' escribiendo' : '');
      const quien = C.miembros && m.de !== 'yo' ? `<span class="quien">${PERSONAJES[m.de]?.nombre || m.de}</span>` : '';
      d.innerHTML = quien + (m.escribiendo ? '<i></i><i></i><i></i>' : m.texto.replace(/</g, '&lt;')) + (m.de === 'yo' && m.estado ? `<span class="estado">${m.estado === 'visto' ? '✓✓ visto' : '✓'}</span>` : '');
      c.appendChild(d);
    }
    c.scrollTop = c.scrollHeight;
  },
};
