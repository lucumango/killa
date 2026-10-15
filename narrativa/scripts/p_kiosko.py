# Pasajes: Checkpoint (hub), calle, kiosko de doña Nati.
P = []
def add(name, tags, pos, text):
    P.append((name, tags, pos, text.strip('\n') + '\n'))

# ---------------------------------------------------------------- Checkpoint
add("Checkpoint", "2M2", (4000, 3450), """
(if: visits is 1)[✦ PUNTO DE GUARDADO ✦

Te levantas de la mesa con esa pesadez feliz del que comió demasiado, y como nadie te dice nada, das una vuelta.](else:)[Vuelves al centro del patio. Nadie te está vigilando. Todos están en lo suyo.]

¿A dónde vas?
* [[El patio-sala->Patio sala]]
* [[La mesa de Amaru->Mesa de Amaru]]
* [[Puku->Jaula de Puku]]
* [[La cocina->Cocina]]
* [[Salir al kiosko]]
""")

add("Patio sala", "2M2", (4150, 3450), """
La regleta con los cuatro celulares sigue ahí, cargando en fila como pajaritos en un cable. La laptop tiene el Excel abierto — te acercas sin querer y ves que dice INGRESOS OCTUBRE y te alejas rápido porque eso claramente no es tuyo. En la pared hay un calendario del año pasado que nadie cambió, con la foto de una laguna. Al lado, colgadas de un clavo, unas llaves con un llavero de la Virgen.

* [[Volver->Checkpoint]]
""")

add("Mesa de Amaru", "2M2", (4300, 3450), """
El cautín, el estaño, el multímetro amarillo, los tornillos clasificados por tamaño en una tapa de mantequilla. Hay también un cuaderno cuadriculado con diagramas dibujados a mano, ordenadísimos, con la letra chiquita. Lo miras sin tocarlo.

* [[Volver->Checkpoint]]
""")

add("Jaula de Puku", "2M2", (4450, 3450), """
Te acercas a la jaula. El loro te mira con un ojo, se mueve dos pasos por su palito y se acerca a los barrotes.
—¡Loro! —dice, más bajito que antes. Casi confidencial.
—Ya sé que eres loro.
—¡Loro!
—Ya sé.

* [[Volver->Checkpoint]]
""")

add("Cocina", "2M2", (4600, 3450), """
Asomas la cabeza y la mamá te ve inmediatamente.
—¿Quieres más?
—No, no, gracias, estoy lleno—
—¿Seguro?
—Sí.
—¿Segurísimo?
—...Un poquito más.
Sales de la cocina con un plato pequeño de mazamorra que no pediste.

* [[Volver->Checkpoint]]
""")

add("Salir al kiosko", "3M1", (4750, 3450), """
—Voy al kiosko —dices—. ¿Quieren algo?
—¡Pilas! —dice Flor inmediatamente.
—No necesitas pilas —dice Amaru.
—¡Necesito pilas!
—¿Para qué?
—Para el futuro.
Amaru se queda mirándola tres segundos enteros.
—Ya —dice al fin—. Tráele pilas para el futuro.
—¡Gracias!
—Que no sabemos de qué tamaño.
—¡AA!
—No sabes eso.
—¡Todas las pilas son AA!
Y ahí Amaru se voltea hacia ti, muy serio, y dice:
—Anota esto. Es importante. —Pausa—. Mi hermana cree que todas las pilas son AA.
—Anotado.
—Que conste que yo lo dije delante de testigos.
—¡AMARU!
—Es a la vuelta —te dice él, ignorándola completamente—. La esquina y a la derecha. No te pierdas.
—No me voy a perder.
(if: $rutaInicial is "B")[—Eso dijiste la vez pasada.
—La vez pasada no lo había dicho todavía.](else:)[—Eso dicen todos los que se pierden.
—Los que se pierden no dicen nada. Por eso se pierden.
Amaru se queda quieto. Procesa. Y asiente lentamente, con genuino respeto técnico.
—Correcto.]

Sales al pasaje. Ya son como las cinco y la luz está bajando de blanco a dorado, y todo se ve mejor: las paredes, el polvo, la ropa tendida.
En la esquina, tres señores están sentados en unos cajones de cerveza al lado de una puerta abierta, con vasos, riéndose de algo con muchísimas ganas. Uno le da una palmada al otro en la espalda y se ríen más fuerte. Al pasar los escuchas:
—...ay compadre, ya estás waska pues...
—¡No estoy waska!
—¡Estás waska!
Te sigues de largo, y a los diez pasos te frenas.
//Waska.//
Tú has dicho esa palabra toda tu vida. En Lima. En fiestas. "Estaba waska." Nunca en tu vida se te ocurrió preguntarte de dónde salía.
Sigues caminando con una sensación rara en el pecho.
Media cuadra después, una puerta de zaguán con un letrero de cartón escrito con plumón grueso:
VENDO CHUQLLU SANCOCHADO HABAS TAMBIÉN
En la vereda del frente, una chica que tendrá veintipico camina rápido cargando bolsas y detrás de ella va una niña de tres años que se distrae con absolutamente todo.
—¡Wawa! —dice la chica sin voltear—. ¡Wawa, camina!
La niña no camina. La niña está viendo una hormiga.
—¡Wawa!
Y en un pasaje lateral, hay una profesora joven con un chaleco de institución y como ocho niños de cinco años haciendo una ronda. Está aplaudiendo con ritmo y ellos gritan las respuestas.
—¡Imallanchik!
—¡ASÁ! —gritan los niños.
—¡Haykallanchik!
—¡ASÁ!
—¡Kusa! —dice ella—. ¡Otra vez! ¡Más fuerte!
Te quedas parado mirando eso como treinta segundos, sin darte cuenta, hasta que una señora tiene que rodearte para pasar.

* [[Continuar.->Bodega]]
""")

# ---------------------------------------------------------------- Bodega
add("Bodega", "3M1", (4000, 3575), """
(set: $compras to (a: "pilas"))(set: $plata to it - 5)No te pierdes. Casi.
El kiosko de esta zona es distinto al de la plaza: más chiquito, medio metido en la sala de una casa, con una ventanita enrejada y una señora que teje sentada adentro.
Adelante tuyo hay un señor comprando pan. La señora le cuenta las monedas y le pone los panes en una bolsa, y él, antes de irse, apoya la mano en la reja:
—Señora... yapita pues.
La señora suspira con toda la paciencia acumulada del oficio, mete la mano en la canasta y le echa un pan más.
—Ya pues, don Feli.
—Sulpayki, señorita.
—No soy señorita.
—Para mí sí.
Y se va contentísimo.
Ahora te toca a ti. La señora deja el tejido y te mira por encima de los lentes.
—¿Qué te doy?
Y ahí, con la luz dorada entrando por la reja y el corazón medio acelerado, decides usar lo que tienes.
Señalas el estante con las pilas.
—Pilas AA, por favor. Y...

* [[Mirar lo que hay->Kiosko Nati]]
""")

# El menú se recarga a sí mismo con cada compra. Un producto desaparece si ya
# lo compraste o si no te alcanza.
PRODUCTOS = [
    ("chocolate", "Sublime / Princesa", 2.0, "Como agua para chocolate. Si te lo comes con suficiente sentimiento, alguien a tres cuadras se pone a llorar sin saber por qué. Riesgo bajo. Recompensa emocional alta."),
    ("mandarinas", "Mandarinas (bolsa de 6)", 5.0, "Puku no come galleta. Nadie dijo nada sobre mandarinas. Nadie ha dicho nada sobre mandarinas. Puku ha estado esperando esta laguna legal toda su vida."),
    ("libretita", "Libretita de tapa dura", 3.5, "Para quienes parten llevando consigo las palabras que algún día esperan volver a pronunciar."),
    ("galletas", "Galletas surtidas", 1.5, "NO PARA PUKU. Para ti. Para ti nomás. Mira a Puku. Mira a Puku a los ojos y dile que no son para él."),
    ("gaseosa", "Gaseosa zero azúcar", 3.0, "Si es cero azúcar, ¿entonces qué tiene? ¿Y por qué es dulce? ¿De dónde sale lo dulce? Doña Nati no lo sabe. Doña Nati vende, no explica."),
    ("ringpop", "Ring Pop", 2.5, "Es un anillo. Es un anillo comestible. Nadie te está obligando a nada. Pero es un anillo. Y hay dos hermanos en esa casa. Y solo hay un Ring Pop."),
    ("cinta", "Cinta adhesiva / de embalar", 4.0, "Tienes un buen presentimiento sobre esto. Are you feeling lucky? No sabes para qué la vas a necesitar. La vas a necesitar."),
    ("plumon", "Plumón indeleble + lapicero", 3.0, "Indeleble significa que si te equivocas, te equivocaste para siempre. Como los tatuajes. Como los nombres. Como llamarse Jorge tres generaciones seguidas."),
    ("panuelos", "Pañuelos de papel", 1.0, "El artículo más aburrido del kiosko. Nadie compra pañuelos pensando en el momento en que los va a necesitar. Ese es justamente el punto de los pañuelos."),
    ("cable", "Cable de carga / adaptador", 8.0, "Cuatro celulares cargando en una sola regleta. Alguien en esa casa está sufriendo en silencio. Podrías ser el héroe. Podrías ser el que trajo el quinto puerto."),
    ("linterna", "Linterna chiquita", 6.0, "Todavía hay sol. Va a haber sol como una hora más. Después ya no."),
    ("frugele", "Frugele rojo", 0.5, "Tus favoritos. Siempre el rojo. Nunca discutas con alguien que prefiere el verde, esa gente no razona. (El envoltorio es de celofán. Rojo. Translúcido. Sin ninguna razón en particular.)"),
]

def precio(p):
    return f"{p:.2f}"

def num(p):
    return f"{p:g}"

bloques = []
for clave, nombre, p, texto in PRODUCTOS:
    bloques.append(
        f'(unless: $compras contains "{clave}")[(if: $plata >= {num(p)})['
        f'(link: "{nombre} — S/ {precio(p)}")[(set: $compras to it + (a: "{clave}"))'
        f'(set: $plata to it - {num(p)})(go-to: "Kiosko Nati")]\n//{texto}//\n\n]]'
    )

nombres = ", ".join(f'"{c}", "{n}"' for c, n, _, _ in PRODUCTOS)

add("Kiosko Nati", "3M1", (4150, 3575), """
''KIOSKO — Doña Nati''
La señora deja el tejido. La luz dorada entra por la reja. Detrás de ti, alguien pide yapa.

""" + "".join(bloques) + """(set: _nom to (dm: "pilas", "Pilas AA", """ + nombres + """))(set: _bolsa to (a:))(for: each _c, ...$compras)[(set: _bolsa to it + (a: _nom's (_c)))]
Pilas AA — //Para el futuro.// (ya en el mostrador)

En el mostrador: (print: (joined: ", ", ..._bolsa)).
Te queda: S/ (print: (floor: $plata)).(if: $plata is (floor: $plata))[00](else:)[50]
//(Lo que te yapeó tu mamá, menos los 22.50 de la ferretería, más lo que ya tenías. Las pilas ya están contadas.)//

Doña Nati espera. Sabe exactamente cuánto tiempo tarda un chico de dieciocho años en decidir. Ya volvió a su tejido.
Y cuando pongas todo sobre el mostrador, ya sabes qué preguntar.

* [[Ya está. Poner todo en el mostrador.->Pago Nati]]
""")

add("Pago Nati", "3M1", (4300, 3575), """
Pones todo sobre el mostrador. Doña Nati deja el tejido, mueve las cosas con un dedo mientras cuenta(unless: $compras's length > 1)[ —que es una sola cosa, pero igual la cuenta—].

¿Cómo preguntas?
* [[¿Hayk'ataq?->Pago hayk'ataq]]
* [[¿Cuánto es?->Pago cuánto]]
""")

add("Pago hayk'ataq", "3M1", (4450, 3575), """
(set: $usoHaykataq to true)Y ahí lo dices, con la boca un poquito seca:
—¿Hayk'ataq?
Ella levanta la vista. No se sorprende como el señor Hilario. Solo hace un ruidito con la garganta, aprobatorio, como quien reconoce a alguien que hizo la tarea.

* [[Continuar.->Cuenta Nati]]
""")

add("Pago cuánto", "3M1", (4600, 3575), """
—¿Cuánto es?
—Hayk'ataq, se dice —te corrige, sin levantar la vista—. Ya estás acá. Pregunta bien.
—...¿Hayk'ataq?
—Ahí está.

* [[Continuar.->Cuenta Nati]]
""")

add("Cuenta Nati", "3M1", (4750, 3575), """
(set: _n to $compras's length)(set: _qu to (a: "Huk", "Iskay", "Kimsa", "Tawa", "Pichqa", "Suqta", "Qanchis", "Pusaq", "Isqun", "Chunka"))(set: _es to (a: "Una cosita", "Dos cositas", "Tres cositas", "Cuatro cositas", "Cinco cositas", "Seis cositas", "Siete cositas", "Ocho cositas", "Nueve cositas", "Diez cositas"))<!-- REVISAR con Victoria: isqun (9) y achka (muchos). -->—A ver... —Cuenta con el dedo—. (if: _n <= 10)[(print: _qu's (_n)). (print: _es's (_n)).](else:)[Achka. Un montón de cositas.]
—(if: _n <= 10)[(print: _qu's (_n))](else:)[Achka] —repites.
—Ajá. —Y te dice el total.
(if: $compras contains "linterna")[
—¿Y para qué quieres linterna? —dice, alcanzándola—. Todavía hay sol.
—Por si acaso.
—Mmm. —La pone sobre el mostrador—. K'anchay, le decimos. Bueno, k'anchay es la luz. La linterna es la linterna. —Se encoge de hombros—. Ya nadie le dice de otra forma.
—K'anchay —repites.
—Eso. Luz, brillo, alumbrar. Todo junto. —Y agrega, sin darle importancia—: A las siete ya está oscuro acá. Bien oscuro. No como en Lima que hay poste en cada esquina.
](if: $compras contains "frugele")[
—El rojo siempre —dice, viendo cuál sacaste del frasco.
—Es el mejor.
—Mi nieto igual. Solo el rojo. Los otros se quedan ahí meses. —Levanta el frasco y lo sacude—. Mira, puros verdes. Nadie quiere el verde.
—Nadie quiere el verde.
—Puka nomás —dice ella—. Todos quieren puka.
Y tú, sin pensarlo, contestas:
—Arí. Puka munani.
Doña Nati suelta una risa corta.
—Ay. Ya aprendiste lo importante.
](if: $compras contains "mandarinas")[
—Están dulces esas. Recién traídas.
—¿De acá?
—Del valle. Acá no crecen. —Y mientras las mete a la bolsa—: Miski están. Bien miski.
Te ríes solo, y ella te mira.
—¿Qué?
—Nada. Conozco a alguien que se llama así.
](if: $compras contains "libretita")[
Ella la mira. Después te mira a ti.
—¿Para el colegio?
—No, ya salí. Es para... —dudas— para anotar palabras.
—Ah. —Asiente despacio, sin preguntar cuáles—. Ya.
Y le pasa la mano por la tapa antes de dártela, como quitándole un polvo que no tiene.
](if: $compras contains "ringpop")[
Doña Nati lo agarra. Lo levanta a la altura de sus ojos. Lo hace girar.
Y después te mira por encima de los lentes con una expresión que te congela en el sitio.
—¿Y esto para quién es?
—Es... para mí. Es un caramelo.
—Mjm. —No lo suelta—. Es un caramelo.
—Es un caramelo.
—En mi época también eran caramelos —dice, asintiendo con muchísima seriedad—, y así se casó mi hermana.
—Señora—
—Yo solo digo lo que pasó.
Lo pone en la bolsa. Pero antes de soltar la bolsa, la sujeta un segundo más y agrega:
—¿Es para uno de los Quispe?
—¡No!
—Ah, ya sabía que estabas donde los Quispe. —Sonríe con todos los dientes—. Toda la calle sabe. Pasaste por acá con los dos hace media hora.
—No es para nadie.
—Arí, arí. —Te suelta la bolsa—. Imamanta.
]
* [[Pagar.->Cierre Nati]]
* [[—Señora... yapita pues.->Yapita Nati]]
""")

add("Yapita Nati", "3M1", (4900, 3575), """
(set: $yapita to true)—Señora... yapita pues.
Doña Nati se queda quieta con las agujas en el aire.
—¿Tú también?
Suspira, mete la mano en el frasco y te echa un Frugele en la bolsa. Verde.
—Para que aprendas —dice.

* [[Pagar.->Cierre Nati]]
""")

add("Cierre Nati", "3M1", (5050, 3575), """
Le yapeas. Suena el sonidito. (if: $compras contains "ringpop")[Ella mete lo que falta en la bolsa de plástico transparente y te la empuja.
—Sulpayki —dices.
Sales del kiosko con la cara ardiendo y un anillo de caramelo en una bolsa transparente que se ve desde la calle.](else:)[Ella mete todo en una bolsa de plástico transparente y te la empuja.
—Sulpayki —dices.
—Imamanta, wawqiy. —Y vuelve al tejido.
Sales sin saber qué significa //wawqiy//. Lo anotas para preguntar después.]<!-- REVISAR: wawqiy lo dice un hombre a otro hombre; dicho por una señora suena raro. Confirmar con Victoria. -->

* [[Continuar.->Notas]]
""")
