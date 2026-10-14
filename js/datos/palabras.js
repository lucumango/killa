// =====================================================================
// LISTA DE PALABRAS
// El guion las desbloquea con:  @aprender allinllachu sulpayki
// audio: ruta al archivo (grábalo y ponlo en assets/audio/palabras/). Si es null, no suena.
// Ortografía chanka (revisada por Abner): tres vocales, sin ph/th/kh/qh ni apóstrofos.
// =====================================================================
const A = (n) => `assets/audio/palabras/${n}.mp3`;
const PALABRAS = [
  // saludos
  { id: 'rimaykullayki', qu: 'rimaykullayki', es: 'saludo formal, para mayores', categoria: 'saludos', audio: A('rimaykullayki') },
  { id: 'allinllachu', qu: 'allinllachu', es: 'hola / ¿estás bien?', nota: 'DOBLE ELE. decir fuerte', categoria: 'saludos', audio: A('allinllachu') },
  { id: 'allinmi', qu: 'allinmi / allinllam', es: 'estoy bien', categoria: 'saludos', audio: A('allinmi') },
  { id: 'allin_punchaw', qu: 'allin punchaw', es: 'buen día (de radio, no de calle)', categoria: 'saludos', audio: A('allin_punchaw') },
  // presentarse
  { id: 'sutiymi', qu: 'ñuqapa sutiymi Ariel', es: 'me llamo Ariel (con énfasis)', categoria: 'presentarse', audio: A('sutiymi') },
  { id: 'sutiyqa', qu: 'sutiyqa Arielmi', es: 'mi nombre es Ariel (la simple). las dos valen', categoria: 'presentarse', audio: A('sutiyqa') },
  { id: 'imataq_sutiyki', qu: 'imataq sutiyki?', es: '¿cómo te llamas?', categoria: 'presentarse', audio: A('imataq_sutiyki') },
  { id: 'maymantataq', qu: 'maymantataq kanki?', es: '¿de dónde eres?', categoria: 'presentarse', audio: A('maymantataq') },
  { id: 'limamantam', qu: 'Limamantam kani', es: 'soy de Lima', categoria: 'presentarse', audio: A('limamantam') },
  { id: 'hayka_wata', qu: 'hayka watayuqtaq kanki?', es: '¿cuántos años tienes?', categoria: 'presentarse', audio: A('hayka_wata') },
  { id: 'chunka_pusaq', qu: 'chunka pusaqniyuq watayuqmi kani', es: 'tengo 18', categoria: 'presentarse', audio: A('chunka_pusaq') },
  // cortesía
  { id: 'sulpayki', qu: 'sulpayki', es: 'gracias', categoria: 'cortesía', audio: A('sulpayki') },
  { id: 'anay', qu: 'añay', es: 'gracias (otra forma)', categoria: 'cortesía', audio: A('anay') },
  { id: 'diuspaqarasunki', qu: 'diuspaqarasunki', es: 'gracias (de abuelita). viene de "Dios se lo pague"', categoria: 'cortesía', audio: A('diuspaqarasunki') },
  { id: 'imamanta', qu: 'imamanta', es: 'de nada', categoria: 'cortesía', audio: A('imamanta') },
  { id: 'ama_hina', qu: 'ama hina kaspa', es: 'por favor (formal, favor grande)', categoria: 'cortesía', audio: A('ama_hina') },
  { id: 'ari', qu: 'arí', es: 'sí', categoria: 'cortesía', audio: A('ari') },
  { id: 'turiy', qu: 'turiy', es: 'hermanito (así le dice una mujer a un chico)', nota: 'me lo dijo doña nati', categoria: 'cortesía', audio: A('turiy') },
  // no entiendo
  { id: 'manam_hamutanichu', qu: 'manam hamutanichu', es: 'no entiendo', categoria: 'no entiendo', audio: A('manam_hamutanichu') },
  { id: 'manam_yachanichu', qu: 'manam yachanichu', es: 'no sé', categoria: 'no entiendo', audio: A('manam_yachanichu') },
  { id: 'asasllata', qu: 'as-asllata rimani', es: 'hablo poquito', categoria: 'no entiendo', audio: A('asasllata') },
  { id: 'pisillata', qu: 'pisillata', es: 'más o menos', categoria: 'no entiendo', audio: A('pisillata') },
  { id: 'pisi', qu: 'pisi', es: 'poco (de ahí sale pisillata)', categoria: 'no entiendo', audio: A('pisi') },
  // números
  { id: 'huk', qu: 'huk', es: '1', categoria: 'números', audio: A('huk') },
  { id: 'iskay', qu: 'iskay', es: '2', categoria: 'números', audio: A('iskay') },
  { id: 'kimsa', qu: 'kimsa', es: '3', categoria: 'números', audio: A('kimsa') },
  { id: 'tawa', qu: 'tawa', es: '4', categoria: 'números', audio: A('tawa') },
  { id: 'pichqa', qu: 'pichqa', es: '5', nota: 'con la q de garganta', categoria: 'números', audio: A('pichqa') },
  { id: 'suqta', qu: 'suqta', es: '6', categoria: 'números', audio: A('suqta') },
  { id: 'qanchis', qu: 'qanchis', es: '7', categoria: 'números', audio: A('qanchis') },
  { id: 'pusaq', qu: 'pusaq', es: '8', categoria: 'números', audio: A('pusaq') },
  { id: 'isqun', qu: 'isqun', es: '9', categoria: 'números', audio: A('isqun') },
  { id: 'chunka', qu: 'chunka', es: '10', categoria: 'números', audio: A('chunka') },
  { id: 'pachak', qu: 'pachak', es: '100', categoria: 'números', audio: A('pachak') },
  { id: 'waranqa', qu: 'waranqa', es: '1000', categoria: 'números', audio: A('waranqa') },
  { id: 'achka', qu: 'achka', es: 'muchos, un montón', categoria: 'números', audio: A('achka') },
  { id: 'sesentaysiete', qu: 'suqta chunka qanchisniyuq', es: '67 😐', categoria: 'números', audio: A('sesentaysiete') },
  { id: 'anio2026', qu: 'iskay waranqa iskay chunka suqtayuq', es: '2026', categoria: 'números', audio: A('anio2026') },
  // colores
  { id: 'puka', qu: 'puka', es: 'rojo (puca picante!!)', categoria: 'colores', audio: A('puka') },
  { id: 'yuraq', qu: 'yuraq', es: 'blanco', categoria: 'colores', audio: A('yuraq') },
  { id: 'yana', qu: 'yana', es: 'negro', categoria: 'colores', audio: A('yana') },
  // comprar
  { id: 'haykataq', qu: 'haykataq?', es: '¿cuánto es?', categoria: 'comprar', audio: A('haykataq') },
  { id: 'munani', qu: 'munani', es: 'quiero / me gusta', categoria: 'comprar', audio: A('munani') },
  { id: 'manam_munanichu', qu: 'manam munanichu', es: 'no quiero / no me gusta', categoria: 'comprar', audio: A('manam_munanichu') },
  { id: 'yapita', qu: 'yapita', es: 'un poquito más, de regalo', nota: 'don feli la pide así: "señora... yapita pues"', categoria: 'comprar', audio: A('yapita') },
  // comida
  { id: 'mikuy', qu: 'mikuy', es: 'comer', nota: 'sin h. con h es de cusco', categoria: 'comida', audio: A('mikuy') },
  { id: 'upyay', qu: 'upyay', es: 'beber', categoria: 'comida', audio: A('upyay') },
  { id: 'miski', qu: 'miski / miskin', es: 'dulce, rico (= Flor)', categoria: 'comida', audio: A('miski'), nombrePropio: true },
  { id: 'chuqllu', qu: 'chuqllu', es: 'choclo', nota: 'había un cartel', categoria: 'comida', audio: A('chuqllu') },
  // en la calle
  { id: 'waska', qu: 'waska', es: '"borracho" (¡lo decimos en lima!)', nota: '¿de acá sale? preguntarle a amaru', categoria: 'en la calle', audio: A('waska') },
  { id: 'sinka', qu: 'sinka / sinkaña kachkanki', es: 'borracho / ¡ya estás borracho!', nota: 'esto sí es quechua', categoria: 'en la calle', audio: A('sinka') },
  { id: 'wawa', qu: 'wawa', es: 'bebé, niñito o niñita', categoria: 'en la calle', audio: A('wawa') },
  { id: 'kusa', qu: 'kusa', es: '¡bien!, ¡qué bueno!', nota: 'la profe de la ronda lo decía feliz', categoria: 'en la calle', audio: A('kusa') },
  { id: 'tupananchikkama', qu: 'tupananchikkama', es: 'hasta que nos volvamos a encontrar', nota: 'media promesa: dice "hasta que", no "cuándo"', categoria: 'en la calle', audio: A('tupananchikkama') },
  // haciendo cosas
  { id: 'suyay', qu: 'suyay', es: 'espera', categoria: 'haciendo cosas', audio: A('suyay') },
  { id: 'hapiy', qu: 'hapiy', es: 'agarra', categoria: 'haciendo cosas', audio: A('hapiy') },
  { id: 'ama_kuyuychu', qu: 'ama kuyuychu', es: 'no te muevas', categoria: 'haciendo cosas', audio: A('ama_kuyuychu') },
  { id: 'qaway', qu: 'qaway', es: 'mira', categoria: 'haciendo cosas', audio: A('qaway') },
  { id: 'haku', qu: 'haku', es: 'vamos', categoria: 'haciendo cosas', audio: A('haku') },
  { id: 'kaypi_chaypi', qu: 'kaypi / chaypi / wakpi', es: 'acá / ahí / allá', categoria: 'haciendo cosas', audio: A('kaypi_chaypi') },
  { id: 'hanay_uray', qu: 'hanay / uray', es: 'arriba / abajo (hanayman, urayman: para arriba, para abajo)', categoria: 'haciendo cosas', audio: A('hanay_uray') },
  // la hora
  { id: 'imay_uranataq', qu: 'imay urañataq?', es: '¿qué hora es?', nota: 'ura viene de "hora"', categoria: 'la hora', audio: A('imay_uranataq') },
  { id: 'muruchaqnin', qu: 'pichqa uram iskay chunka muruchaqnin', es: 'son las cinco y veinte (muruchaqnin: los minutos). de tarde: kay pacha chisinkuypi', categoria: 'la hora', audio: A('muruchaqnin') },
  { id: 'intiwatana', qu: 'intiwatana', es: 'reloj de sol. literal: "donde se amarra el sol"', categoria: 'la hora', audio: A('intiwatana') },
  { id: 'tutamanta', qu: 'tuta / tutamanta', es: 'noche / temprano ("desde la noche")', categoria: 'la hora', audio: A('tutamanta') },
  { id: 'chisi', qu: 'chisi', es: 'tarde, cuando oscurece', categoria: 'la hora', audio: A('chisi') },
  // el cielo
  { id: 'killa', qu: 'killa', es: 'mes Y luna (bonito)', categoria: 'el cielo', audio: A('killa') },
  { id: 'akchi', qu: 'akchi / kanchay', es: 'luz / alumbrar', nota: 'me lo enseñó doña nati', categoria: 'el cielo', audio: A('akchi') },
  { id: 'mayu', qu: 'mayu', es: 'río. la abuelita de amaru le decía así a la vía láctea', categoria: 'el cielo', audio: A('mayu') },
  { id: 'quyllur', qu: 'quyllur', es: 'estrella', categoria: 'el cielo', audio: A('quyllur') },
  { id: 'pachakuna', qu: 'hanaq pacha / kay pacha / uku pacha', es: 'el mundo de arriba / este mundo / el de adentro', categoria: 'el cielo', audio: A('pachakuna') },
  { id: 'constelaciones', qu: 'llama wawayuq / atuq / hampatu / machaqway', es: 'la llama con su cría / el zorro / el sapo / la serpiente', nota: 'son las manchas oscuras del mayu', categoria: 'el cielo', audio: A('constelaciones') },
  // cumplidos (la escala de flor)
  { id: 'sumaq', qu: 'sumaq', es: 'bonito, lindo, precioso', categoria: 'cumplidos', audio: A('sumaq') },
  { id: 'millay', qu: 'millay / millakuypaqmi', es: 'feo, da asco / horrible, asqueroso (nivel máximo)', nota: 'no decírselo a algo que solo está feíto', categoria: 'cumplidos', audio: A('millay') },
  { id: 'puka_kachkan', qu: 'puka kachkan', es: 'está rojo (nivel 1: un dato)', categoria: 'cumplidos', audio: A('puka_kachkan') },
  { id: 'sumaq_kachkan', qu: 'sumaq kachkan', es: 'está bonito (nivel 2: cumplido)', categoria: 'cumplidos', audio: A('sumaq_kachkan') },
  { id: 'kuyayllapaqmi', qu: 'kuyayllapaqmi kanki', es: 'eres lindo, linda (nivel 3: piropo)', categoria: 'cumplidos', audio: A('kuyayllapaqmi') },
  { id: 'sunqullay', qu: 'sunqullay', es: 'corazoncito mío (nivel 4: NO A ALGUIEN QUE CONOCISTE HOY)', categoria: 'cumplidos', audio: A('sunqullay') },
  // otros
  { id: 'wata', qu: 'wata', es: 'año', categoria: 'otros', audio: A('wata') },
  { id: 'amaru', qu: 'amaru', es: 'serpiente grande, de los ríos. vive abajo y sube', categoria: 'otros', audio: A('amaru'), nombrePropio: true },
  { id: 'atataw', qu: '¡atataw!', es: '"ay no" / qué roche / qué vergüenza', categoria: 'otros', audio: A('atataw') },
  { id: 'meses', qu: 'Uma Raymi Killa / Aya Marqay Killa', es: 'octubre / noviembre (el mes de cargar a los muertos)', categoria: 'otros', audio: A('meses') },
  { id: 'acuchimay', qu: 'Acuchimay', es: 'el cerro con el Cristo blanco', categoria: 'otros', audio: null, nombrePropio: true },
  { id: 'chayqa', qu: 'chayqa', es: '"y qué" (según Flor)', categoria: 'otros', audio: A('chayqa') },
  // cariñosos
  { id: 'qam_hina', qu: 'qam hina', es: 'como tú (así se devuelve un upacha)', categoria: 'cariñosos', audio: A('qam_hina') },
  { id: 'upacha', qu: 'upacha', es: 'tontito (cariñoso). upa solito es "sonso"', categoria: 'cariñosos', audio: A('upacha') },
  { id: 'qachakuchi', qu: 'qachakuchi', es: 'sucio, mugroso, como chanchito (cariñoso)', categoria: 'cariñosos', audio: A('qachakuchi') },
  { id: 'pinapsu', qu: 'piñapsu', es: 'renegón, molestoso (cariñoso)', nota: 'NO JUNTARLOS', categoria: 'cariñosos', audio: A('pinapsu') },
];
