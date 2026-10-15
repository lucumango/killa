import re, html, sys
s = open(sys.argv[1], encoding="utf-8").read()
d = s[s.index("<tw-storydata"):s.index("</tw-storydata>")]
ps = [(int(p), html.unescape(n), t, html.unescape(b)) for p, n, t, b in
      re.findall(r'<tw-passagedata pid="(\d+)" name="([^"]*)" tags="([^"]*)"[^>]*>(.*?)</tw-passagedata>', d, re.S)]
byname = {n: (p, t, b) for p, n, t, b in ps}

# Orden de lectura: los pasajes originales en su orden, luego la escena 3 y 4 en orden de juego.
orden = [n for p, n, t, b in sorted(ps) if p <= 46 and "startup" not in t]
orden += sys.argv[3].split("|")
faltan = [n for p, n, t, b in ps if n not in orden and "startup" not in t]
assert not faltan, faltan

def cond(c):
    c = c.strip()
    reps = [
        (r'\$compras contains "(\w+)"', r'compró \1'),
        (r'\$temasUsados contains "(\w+)"', r'ya habló de \1'),
        (r'\$rutasJugadas contains "(\w+)"', r'ya jugó la ruta de \1'),
        (r'\(history:\) contains "([^"]+)"', r'pasó por «\1»'),
        (r"\(history:\)'s 2ndlast is \"([^\"]+)\"", r'viene de «\1»'),
        (r'\$(\w+) is not ""', r'\1 no está vacío'),
        (r'\$(\w+) is "([^"]*)"', r'\1 = "\2"'),
        (r'\$temas < 3', 'usó menos de 3 temas'),
        (r'\$dioRingPop', 'le dio el Ring Pop'),
        (r'\$pidioFoto', 'pidió la foto'),
        (r'\$confesoBeca', 'contó lo de las becas'),
        (r'\$bromeoProfesor', 'le dijo "profesor" a Amaru'),
        (r'\$usoHaykataq', 'usó haykataq'),
        (r'\$yapita', 'pidió yapita'),
        (r'\$mintio', 'mintió'),
        (r'\$(\w+)', r'\1'),
        (r' is true', ''), (r'(\w+) is false', r'no \1'),
        (r'\bnot\b', 'no'), (r'\band\b', 'y'), (r'\bor\b', 'o'),
        (r"rutasJugadas's length < 2", 'todavía falta una ruta'),
        (r"compras's length > 1", 'lleva más de una cosa'),
        (r'visits is 1', 'es la primera vez'),
    ]
    for a, b in reps: c = re.sub(a, b, c)
    return c

def limpiar(x):
    # quitar (set: ...) con paréntesis anidados
    out, i = "", 0
    while i < len(x):
        if x.startswith("(set:", i):
            depth = 0
            while i < len(x):
                if x[i] == "(": depth += 1
                elif x[i] == ")":
                    depth -= 1
                    if depth == 0: i += 1; break
                i += 1
            continue
        out += x[i]; i += 1
    x = out
    x = re.sub(r'\[\[([^\]]*?)->([^\]]+?)\]\]', lambda m: f'{m[1]}   → {m[2]}', x)
    x = re.sub(r'\[\[([^\]]+?)\]\]', lambda m: f'{m[1]}   → {m[1]}', x)
    x = re.sub(r'\(link-goto: "([^"]*)", "([^"]*)"\)', lambda m: f'{m[1]}   → {m[2]}', x)
    x = re.sub(r'\(else-if: (.*?)\)\[', lambda m: f'[SI NO, SI {cond(m[1])}: ', x)
    x = re.sub(r'\(else:\)\[', '[SI NO: ', x)
    x = re.sub(r'\(unless: (.*?)\)\[', lambda m: f'[SI NO ({cond(m[1])}): ', x)
    x = re.sub(r'\(if: (.*?)\)\[', lambda m: f'[SI {cond(m[1])}: ', x)
    x = x.replace("''", "").replace("//", "")
    x = re.sub(r'</?div[^>]*>|<br>', '', x)
    x = re.sub(r'\n{3,}', '\n\n', x)
    return x.strip()

especiales = {
    "Kiosko Nati": None,  # se arma aparte
    "Cuenta Nati": None,
}
sys.path.insert(0, ".")
from p_kiosko import PRODUCTOS

res = ["KILLA — texto completo", "=" * 60,
       "Cada bloque es un pasaje de Twine. Las opciones se marcan con → y el pasaje al que llevan.",
       "Las partes que dependen de lo que hizo el jugador van entre corchetes: [SI ...: texto] [SI NO: texto].", ""]
for n in orden:
    p, t, b = byname[n]
    res.append("")
    res.append("#" * 60)
    res.append(f"# {n}")
    res.append("#" * 60)
    res.append("")
    if n == "Kiosko Nati":
        body = ["KIOSKO — Doña Nati",
                "La señora deja el tejido. La luz dorada entra por la reja. Detrás de ti, alguien pide yapa.", "",
                "(Menú de compras: cada producto desaparece si ya lo compraste o si no te alcanza la plata. Empiezas con S/ 25.00 después de las pilas.)", ""]
        for clave, nombre, precio, texto in PRODUCTOS:
            body += [f"{nombre} — S/ {precio:.2f}", texto, ""]
        body += ["Pilas AA — Para el futuro. (ya en el mostrador)", "",
                 "En el mostrador: [lo que llevas]. Te queda: S/ [lo que queda].",
                 "(Lo que te yapeó tu mamá, menos los 22.50 de la ferretería, más lo que ya tenías. Las pilas ya están contadas.)", "",
                 "Doña Nati espera. Sabe exactamente cuánto tiempo tarda un chico de dieciocho años en decidir. Ya volvió a su tejido.",
                 "Y cuando pongas todo sobre el mostrador, ya sabes qué preguntar.", "",
                 "Ya está. Poner todo en el mostrador.   → Pago Nati"]
        res.append("\n".join(body))
        continue
    if n == "Cuenta Nati":
        b = re.sub(r'^.*?—A ver\.\.\. —Cuenta con el dedo—\. .*?\n—.*?—repites\.',
                   '—A ver... —Cuenta con el dedo—. [cuenta en quechua cuántas cosas llevas: Huk. Una cosita. / Iskay. Dos cositas. / ... / Chunka. Diez cositas.]\n—[el número] —repites.',
                   b, flags=re.S)
    res.append(limpiar(b))
open(sys.argv[2], "w", encoding="utf-8").write("\n".join(res) + "\n")
print(len(orden), "pasajes")
