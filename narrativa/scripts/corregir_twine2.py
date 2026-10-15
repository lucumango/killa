# Segunda ronda de correcciones de Abner en narrativa/Killa.html.
import html, re, sys
RUTA = sys.argv[1]
s = open(RUTA, encoding="utf-8").read()
pat = re.compile(r'<tw-passagedata pid="(\d+)" name="([^"]*)" tags="([^"]*)" position="([^"]*)" size="([^"]*)">(.*?)</tw-passagedata>', re.S)
ps = [[int(p), html.unescape(n), html.unescape(t), pos, sz, html.unescape(b)] for p, n, t, pos, sz, b in pat.findall(s)]
por = {p[1]: p for p in ps}
C = {}
def c(n, *pares): C.setdefault(n, []).extend(pares)

c("Hermanos", ("—Yaya —murmura,", "—Atataw —murmura,"))
c("Comida", ("—Yaya —dice Amaru.", "—Atataw —dice Amaru."), ("\n—Yaya.", "\n—Atataw."))
c("Quisquilloso",
  ("—Yaya —dice.", "—Atataw —dice."),
  ("—¿Qué es yaya? —preguntas.", "—¿Qué es atataw? —preguntas."),
  ("Como cuando algo te da roche o flojera. Yaya.", "Como cuando algo te da roche o vergüenza. Atataw."),
  ("\n—Yaya.", "\n—Atataw."))
c("Salir al kiosko",
  ("—¡Estás waska!\n", "—¡Estás waska!\n—¡Sinkaña kachkanki, compadre!\nY se ríen los tres, con más ganas todavía.\n"),
  ("—¡Imallanchik!", "—¡Imayllanchik!"))
c("Cuenta Nati",
  ("Kanchay, le decimos. Bueno, kanchay es la luz. La linterna es la linterna. —Se encoge de hombros—. Ya nadie le dice de otra forma.",
   "Akchi, le decimos a la luz. Y alumbrar es kanchay. La linterna sí es la linterna. —Se encoge de hombros—. Ya nadie le dice de otra forma."),
  ("—Kanchay —repites.\n—Eso. Luz, brillo, alumbrar. Todo junto.", "—Akchi. Kanchay —repites.\n—Eso. La luz y lo que hace la luz."),
  ("—Puka nomás —dice ella—. Todos quieren puka.", "—Lliwmi puka miskita munanku —dice ella—. Todos quieren el rojo."),
  ("—Arí. Puka munani.", "—Arí. Pukatam munani."))
c("Notas",
  ('yaya — "ay no" / roche / flojera', 'atataw — "ay no" / qué roche / qué vergüenza'),
  ("waska — ¿¿¿de acá sale??? preguntarle a amaru", "waska — ¿¿¿de acá sale??? preguntarle a amaru\nsinka — borracho (esto sí es quechua). sinkaña kachkanki = ya estás borracho"),
  ('kanchay — luz (doña nati)', 'akchi — luz / kanchay — alumbrar (doña nati)'))
c("Amaru 1",
  ('—Y contestas... —piensa—. Pichqa ura. Cinco horas. Aunque acá casi todos dicen "cinco y veinte" en castellano nomás.\n—Pichqa ura.\n',
   '—Y contestas... —piensa—. Pichqa uram iskay chunka muruchaqnin. Cinco horas, veinte minutos. Aunque acá casi todos dicen "cinco y veinte" en castellano nomás.\n'
   '—¿Muruchaqnin?\n—Los pedacitos de la hora. Los minutos. Y si quieres decir que es de tarde: kay pacha chisinkuypi.\n'
   '—Pichqa uram iskay chunka muruchaqnin... kay pacha chisinkuypi.\n—Muy bien. Nadie lo dice así de largo, pero muy bien.\n'))
c("Tío", ("—Ama, Yuli —dice el tío", "—Ama Yuli —dice el tío"), ("—Manam. Está bien.", "—Manaraqmi. Está bien."))
c("Fuga", ("—Kanchay —dices.", "—Akchi —dices."), ("—Kanchay —dice, sin que le preguntes.", "—Akchi —dice, sin que le preguntes."))
c("Mayu", ("—Acá le decimos Mayu —dice—. Río.", "—Mi abuelita le decía Mayu —dice—. Río."), ("—Yaya —dice Amaru al fin", "—Atataw —dice Amaru al fin"))
c("Echados",
  ("—Ya. —Te acomodas en el respaldo—. Upacha tú también.\n—Ese estuvo mal usado.\n—No me importa.\n—Está mal usado, Ariel.\n—No me importa.\n",
   "—Ya. —Te acomodas en el respaldo—. Upacha tú también.\n—Ese estuvo mal usado.\n—¿Por qué?\n—Porque no se dice \"tú también\". Se dice qam hina. Como tú.\n—Upacha, qam hina.\nAmaru se queda callado un segundo.\n—Ese sí.\n"),
  ("—Qullur —dice Amaru.", "—Quyllur —dice Amaru."),
  ("—Estrella. Qullur. —Levanta", "—Estrella. Quyllur. —Levanta"),
  ("\n—Qullur.\n", "\n—Quyllur.\n"),
  ("Hanaq es arriba.", "Hanaq es lo de arriba."))
c("Tema nombre", ("—Yaya —dice, al fin, muy bajito.", "—Atataw —dice, al fin, muy bajito."))
c("Tema sabatico", ("\n—Yaya.\n", "\n—Atataw.\n"))
c("Flor 1",
  ("—Y feo es millay. Pero millay es más fuerte, es como asqueroso, horrible. —Arruga la nariz—. No le digas millay a algo que solo está feíto. Eso es cruel.",
   "—Y feo es millay. Pero ojo, que millay ya es fuerte, ya es asco. Y si es horrible, asqueroso: millakuypaqmi. —Arruga la nariz—. No le digas eso a algo que solo está feíto. Eso es cruel."),
  ("—Millay es nivel máximo.\n—Millay es nivel máximo.", "—Millakuypaqmi es nivel máximo.\n—Millakuypaqmi es nivel máximo."))
c("Kaypi",
  ("Acá. Y chaypi es allá. —Lo mueve—. Kaypi, chaypi. Es lo que más", "Acá. Chaypi es ahí, y wakpi es allá. —Lo mueve—. Kaypi, chaypi, wakpi. Es lo que más"),
  ("—Kaypi. Chaypi.", "—Kaypi. Chaypi. Wakpi."),
  ("—Y si es más arriba: hanaq. Más abajo: uray. —Levanta y baja la mano—. Hanaqman, uraman.", "—Y si es más arriba: hanay. Más abajo: uray. —Levanta y baja la mano—. Hanayman, urayman."))

faltan = []
for n, pares in C.items():
    p = por[n]
    for a, b in pares:
        if a not in p[5]: faltan.append((n, a[:50])); continue
        p[5] = p[5].replace(a, b)
if faltan: sys.exit("no encontré: %r" % faltan)
quedan = [(p[1], w) for p in ps for w in ["Yaya", "yaya", "Kanchay", "Qullur", "qullur", "Imallanchik", "Hanaqman"] if w in p[5]]
print("quedan:", quedan)
esc = lambda x: html.escape(x, quote=True)
out = "".join(f'<tw-passagedata pid="{pid}" name="{esc(n)}" tags="{esc(t)}" position="{pos}" size="{sz}">{esc(b)}</tw-passagedata>' for pid, n, t, pos, sz, b in ps)
a = s.index("<tw-passagedata"); b = s.index("</tw-storydata>")
open(RUTA, "w", encoding="utf-8").write(s[:a] + out + s[b:])
print(len(ps), "pasajes")
