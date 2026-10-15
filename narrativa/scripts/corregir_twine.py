# Aplica a narrativa/Killa.html las correcciones de Abner (quechua chanka) y los cambios
# que se hicieron al pasar las escenas 3 y 4 al juego.
import html, re, sys

RUTA = sys.argv[1]
s = open(RUTA, encoding="utf-8").read()
pat = re.compile(r'<tw-passagedata pid="(\d+)" name="([^"]*)" tags="([^"]*)" position="([^"]*)" size="([^"]*)">(.*?)</tw-passagedata>', re.S)
ps = [[int(p), html.unescape(n), html.unescape(t), pos, sz, html.unescape(b)] for p, n, t, pos, sz, b in pat.findall(s)]
porNombre = {p[1]: p for p in ps}

RENOMBRAR = {
    "Allillanchu!": "Allinllachu!",
    "Pago hayk'ataq": "Pago haykataq",
    "Msg allillanchu": "Msg allinllachu",
    "Msg qhilli": "Msg mikhuy",
    "Msg punchay": "Msg punchaw",
    "Qilli": "Qachakuchi",
}

C = {}  # nombre del pasaje -> [(viejo, nuevo), ...]
def cambiar(nombre, *pares):
    C.setdefault(nombre, []).extend(pares)

# ---------------------------------------------------------------- escena 1 y 2
cambiar("Allillanchu!",
    ("—¡Allilanchu...!", "—¡Allinlachu...!"),
    ("—Allin... punchay.", "—Allin... punchaw."),
    ("¡Dijo allin p'unchay!", "¡Dijo allin punchaw!"),
    ("Primero: alli-lla-nchu, no allilanchu.", "Primero: allin-lla-chu, no allinlachu."),
    ("—Allillanchu.", "—Allinllachu."),
    ("—Allin p'unchay sí existe", "—Allin punchaw sí existe"),
    ("Acá dices allillanchu nomás.", "Acá dices allinllachu nomás."),
)
cambiar("Pausa",
    ("También se dice añay. O diospagarasunki.", "También se dice añay. O diuspaqarasunki."),
    ("Si le dices diospagarasunki a alguien", "Si le dices diuspaqarasunki a alguien"),
)
cambiar("Colores",
    ("Lo más importante: hayk'ataq? ¿Cuánto es?", "Lo más importante: haykataq? ¿Cuánto es?"),
    ("—Hayk'ataq.", "—Haykataq."),
    ("—O completo: hayk'ataq kanki? pero nadie dice completo. Hayk'ataq nomás, señalando.", "—O completo: haykataq kanki? pero nadie dice completo. Haykataq nomás, señalando."),
    ("no cachas nada: manam hamut'anichu.", "no cachas nada: manam hamutanichu."),
    ("—Manam... hamut'anichu.", "—Manam... hamutanichu."),
)
cambiar("Edad",
    ("Hayk'a watayuqtaq kanki? ¿Cuántos años tienes?", "Hayka watayuqtaq kanki? ¿Cuántos años tienes?"),
    ("—Hayk'a... watayuqtaq kanki.", "—Hayka... watayuqtaq kanki."),
)
cambiar("Juntos",
    ("Noviembre es Aya Marq'ay Killa.", "Noviembre es Aya Marqay Killa."),
    ("Y Aya Marq'ay es cargar a los muertos.", "Y Aya Marqay es cargar a los muertos."),
    ("—Upa —dice Flor—. Es como \"tonto\", \"sonso\". Pero suave. Se lo dices a tu hermano y no pasa nada.",
     "—Upacha —dice Flor—. Es como \"tontito\". Upa solito es \"sonso\" nomás; con el -cha ya es cariñoso. Se lo dices a tu hermano y no pasa nada."),
    ("—Upa —pruebas tú.", "—Upacha —pruebas tú."),
)
cambiar("Entrada",
    ("—Ya. Allillanchu. Fuerte.", "—Ya. Allinllachu. Fuerte."),
    ("Y lo sueltas—: Allilanchu.", "Y lo sueltas—: Allinlachu."),
    ("Hayk'ataq.", "Haykataq."),
    ("* [[Hayk'ataq?->Q]]", "* [[Haykataq?->Q]]"),
)
cambiar("Q",
    ("—Hayk'ataq?", "—Haykataq?"),
    ("—Hayk'ataq —repite", "—Haykataq —repite"),
)
cambiar("E", ("—¡Hayk'ataq! —te susurra Flor", "—¡Haykataq! —te susurra Flor"))
cambiar("Ari",
    ("—...Manam hamut'anichu.", "—...Manam hamutanichu."),
    ("—¡Arí y después manam hamut'anichu!", "—¡Arí y después manam hamutanichu!"),
)
cambiar("No, nada", ("—Le dijo hayk'ataq a don Hilario", "—Le dijo haykataq a don Hilario"))
cambiar("Comida",
    ("Beber. Y mikhuy es comer.", "Beber. Y mikuy es comer."),
    ("—Upyay. Mikhuy.", "—Upyay. Mikuy."),
)
cambiar("Quisquilloso",
    ("—Upa —dice la mamá, cariñosamente,", "—Upacha —dice la mamá, cariñosamente,"),
    ("¡Le dijo upa! ¡Mi mamá!", "¡Le dijo upacha! ¡Mi mamá!"),
)
cambiar("Tarde",
    ("—Qhilli. Sucio, mugroso. Como decirle \"piojoso\".", "—Qachakuchi. Sucio, mugroso, como chanchito. Kuchi es chancho."),
    ("—Qhilli.", "—Qachakuchi."),
    ("—Phiña. Renegón. Molestoso.", "—Piñapsu. Renegón. Molestoso."),
    ("—No soy phiña.", "—No soy piñapsu."),
    ("—Eres el phiña más grande de Ayacucho.", "—Eres el piñapsu más grande de Ayacucho."),
    ("—Qhilli phiña —pruebas tú, juntando los dos.", "—Qachakuchi piñapsu —pruebas tú, juntando los dos."),
)

# ---------------------------------------------------------------- escena 3: kiosko
cambiar("Pago Nati", ("* [[¿Hayk'ataq?->Pago hayk'ataq]]", "* [[¿Haykataq?->Pago haykataq]]"))
cambiar("Pago hayk'ataq", ("—¿Hayk'ataq?", "—¿Haykataq?"))
cambiar("Pago cuánto",
    ("—Hayk'ataq, se dice", "—Haykataq, se dice"),
    ("—...¿Hayk'ataq?", "—...¿Haykataq?"),
)
cambiar("Cuenta Nati",
    ("K'anchay, le decimos. Bueno, k'anchay es la luz.", "Kanchay, le decimos. Bueno, kanchay es la luz."),
    ("—K'anchay —repites.", "—Kanchay —repites."),
)
cambiar("Cierre Nati",
    ("—Imamanta, wawqiy.", "—Imamanta, turiy."),
    ("Sales sin saber qué significa //wawqiy//.", "Sales sin saber qué significa //turiy//."),
)

NOTAS = """Abres las notas. La lista de la mañana se ve patética ahora. Empiezas a agregar todo lo del día, tratando de escribir los sonidos como te salen:

''QUECHUA — ayacucho''

''saludos''
allinllachu — hola / ¿estás bien? (DOBLE ELE. decir fuerte)
allinmi / allinllam — estoy bien
rimaykullayki — saludo formal, para mayores
allin punchaw — buen día (de radio, de locutor, no de calle)

''presentarse''
ñuqapa sutiymi Ariel — me llamo Ariel (con énfasis)
(if: $bromeoProfesor)[sutiyqa Arielmi — también vale, es la simple (flor tenía razón)
imataq sutiyki? — ¿cómo te llamas?
]maymantataq kanki? — ¿de dónde eres?
limamantam kani — soy de Lima
(if: $pregunta is "edades")[hayka watayuqtaq kanki? — ¿cuántos años tienes?
chunka pusaqniyuq watayuqmi kani — tengo 18
]
''cortesía''
sulpayki — gracias
añay — gracias (otra forma)
diuspaqarasunki — gracias (de abuelita)
imamanta — de nada
ama hina kaspa — por favor (formal, favor grande)
arí — sí

''no entiendo''
manam hamutanichu — no entiendo
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
haykataq? — ¿cuánto es?(if: $usoHaykataq)[ funcionó!!]
munani — quiero / me gusta
manam munanichu — no quiero / no me gusta
yapita — pedir un poquito más(if: $yapita)[ FUNCIONA]

''comida''
mikuy — comer (sin h. con h es de cusco)
upyay — beber
miski / miskin — dulce, rico (= flor)

''otros''
killa — mes Y luna (bonito)
wata — año
amaru — serpiente grande, de los ríos
yaya — "ay no" / roche / flojera
upacha — tontito (cariñoso)
qachakuchi — sucio, como chanchito (cariñoso)
piñapsu — renegón (cariñoso)
NO JUNTARLOS

''escuchado en la calle (preguntar)''
waska — ¿¿¿de acá sale??? preguntarle a amaru
wawa — ¿niña? ¿bebé?
kusa — ¿"bien"? la profe lo decía feliz
chuqllu — ¿choclo? (había un cartel)
(if: $compras contains "linterna")[kanchay — luz (doña nati)
](unless: $compras contains "ringpop")[turiy — ??? me lo dijo doña nati. preguntar
]
Los repasas en voz baja, moviendo los labios, caminando de vuelta con la bolsa del kiosko.
//Allinllachu. Sulpayki. Imamanta. Haykataq. Pisillata.//
(if: $pregunta is "edades")[//Chunka pusaqniyuq watayuqmi kani.//](else:)[//Iskay waranqa iskay chunka suqtayuq.//]
Ya no suenan tan extranjeras.

* [[Sacar el celular otra vez->Mensajes]]
"""

cambiar("Mensajes",
    ('• (link-goto: "allillanchu", "Msg allillanchu")', '• (link-goto: "allinllachu", "Msg allinllachu")'),
    ('• (link-goto: "allin punchay hermanos quispe...", "Msg punchay")', '• (link-goto: "allin punchaw hermanos quispe...", "Msg punchaw")'),
    ('• (link-goto: "qhilli phiña upa", "Msg insultos")', '• (link-goto: "qachakuchi piñapsu upacha", "Msg insultos")'),
    ('(link-goto: "hayk\'ataq?", "Msg haykataq")', '(link-goto: "haykataq?", "Msg haykataq")'),
    ('• (link-goto: "oe qhilli, sal", "Msg qhilli")', '• (link-goto: "oe sal. mikhuy?", "Msg mikhuy")'),
)
cambiar("Msg allillanchu",
    ('(set: $mensajeEnviado to "allillanchu")', '(set: $mensajeEnviado to "allinllachu")'),
    ("Tú: allillanchu", "Tú: allinllachu"),
    ("Flor: allillanmi 😌", "Flor: allinllam 😌"),
    ("Amaru: allillanmi.", "Amaru: allinllam."),
)
cambiar("Msg qhilli",
    ('(set: $mensajeEnviado to "qhilli")', '(set: $mensajeEnviado to "mikhuy")'),
    ("Tú: oe qhilli, sal", "Tú: oe sal. mikhuy?"),
    ("Amaru: qilli.", "Amaru: mikuy."),
    ("Amaru: y no soy sucio, acabo de bañarme", "Amaru: y ya comí. tres platos. me viste"),
)
cambiar("Msg punchay",
    ('(set: $mensajeEnviado to "punchay")', '(set: $mensajeEnviado to "punchaw")'),
    ("Tú: allin punchay hermanos quispe. ñuqa kani ariel. mikhuni miski. sulpayki tukuy", "Tú: allin punchaw hermanos quispe. ñuqa kani ariel. mikuni miski. sulpayki tukuy"),
)
cambiar("Msg insultos", ("Tú: qhilli phiña upa", "Tú: qachakuchi piñapsu upacha"))
cambiar("Msg haykataq", ("Tú: hayk'ataq?", "Tú: haykataq?"))
cambiar("Vuelta",
    ('(else-if: $mensajeEnviado is "punchay")', '(else-if: $mensajeEnviado is "punchaw")'),
    ("Y él tiene que arreglarlo hoy porque mañana mi papá va a preguntar y si no está listo va a ser un tema.",
     "Y él tiene que arreglarlo hoy, porque mi papá llega a las siete y va a preguntar, y si no está listo va a ser un tema."),
)

# ---------------------------------------------------------------- ruta de Amaru
cambiar("Amaru 1",
    ("—Ima uraña? ¿Qué hora es ya?\n—Ima uraña.\n—Y contestas... —piensa—. Mira, la verdad nadie dice las horas en quechua acá. Nadie. Todos dicen \"cinco y veinte\". —Hace un gesto—. Pero si quieres: pichqa ura. Cinco horas.",
     "—Imay urañataq? ¿Qué hora es ya?\n—Imay urañataq.\n—Y contestas... —piensa—. Pichqa ura. Cinco horas. Aunque acá casi todos dicen \"cinco y veinte\" en castellano nomás."),
    ("—Como diospagarasunki.", "—Como diuspaqarasunki."),
    ("—...Sí. Igual que diospagarasunki. —Pausa—. Te acordaste.\n—Me acordé.\nNo dice nada más, pero se le queda algo en la cara.\n",
     "—...Sí. Igual que diuspaqarasunki. —Pausa—. Te acordaste.\n—Me acordé.\nNo dice nada más, pero se le queda algo en la cara.\n"
     "—¿Y antes del español? ¿Cómo preguntaban?\n"
     "—Hay otra. Haykañataq kay intiwatana? —Lo dice despacio—. Intiwatana es el reloj de sol. Literal es \"donde se amarra el sol\".\n"
     "Te quedas callado.\n"
     "—¿Se amarra el sol?\n"
     "—Eso dice la palabra. Mi abuelita la usaba. Yo no, suena a museo.\n"
     "—A mí me encanta.\n"
     "—Ya sé. Tienes cara de que te encanta.\n"),
)
cambiar("Fuga", ("—K'anchay —dices.", "—Kanchay —dices."), ("—K'anchay —dice, sin que le preguntes.", "—Kanchay —dice, sin que le preguntes."))
cambiar("Mayu",
    ("—Esa de ahí es la llama —dice él—. Grande.", "—Esa de ahí es la llama —dice él—. Llama wawayuq, la llama con su cría. Grande."),
    ("Y ahí abajo hay una cría.", "Y ahí abajo está la cría."),
    ("—Hay un zorro. Un sapo. Una serpiente. —Pausa—. Machaqway.", "—Hay un zorro, atuq. Un sapo, hampatu. Y una serpiente. —Pausa—. Machaqway."),
)
cambiar("Echados",
    ("—Upa —dice.\n", "—Upacha —dice.\n"),
    ("—Ya. —Te acomodas en el respaldo—. Upa tú también.", "—Ya. —Te acomodas en el respaldo—. Upacha tú también."),
    ("y hay uno adentro, abajo, ukhu pacha.", "y hay uno adentro, abajo, uku pacha."),
    ("—Perdón.\n—Upa.\n—Ya sé.", "—Perdón.\n—Upacha.\n—Ya sé."),
)

# ---------------------------------------------------------------- ruta de Flor
cambiar("Kaypi",
    ("Nivel uno: describir. Puka kashan — está rojo.", "Nivel uno: describir. Puka kachkan — está rojo."),
    ("Nivel dos: cumplido. Sumaq kashan — está bonito.", "Nivel dos: cumplido. Sumaq kachkan — está bonito."),
    ("—Nivel tres: piropo. —Baja la voz—. Sumaqmi kanki. Eres bonito.", "—Nivel tres: piropo. —Baja la voz—. Kuyayllapaqmi kanki. Eres lindo. Eres para quererte, algo así."),
    ("[[Continuar.->Qilli]]", "[[Continuar.->Qachakuchi]]"),
)
cambiar("Qilli",
    ("—Ay, qilli —dice—. Ya saliste con eso.\n—¿Qué?\n—Qilli. Sucio, mugroso. —Sonríe de costado—. Pero como te lo estoy diciendo yo, es cariñoso. Es como decirte \"ay, malo\".\n—Qilli —repites.\n—Sin h. Ojo. Con h es de Cusco.\n—¿Y acá no?\n—Acá no. Acá es qilli, piña, mikuy. Sin toda esa cosa de la garganta. —Se encoge de hombros—. Cada valle tiene lo suyo.",
     "—Ay, qachakuchi —dice—. Ya saliste con eso.\n—Ese me lo enseñaste tú.\n—Y mira qué bien lo uso. —Sonríe de costado—. Así se dice. Con cariño. Es como decirte \"ay, malo\".\n—Oye, ¿y por qué en internet sale todo con h? Mikhuy, p'unchay...\n—Porque eso es de Cusco. Acá es sin h. Mikuy, punchaw, hamutani. Sin toda esa cosa de la garganta. —Se encoge de hombros—. Cada valle tiene lo suyo."),
)
cambiar("Confesión", ("—Y después me dijiste allillanchu y me quise morir.", "—Y después me dijiste allinllachu y me quise morir."))

# ---------------------------------------------------------------- aplicar
faltan = []
for nombre, pares in C.items():
    p = porNombre[nombre]
    for viejo, nuevo in pares:
        if viejo not in p[5]:
            faltan.append((nombre, viejo[:60])); continue
        p[5] = p[5].replace(viejo, nuevo)
if faltan:
    sys.exit("no encontré: %r" % faltan)
porNombre["Notas"][5] = NOTAS

# Renombrar pasajes y sus links.
for viejo, nuevo in RENOMBRAR.items():
    porNombre[viejo][1] = nuevo
    for p in ps:
        b = p[5]
        b = b.replace(f"->{viejo}]]", f"->{nuevo}]]").replace(f"[[{viejo}]]", f"[[{nuevo}]]").replace(f'"{viejo}")', f'"{nuevo}")')
        p[5] = b

# Revisar links.
nombres = {p[1] for p in ps}
malos = []
for p in ps:
    for m in re.findall(r'\[\[(?:[^\]]*?->)?([^\]]+?)\]\]', p[5]):
        if m not in nombres: malos.append((p[1], m))
    for m in re.findall(r'\((?:link-goto|go-to):\s*(?:"[^"]*",\s*)?"([^"]+)"\)', p[5]):
        if m not in nombres: malos.append((p[1], m))
if malos:
    sys.exit("links rotos: %r" % malos)

# Lo que no debería quedar en ningún pasaje (salvo los errores a propósito de Ariel).
quedan = []
for p in ps:
    for w in ["allillanchu", "Allillanchu", "p'unchay", "hayk'", "Hayk'", "hamut'", "qhilli", "Qhilli", "phiña", "Phiña",
              "diospagarasunki", "Marq'ay", "wawqiy", "kashan", "k'anchay", "K'anchay", "ukhu", "allillanmi", "allillam"]:
        if w in p[5] and not (p[1] == "Qachakuchi" and w == "p'unchay"):
            quedan.append((p[1], w))
print("quedan:", quedan)

esc = lambda x: html.escape(x, quote=True)
pasajes = "".join(
    f'<tw-passagedata pid="{pid}" name="{esc(n)}" tags="{esc(t)}" position="{pos}" size="{sz}">{esc(b)}</tw-passagedata>'
    for pid, n, t, pos, sz, b in ps)
a = s.index("<tw-passagedata"); b = s.index("</tw-storydata>")
s = s[:a] + pasajes + s[b:]
open(RUTA, "w", encoding="utf-8").write(s)
print(len(ps), "pasajes")
