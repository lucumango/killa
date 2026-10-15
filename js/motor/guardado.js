// Guardado en localStorage. Una sola ranura ("Continuar partida").
const Guardado = {
  clave: 'quechua-novela-partida',
  existe: () => !!localStorage.getItem(Guardado.clave),
  guardar(estado) {
    try { localStorage.setItem(Guardado.clave, JSON.stringify({ ...estado, fecha: Date.now() })); U.aviso('Partida guardada'); }
    catch (e) { console.warn('No se pudo guardar', e); }
  },
  cargar() {
    try { return JSON.parse(localStorage.getItem(Guardado.clave)); } catch { return null; }
  },
  borrar: () => localStorage.removeItem(Guardado.clave),
};
