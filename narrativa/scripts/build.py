import html, re, sys, importlib.util, os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC, OUT = sys.argv[1], sys.argv[2]

def load(name):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, name + ".py"))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    return m.P

s = open(SRC, encoding="utf-8").read()
pat = re.compile(r'<tw-passagedata pid="(\d+)" name="([^"]*)" tags="([^"]*)" position="([^"]*)" size="([^"]*)">(.*?)</tw-passagedata>', re.S)
old = [(int(p), html.unescape(n), t, pos, sz, html.unescape(b)) for p, n, t, pos, sz, b in pat.findall(s)]

nuevos0 = load("p_kiosko") + load("p_vuelta") + load("p_amaru") + load("p_parque") + load("p_flor")
nuevos = [(n, "", p, re.sub(r"<!--.*?-->", "", x, flags=re.S)) for n, t, p, x in nuevos0]

PISTAS = [
    ("2M2", "Huayno en el patio. La misma pista de la guía sonora; sale del parlante."),
    ("3M1", "La calle a las cinco y el kiosko de doña Nati. Luz dorada, barrio, comedia chiquita. Música de Ariel liviana, charango suelto."),
    ("3M2", "Celular: notas y mensajes al grupo. Timbre de Lima, sinte suave, notificaciones."),
    ("3M3", "Vuelta a la casa. Los parlantes están desarmados, así que no hay huayno: cocina, voces y el zzzt del parlante. Se elige ruta."),
    ("3M4", "Amaru y el cable. El patio en silencio después de que Flor se va. Guitarra grave, zumbido eléctrico, comedia seca."),
    ("3M5", "La madrina. Caminata al atardecer, paredes anaranjadas, roche."),
    ("3M6", "La casa del tío y Yuli. Quechua sin traducir, caos familiar; al salir, el cielo morado."),
    ("3M7", "La fuga. La casa llena, sesenta segundos, bajar a una oscuridad sin postes, la subida."),
    ("3M8", "El parque: el Mayu, Júpiter, «quiero ser astrónomo», echados en el cemento. Tema de Amaru con el tema Killa. Mucho aire."),
    ("3M9", "El Ring Pop. Variación en comedia del tema del parque: roche y silencio incómodo."),
    ("3M10", "«¿Vienes mucho acá?»: el monólogo de Amaru. Ariel se duerme en su hombro. Casi nada; una guitarra sola."),
    ("3M11", "Despertar y las llamadas de mamá. Corte brusco, apuro, comedia."),
    ("3M12", "La casa de noche. Fiesta real con el parlante nuevo; la mamá riéndose en quechua. Tema de Rosa."),
    ("4M1", "Flor: la tienda de mates y el video. Tema de Flor (charango, tinya, palmas), apurado porque se va la luz."),
    ("4M2", "La azotea al atardecer. Toda la ciudad anaranjada. Aire, sin percusión."),
    ("4M3", "La confesión y «no quiero irme». Íntimo, se va poniendo morado y después azul."),
    ("4M4", "Killa: la uña de luna. Primer lugar donde entra el tema Killa completo en esta ruta (quena)."),
    ("4M5", "El celular vibra: el menú de la azotea y lo que Ariel elige decir. Tierno; el vibrar del celular por encima."),
    ("4M6", "La llamada y el patio. Comedia de familia: el otro cable. Suena el parlante bluetooth de siempre."),
    ("F1", "Final: «Pisillata». Tema de Rosa que se abre al tema Killa."),
    ("F2", "Ilustraciones: los tres en el parque (la noche siguiente) y el carro de vuelta. Tema Killa."),
    ("F3", "Créditos. Tema Killa desnudo, quena y arpa."),
]

extra = []
extra = [(n, t, p, x.strip("\n") + "\n") for n, t, p, x in extra]

# Pasajes viejos que se reemplazan (mismo pid si el nombre sigue existiendo).
reemplazados = {"Checkpoint": "Checkpoint", "Bodega (pending)": "Bodega", "Vuelta (pending)": "Notas", "Choice": "Choice"}

by_new = {n: (n, t, p, x) for n, t, p, x in nuevos + extra}
assert len(by_new) == len(nuevos) + len(extra), "nombres repetidos"

out = []
usados = set()
for pid, name, tags, pos, sz, body in old:
    if name in reemplazados:
        nn = reemplazados[name]
        n, t, p, x = by_new[nn]; usados.add(nn)
        out.append((pid, n, t, p, x))
        continue
    if name == "Variables":
        body = body.replace("(set: $dinero to 0)", "(set: $plata to 30)")
        body = body.replace("(set: $confesoBecas to false)\n", "")
        body = body.rstrip("\n") + "\n\n" + "\n".join([
            '(set: $mensajeEnviado to "")',
            '(set: $ruta to "")',
            '(set: $temas to 0)',
            '(set: $dioRingPop to false)',
            '(set: $pidioFoto to false)',
            '(set: $durmioEnHombro to false)',
            '(set: $temasUsados to (a:))',
            '(set: $fondoElegido to "")',
            '(set: $temaAzotea to "")',
            '(set: $rutasJugadas to (a:))',
        ]) + "\n"
    px, py = pos.split(",")
    out.append((pid, name, tags, (int(float(px)), int(float(py))), body))

pid = max(p for p, *_ in old)
for n, t, p, x in nuevos + extra:
    if n in usados:
        continue
    pid += 1
    out.append((pid, n, t, p, x))

names = {n for _, n, *_ in out}
# Revisar que todos los links apunten a pasajes que existen.
malos = []
for _, n, _, _, x in out:
    for m in re.findall(r'\[\[(?:[^\]]*?->)?([^\]]+?)\]\]', x):
        if m not in names: malos.append((n, m))
    for m in re.findall(r'\((?:link-goto|go-to):\s*(?:"[^"]*",\s*)?"([^"]+)"\)', x):
        if m not in names: malos.append((n, m))
    for m in re.findall(r'contains "(Tema [^"]+|Pisillata)"', x):
        if m not in names: malos.append((n, m))
if malos:
    sys.exit("links rotos: %r" % malos)

def esc(x):
    return html.escape(x, quote=True)

pasajes = "".join(
    f'<tw-passagedata pid="{p}" name="{esc(n)}" tags="{esc(t)}" position="{pos[0]},{pos[1]}" size="100,100">{esc(x)}</tw-passagedata>'
    for p, n, t, pos, x in out
)

a = s.index("<tw-passagedata"); b = s.index("</tw-storydata>")
s = s[:a] + pasajes + s[b:]

open(OUT, "w", encoding="utf-8").write(s)
print(len(out), "pasajes;", len(out) - len(old), "nuevos")
