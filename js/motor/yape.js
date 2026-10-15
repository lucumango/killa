// =====================================================================
// YAPE (app del celular): saldo y movimientos.
// Desde el guion:
//   @yape +15 Rosa Quispe        ← le entra plata (notificación + sonido)
//   @yape -2.50 Kiosko           ← paga algo
//   @yape saldo 20               ← deja el saldo en ese número, sin movimiento
// En los @si se puede usar la variable `yape`, que siempre vale el saldo:
//   @si yape >= 2.50 -> comprar
// Lo que se ve (nombre del titular, saldo inicial, moneda) está en config.js.
// =====================================================================
const Yape = {
  movimientos: [],   // { monto, concepto, hora }

  conf() { return CONFIG.yape || {}; },
  get saldo() { return Number(Motor.vars.yape) || 0; },
  set saldo(v) { Motor.vars.yape = Math.round(v * 100) / 100; },

  reiniciar() {
    Yape.movimientos = [];
    Yape.saldo = Number(Yape.conf().saldoInicial) || 0;
  },
  estado() { return { movimientos: Yape.movimientos }; },
  restaurar(est) {
    Yape.movimientos = (est && est.movimientos) || [];
    if (Motor.vars.yape == null) Yape.saldo = Number(Yape.conf().saldoInicial) || 0;
  },

  // Desde el guion. `texto` es "+15 Rosa Quispe", "-2.5 Kiosko" o "saldo 20".
  comando(texto) {
    const m = texto.trim().match(/^(saldo\s+)?([+-]?\d+(?:[.,]\d+)?)\s*(.*)$/i);
    if (!m) throw new Error('@yape mal escrito. Ejemplos: @yape +15 Mamá | @yape -2.50 Kiosko | @yape saldo 20');
    const monto = Number(m[2].replace(',', '.'));
    if (m[1]) { Yape.saldo = monto; Yape.pintar(); return; }   // "saldo 20": sin movimiento ni aviso
    Yape.movimiento(monto, m[3] || (monto >= 0 ? 'Yape recibido' : 'Pago'));
  },

  movimiento(monto, concepto) {
    Yape.saldo = Yape.saldo + monto;
    Yape.movimientos.unshift({ monto, concepto, hora: Yape.horaFalsa() });
    const c = Yape.conf();
    if (monto >= 0) {
      U.aviso(`YAPE · Te llegó ${Yape.plata(monto)}`);
      if (c.sfx) Audio_.sfx(c.sfx);
    } else {
      U.aviso(`YAPE · Pagaste ${Yape.plata(-monto)}`);
      if (c.sfxPago || c.sfx) Audio_.sfx(c.sfxPago || c.sfx);
    }
    Yape.pintar();
  },

  plata(n) { return `${Yape.conf().moneda || 'S/'} ${Math.abs(n).toFixed(2)}`; },
  horaFalsa() { const d = new Date(); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; },

  // ---- la pantalla de la app ----
  pintar() {
    const cont = U.$('#celular-yape'); if (!cont) return;
    const c = Yape.conf();
    const movs = Yape.movimientos.length
      ? Yape.movimientos.map((m) => `
          <div class="yape-mov">
            <span class="yape-mov-txt">${m.concepto}<small>${m.hora}</small></span>
            <span class="yape-mov-monto ${m.monto >= 0 ? 'entra' : 'sale'}">${m.monto >= 0 ? '+' : '−'} ${Yape.plata(m.monto)}</span>
          </div>`).join('')
      : '<p class="yape-vacio">Todavía no tienes movimientos.</p>';
    cont.innerHTML = `
      <div class="yape-tarjeta">
        <div class="yape-titular">${c.titular || 'Ariel'}</div>
        <div class="yape-saldo-rotulo">Saldo disponible</div>
        <div class="yape-saldo">${Yape.plata(Yape.saldo)}</div>
      </div>
      <div class="yape-rotulo">Movimientos</div>
      ${movs}`;
  },
};
