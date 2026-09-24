// =====================================================================
// PERSONAJES
// id (en minúsculas) = lo que escribes en el guion antes de los dos puntos.
//   flor (feliz): ¡Habla!
// bustos: se buscan solos en assets/img/bustos/<id>_<emocion>.png
//         (o pon rutas a mano en `bustos: { feliz: 'ruta.png' }`).
// tono: frecuencia del beep al hablar (más alto = voz más aguda).
// beep: ruta a un archivo de audio si prefieres tu propio "beep".
// =====================================================================
const PERSONAJES = {
  ariel:    { nombre: 'Ariel',        color: '#f2d16b', tono: 320, onda: 'square' },
  flor:     { nombre: 'Flor',         color: '#ff8fb1', tono: 520, onda: 'square' },
  amaru:    { nombre: 'Amaru',        color: '#7fb3ff', tono: 190, onda: 'triangle', velocidad: 34 },
  mama:     { nombre: 'Mamá',         color: '#c9a2ff', tono: 380, onda: 'sine' },
  puku:     { nombre: 'Puku',         color: '#5ad65a', tono: 900, onda: 'sawtooth', velocidad: 18 },
  hilario:  { nombre: 'Don Hilario',  color: '#b0a080', tono: 150, onda: 'triangle', velocidad: 40 },
  tia:      { nombre: 'Tía',          color: '#ffb86b', tono: 420, onda: 'sine' },
  senora:   { nombre: 'Sra. Rufina',  color: '#ffd0a0', tono: 400, onda: 'sine' },
  conductor:{ nombre: 'Conductor',    color: '#999',    tono: 170, onda: 'triangle' },
  voz:      { nombre: '???',          color: '#ccc',    tono: 300, onda: 'square', sinBusto: true },
  celular:  { nombre: '📱',           color: '#8f8',    tono: 700, onda: 'sine', sinBusto: true, velocidad: 12 },
};

// Contactos del chat del celular. `responde: true` = el jugador puede escribirles y contestan (IA o modo local).
// `miembros` = grupo; `oculto: true` = no aparece hasta que reciba un mensaje.
const CONTACTOS = {
  mama:   { nombre: 'Mamá', responde: false },
  flor:   { nombre: 'Flor 🌸', responde: true, oculto: true },
  amaru:  { nombre: 'Amaru', responde: true, oculto: true },
  grupo:  { nombre: 'quechua para limeños 🦜', responde: true, miembros: ['flor', 'amaru'], oculto: true },
  causas: { nombre: 'LOS CAUSAS 🔥', responde: false, miembros: ['renzo', 'nico', 'micaela'], oculto: true },
  renzo:  { nombre: 'Renzo', responde: false, oculto: true },
  micaela:{ nombre: 'Micaela', responde: false, oculto: true },
  nico:   { nombre: 'Nico', responde: false, oculto: true },
};
// Nombres para mostrar en grupos de gente que no tiene busto:
Object.assign(PERSONAJES, {
  renzo: { nombre: 'Renzo', color: '#ccc', sinBusto: true },
  nico: { nombre: 'Nico', color: '#ccc', sinBusto: true },
  micaela: { nombre: 'Micaela', color: '#ccc', sinBusto: true },
});
