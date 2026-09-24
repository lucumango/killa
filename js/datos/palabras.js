// =====================================================================
// LISTA DE PALABRAS
// El guion las desbloquea con:  @aprender allillanchu sulpayki
// audio: ruta al archivo (grábalo y ponlo en assets/audio/palabras/). Si es null, no suena.
// =====================================================================
const A = (n) => `assets/audio/palabras/${n}.mp3`;
const PALABRAS = [
  // saludos
  { id: 'rimaykullayki', qu: 'rimaykullayki', es: 'saludo formal, para mayores', categoria: 'saludos', audio: A('rimaykullayki') },
  { id: 'allinllachu', qu: 'allinllachu', es: 'hola / ¿estás bien?', nota: 'de la lista de la mañana', categoria: 'saludos', audio: A('allinllachu') },
  { id: 'allillanchu', qu: 'allillanchu', es: 'hola / ¿estás bien?', nota: 'DOBLE ELE. decir fuerte', categoria: 'saludos', audio: A('allillanchu') },
  { id: 'allinmi', qu: 'allinmi / allillam', es: 'estoy bien', categoria: 'saludos', audio: A('allinmi') },
  { id: 'allin_punchay', qu: "allin p'unchay", es: 'buen día (de radio, no de calle)', categoria: 'saludos', audio: A('allin_punchay') },
  // presentarse
  { id: 'sutiymi', qu: 'ñuqapa sutiymi Ariel', es: 'me llamo Ariel', categoria: 'presentarse', audio: A('sutiymi') },
  { id: 'sutiyqa', qu: 'sutiyqa Arielmi', es: 'SOLO si te preguntaron primero (flor tenía razón)', categoria: 'presentarse', audio: A('sutiyqa') },
  { id: 'imataq_sutiyki', qu: 'imataq sutiyki?', es: '¿cómo te llamas?', categoria: 'presentarse', audio: A('imataq_sutiyki') },
  { id: 'maymantataq', qu: 'maymantataq kanki?', es: '¿de dónde eres?', categoria: 'presentarse', audio: A('maymantataq') },
  { id: 'limamantam', qu: 'Limamantam kani', es: 'soy de Lima', categoria: 'presentarse', audio: A('limamantam') },
  { id: 'hayka_wata', qu: "hayk'a watayuqtaq kanki?", es: '¿cuántos años tienes?', categoria: 'presentarse', audio: A('hayka_wata') },
  { id: 'chunka_pusaq', qu: 'chunka pusaqniyuq watayuqmi kani', es: 'tengo 18', categoria: 'presentarse', audio: A('chunka_pusaq') },
  // cortesía
  { id: 'sulpayki', qu: 'sulpayki', es: 'gracias', categoria: 'cortesía', audio: A('sulpayki') },
  { id: 'anay', qu: 'añay', es: 'gracias (otra forma)', categoria: 'cortesía', audio: A('anay') },
  { id: 'diospagarasunki', qu: 'diospagarasunki', es: 'gracias (de abuelita)', categoria: 'cortesía', audio: A('diospagarasunki') },
  { id: 'imamanta', qu: 'imamanta', es: 'de nada', categoria: 'cortesía', audio: A('imamanta') },
  { id: 'ama_hina', qu: 'ama hina kaspa', es: 'por favor (formal, favor grande)', categoria: 'cortesía', audio: A('ama_hina') },
  { id: 'ari', qu: 'arí', es: 'sí', categoria: 'cortesía', audio: A('ari') },
  // no entiendo
  { id: 'manam_hamutanichu', qu: "manam hamut'anichu", es: 'no entiendo', categoria: 'no entiendo', audio: A('manam_hamutanichu') },
  { id: 'manam_yachanichu', qu: 'manam yachanichu', es: 'no sé', categoria: 'no entiendo', audio: A('manam_yachanichu') },
  { id: 'asasllata', qu: 'as-asllata rimani', es: 'hablo poquito', categoria: 'no entiendo', audio: A('asasllata') },
  { id: 'pisillata', qu: 'pisillata', es: 'más o menos', categoria: 'no entiendo', audio: A('pisillata') },
  // números
  { id: 'huk', qu: 'huk', es: '1', categoria: 'números', audio: A('huk') },
  { id: 'iskay', qu: 'iskay', es: '2', categoria: 'números', audio: A('iskay') },
  { id: 'kimsa', qu: 'kimsa', es: '3', categoria: 'números', audio: A('kimsa') },
  { id: 'tawa', qu: 'tawa', es: '4', categoria: 'números', audio: A('tawa') },
  { id: 'pichqa', qu: 'pichqa', es: '5', nota: 'con la q de garganta', categoria: 'números', audio: A('pichqa') },
  { id: 'suqta', qu: 'suqta', es: '6', categoria: 'números', audio: A('suqta') },
  { id: 'qanchis', qu: 'qanchis', es: '7', categoria: 'números', audio: A('qanchis') },
  { id: 'pusaq', qu: 'pusaq', es: '8', categoria: 'números', audio: A('pusaq') },
  { id: 'chunka', qu: 'chunka', es: '10', categoria: 'números', audio: A('chunka') },
  { id: 'pachak', qu: 'pachak', es: '100', categoria: 'números', audio: A('pachak') },
  { id: 'waranqa', qu: 'waranqa', es: '1000', categoria: 'números', audio: A('waranqa') },
  { id: 'sesentaysiete', qu: 'suqta chunka qanchisniyuq', es: '67 😐', categoria: 'números', audio: A('sesentaysiete') },
  { id: 'anio2026', qu: 'iskay waranqa iskay chunka suqtayuq', es: '2026', categoria: 'números', audio: A('anio2026') },
  // colores
  { id: 'puka', qu: 'puka', es: 'rojo (puca picante!!)', categoria: 'colores', audio: A('puka') },
  { id: 'yuraq', qu: 'yuraq', es: 'blanco', categoria: 'colores', audio: A('yuraq') },
  { id: 'yana', qu: 'yana', es: 'negro', categoria: 'colores', audio: A('yana') },
  // comprar
  { id: 'haykataq', qu: "hayk'ataq?", es: '¿cuánto es?', categoria: 'comprar', audio: A('haykataq') },
  { id: 'munani', qu: 'munani', es: 'quiero / me gusta', categoria: 'comprar', audio: A('munani') },
  { id: 'manam_munanichu', qu: 'manam munanichu', es: 'no quiero / no me gusta', categoria: 'comprar', audio: A('manam_munanichu') },
  // comida
  { id: 'mikhuy', qu: 'mikhuy', es: 'comer', categoria: 'comida', audio: A('mikhuy') },
  { id: 'upyay', qu: 'upyay', es: 'beber', categoria: 'comida', audio: A('upyay') },
  { id: 'miski', qu: 'miski / miskin', es: 'dulce, rico (= Flor)', categoria: 'comida', audio: A('miski'), nombrePropio: true },
  // otros
  { id: 'killa', qu: 'killa', es: 'mes Y luna (bonito)', categoria: 'otros', audio: A('killa') },
  { id: 'wata', qu: 'wata', es: 'año', categoria: 'otros', audio: A('wata') },
  { id: 'amaru', qu: 'amaru', es: 'serpiente grande, de los ríos', categoria: 'otros', audio: A('amaru'), nombrePropio: true },
  { id: 'yaya', qu: 'yaya', es: '"ay no" / roche / flojera', categoria: 'otros', audio: A('yaya') },
  { id: 'meses', qu: 'Uma Raymi Killa / Aya Marq\'ay Killa', es: 'octubre / noviembre (el mes de cargar a los muertos)', categoria: 'otros', audio: A('meses') },
  { id: 'acuchimay', qu: 'Acuchimay', es: 'el cerro con el Cristo blanco', categoria: 'otros', audio: null, nombrePropio: true },
  { id: 'chayqa', qu: 'chayqa', es: '"y qué" (según Flor)', categoria: 'otros', audio: A('chayqa') },
  // cariñosos
  { id: 'upa', qu: 'upa', es: 'tonto (cariñoso)', categoria: 'cariñosos', audio: A('upa') },
  { id: 'qhilli', qu: 'qhilli', es: 'sucio, piojoso (cariñoso)', categoria: 'cariñosos', audio: A('qhilli') },
  { id: 'phina', qu: 'phiña', es: 'renegón (cariñoso)', nota: 'NO JUNTAR LOS TRES', categoria: 'cariñosos', audio: A('phina') },
];
