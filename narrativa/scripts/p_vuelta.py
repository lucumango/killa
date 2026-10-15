# Pasajes: notas del celular, mensajes al grupo, vuelta a la casa, elección.
P = []
def add(name, tags, pos, text):
    P.append((name, tags, pos, text.strip('\n') + '\n'))

add("Notas", "3M2", (4000, 3700), """
Abres las notas. La lista de la mañana se ve patética ahora. Empiezas a agregar todo lo del día, tratando de escribir los sonidos como te salen:

''QUECHUA — ayacucho''

''saludos''
allillanchu — hola / ¿estás bien? (DOBLE ELE. decir fuerte)
allinmi / allillam — estoy bien
rimaykullayki — saludo formal, para mayores
allin p'unchay — buen día (de radio, de locutor, no de calle)

''presentarse''
ñuqapa sutiymi Ariel — me llamo Ariel
(if: $bromeoProfesor)[sutiyqa Arielmi — SOLO si te preguntaron primero (flor tenía razón)
imataq sutiyki? — ¿cómo te llamas?
]maymantataq kanki? — ¿de dónde eres?
limamantam kani — soy de Lima
(if: $pregunta is "edades")[hayk'a watayuqtaq kanki? — ¿cuántos años tienes?
chunka pusaqniyuq watayuqmi kani — tengo 18
]
''cortesía''
sulpayki — gracias
añay — gracias (otra forma)
diospagarasunki — gracias (de abuelita)
imamanta — de nada
ama hina kaspa — por favor (formal, favor grande)
arí — sí

''no entiendo''
manam hamut'anichu — no entiendo
manam yachanichu — no sé
as-asllata rimani — hablo poquito
pisillata — más o menos

''números''
huk 1 / iskay 2 / kimsa 3 / tawa 4 / pichqa 5
suqta 6(if: $pregunta is "edades" or $pregunta is "67")[ / qanchis 7](if: $pregunta is "edades")[ / pusaq 8]
chunka 10(if: $pregunta is "67")[ / pachak 100] / waranqa 1000
(if: $pregunta is "67")[suqta chunka qanchisniyuq — 67 😐
]iskay waranqa iskay chunka suqtayuq — 2026

''colores''
puka — rojo (puca picante!!)
yuraq — blanco
yana — negro

''comprar''
hayk'ataq? — ¿cuánto es?(if: $usoHaykataq)[ funcionó!!]
munani — quiero / me gusta
manam munanichu — no quiero / no me gusta
yapita — pedir un poquito más(if: $yapita)[ FUNCIONA]

''comida''
mikhuy — comer
upyay — beber
miski / miskin — dulce, rico (= flor)

''otros''
killa — mes Y luna (bonito)
wata — año
amaru — serpiente grande, de los ríos
yaya — "ay no" / roche / flojera
upa — tonto (cariñoso)
qhilli — sucio, piojoso (cariñoso)
phiña — renegón (cariñoso)
NO JUNTAR LOS TRES

''escuchado en la calle (preguntar)''
waska — ¿¿¿de acá sale??? preguntarle a amaru
wawa — ¿niña? ¿bebé?
kusa — ¿"bien"? la profe lo decía feliz
chuqllu — ¿choclo? (había un cartel)
(if: $compras contains "linterna")[k'anchay — luz (doña nati)
](unless: $compras contains "ringpop")[wawqiy — ??? me lo dijo doña nati. preguntar
]
Los repasas en voz baja, moviendo los labios, caminando de vuelta con la bolsa del kiosko.
//Allillanchu. Sulpayki. Imamanta. Hayk'ataq. Pisillata.//
(if: $pregunta is "edades")[//Chunka pusaqniyuq watayuqmi kani.//](else:)[//Iskay waranqa iskay chunka suqtayuq.//]
Ya no suenan tan extranjeras.

* [[Sacar el celular otra vez->Mensajes]]
""")

# Colores de riesgo (solo para ti): verde = se entienden, amarillo = riesgosos,
# rojo = no se entienden, calavera = el que no deberías mandar.
add("Mensajes", "3M2", (4150, 3700), """
Antes de volver a entrar, puedes escribirle al grupo. En el quechua que creas que sabes. Si se entiende, te contestan. Si no se entiende...
Bueno. Si no se entiende, ya sabes lo que pasa con los mensajes que nadie entiende.

''EL GRUPOOOOOO 🦜''
• (link-goto: "allillanchu", "Msg allillanchu")
• (link-goto: "sulpayki x el almuerzo 🙏", "Msg sulpayki")
• (link-goto: "compré pilas AA. para el futuro", "Msg pilas")
• (link-goto: "ñuqapa sutiymi Ariel", "Msg sutiymi")
• (link-goto: "munani 🥺", "Msg munani")
• (link-goto: "allin punchay hermanos quispe...", "Msg punchay")
• (link-goto: "qhilli phiña upa", "Msg insultos")
(if: $bromeoProfesor)[• (link-goto: "imataq sutiyki?", "Msg imataq")
]• (link-goto: "hayk'ataq?", "Msg haykataq")
(if: $compras contains "ringpop")[• (link-goto: "amor 🥺💍", "Msg amor")
]
''Amaru'' (privado)
• (link-goto: "oe qhilli, sal", "Msg qhilli")

''Flor'' (privado)
• (link-goto: "miski 🥺", "Msg miski")

• [[No mandar nada->Vuelta]]
<!-- Guardados para después: "ya volví, estoy afuera. suyay" (suyay se enseña en la ruta de Amaru) y "sumaq killa hoy no?" (nadie ha enseñado sumaq). -->
""")

MSGS = [
    ("Msg allillanchu", "allillanchu", "EL GRUPOOOOOO 🦜", "allillanchu", """
Flor: allillanmi 😌
Flor: OYE ESCRIBE MAS
Flor: no me dejes asi
Amaru: allillanmi.
//(punto final. es todo lo que vas a recibir)//"""),
    ("Msg sulpayki", "sulpayki", "EL GRUPOOOOOO 🦜", "sulpayki x el almuerzo 🙏", """
Flor: imamanta causa 💅
Flor: ay ya dice causa
Flor: se nos pegó
Amaru: imamanta
Amaru: era de mi mamá igual, dile a ella"""),
    ("Msg pilas", "pilas", "EL GRUPOOOOOO 🦜", "compré pilas AA. para el futuro", """
Flor: 🥹
Flor: GRACIAS
Flor: amaru mira
Amaru: el futuro no existe
Amaru: pero gracias"""),
    ("Msg qhilli", "qhilli", "Amaru", "oe qhilli, sal", """
Amaru: qilli.
Amaru: sin h.
Amaru: eso es cusqueño.
Amaru: y no soy sucio, acabo de bañarme
//(tres minutos después)//
Amaru: igual salgo"""),
    ("Msg miski", "miski", "Flor", "miski 🥺", """
Flor: ???
Flor: ese es mi nombre
Flor: o me estás diciendo dulce
Flor: ARIEL
Flor: CUÁL DE LOS DOS
Flor: NO ME DEJES EN VISTO ASÍ"""),
    ("Msg sutiymi", "sutiymi", "EL GRUPOOOOOO 🦜", "ñuqapa sutiymi Ariel", """
Amaru: ya sé cómo te llamas
Amaru: te tengo agendado
Flor: JAJAJAJAJA se presentó otra vez
Flor: hola ariel mucho gusto
Flor: yo soy flor"""),
    ("Msg munani", "munani", "EL GRUPOOOOOO 🦜", "munani 🥺", """
Flor: QUÉ COSA
Flor: QUÉ QUIERES
Flor: dilo completo
Flor: no puedes solo poner "quiero" y desaparecer
Amaru: falta el objeto.
Amaru: la oración está incompleta.
Amaru: ¿qué quieres?"""),
    ("Msg punchay", "punchay", "EL GRUPOOOOOO 🦜", "allin punchay hermanos quispe. ñuqa kani ariel. mikhuni miski. sulpayki tukuy", """
//(entregado. leído.)//
//(nada)//"""),
    ("Msg insultos", "insultos", "EL GRUPOOOOOO 🦜", "qhilli phiña upa", """
//(leído por los dos)//
//(silencio absoluto)//"""),
    ("Msg imataq", "imataq", "EL GRUPOOOOOO 🦜", "imataq sutiyki?", """
Flor: flor
Flor: nos conocemos hace 4 horas
Flor: comiste en mi casa"""),
    ("Msg haykataq", "haykataq", "EL GRUPOOOOOO 🦜", "hayk'ataq?", """
Amaru: ¿cuánto es qué
Flor: ¿cuánto es qué?????
Flor: ariel
Flor: ariel cuánto es qué"""),
    ("Msg amor", "amor", "EL GRUPOOOOOO 🦜", "amor 🥺💍", """
//(visto por los dos)//
//(Flor está escribiendo...)//
//(Flor dejó de escribir)//
//(Flor está escribiendo...)//
//(Flor dejó de escribir)//
Amaru: ¿ese mensaje era para el grupo?"""),
]

for k, (name, clave, chat, texto, resp) in enumerate(MSGS):
    add(name, "3M2", (4300 + 150 * (k % 6), 3700 if k < 6 else 3825), f"""
(set: $mensajeEnviado to "{clave}")''{chat}''
Tú: {texto}
{resp.strip()}

* [[Guardar el celular y entrar->Vuelta]]
""")

add("Vuelta", "3M3", (4000, 3825), """
El celular vibra en tu mano.

Mamá: ariel esto va a terminar tardísimo me quedo hasta que salga el sistema te recojo más noche donde los quispe ya le escribí a la señora maría ella dice que no hay problema
Tú: ya ma
Mamá: PORTATE BIEN ayuda en algo no estés sentado nomas

Guardas el celular. (if: $mensajeEnviado is "amor")[Empujas la puerta del patio.
Los dos están mirando el techo y nadie dice nada durante ocho segundos enteros.
—...Volviste —dice Flor, al fin.
—No se perdió —dice Amaru, al techo.](else-if: $mensajeEnviado is "punchay")[Empujas la puerta del patio.
Cuando entras, Flor está con el celular en la mano y cara de dolor.
—Ay, Ariel.
—¿Qué le pasó? —dice Amaru.
—No sé. Le pasó algo.](else:)[Empujas la puerta del patio.
—¡Volvió! —grita Flor desde adentro—. ¡No se perdió!
—Te dije que no me iba a perder.
—Amaru dijo que sí.
—Dije que probablemente —corrige Amaru, sin levantar la vista de lo suyo.]
(if: $mensajeEnviado is "insultos")[—Te dije que iba a pasar esto —dice Amaru.
—¡PERO SI LO DIJO ACÁ ADENTRO! —dice Flor.
—Lo dijo por chat. Es afuera. El chat es afuera.
]
Y ahí ves que la casa cambió en los veinte minutos que no estuviste. La mesa está a medio recoger. La mamá y la tía siguen en la cocina pero ahora hablando de otra cosa, algo de cantidades, algo de "¿y alcanza?". Y en el patio, contra la pared, hay ahora dos parlantes grandes que antes no estaban, negros, con las esquinas peladas, y un enredo de cables sacados de una caja.
—Tenemos problemas —anuncia Flor, y lo dice con el tono de quien está encantada de que existan problemas.
—¿Qué pasó?
—Dos cosas. —Levanta dos dedos—. Cosa uno: mi tía cumple años y hay fiesta acá el sábado, y mi papá dijo "Amaru, los parlantes", como siempre, y uno de los parlantes está haciendo un ruido.
—No está haciendo un ruido —dice Amaru, agachado al lado del cable—. Está haciendo //el// ruido. Es distinto.
—Está haciendo un ruido —repite Flor—. Y él tiene que arreglarlo hoy porque mañana mi papá va a preguntar y si no está listo va a ser un tema.<!-- REVISAR: en la ruta de Amaru la mamá grita que el papá "llega a las siete". Elegir uno. -->
—No va a ser un tema.
—Va a ser un tema.
Amaru se queda callado, lo cual confirma que va a ser un tema.
—Cosa dos —sigue Flor, y ahora sí se le sube la voz—: yo tengo que grabar un video.
—¿Qué video?
—Es para una amiga. Bueno, para la tienda de su mamá. —Se le enredan un poco las palabras de la emoción—. Venden mates burilados, cosas así, y quieren empezar a subir cosas a Instagram porque nadie los conoce fuera de acá. Y yo le dije que se lo hacía gratis. Como práctica. Para tener algo que mostrar cuando llegue a la universidad, ¿me entiendes? Porque todos van a llegar con su portafolio y yo voy a llegar con... —hace un gesto vago—, con nada.
—No vas a llegar con nada —dice Amaru, todavía agachado.
—Voy a llegar con nada.
—Tienes cosas.
—Tengo cosas feas.
—Tienes cosas.
Flor lo ignora y se voltea hacia ti con las manos juntas.
—Y tengo que grabarlo hoy, porque hoy hay esta luz. —Señala el cielo—. ¿Ves esa luz? Esa luz dura como una hora más. Mañana está nublado, ya vi el pronóstico.
—El pronóstico nunca acierta acá —dice Amaru.
—Hoy sí va a acertar.
Y entonces los dos se callan al mismo tiempo, y voltean, y te miran.
Flor tiene el celular en una mano y una bolsa de tela en la otra, con las cosas para grabar.
Amaru tiene un cable en la mano y el multímetro amarillo en la otra, y una expresión que dice claramente que no va a insistir en nada, que si te vas con su hermana no va a decir ni pío, y que preferiría que no.
—Ya —dice Flor—. ¿Con quién te quedas?
—No la ayudes —dice Amaru—. Te va a hacer cargar cosas.
—¡Tú también le vas a hacer cargar cosas!
—Yo le voy a hacer //sostener// cosas. Es distinto.
—¡Es exactamente lo mismo!
Puku, desde su jaula, opina:
—¡Loro!
—Nadie te preguntó —dicen los dos a la vez.
Y se quedan mirándote, esperando.

* [[Continuar.->Choice]]
""")

