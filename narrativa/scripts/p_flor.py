# Pasajes: elección de ruta, ruta de Flor, final canónico.
P = []
def add(name, tags, pos, text):
    P.append((name, tags, pos, text.strip('\n') + '\n'))

add("Choice", "3M3", (4000, 3950), """
✦ Elige ruta ✦

(unless: $rutasJugadas contains "flor")[• [[FLOR->Flor 1]] — Tiene que grabar un video corto. Práctica para un emprendimiento, algo que quiere subir antes de que empiecen las clases. Necesita a alguien con ojo para escoger tomas y fondos.
](unless: $rutasJugadas contains "amaru")[• [[AMARU->Amaru 1]] — Le pidieron dejar listos los parlantes para el cumpleaños de la tía. Algo va a fallar, obviamente.
]
//(Podrás conocer al otro después. Pero el orden importa.)//
""")

# ---------------------------------------------------------------- Flor 1
add("Flor 1", "4M1", (4000, 4500), """
(set: $ruta to "flor")(set: $fondoElegido to "")(set: $temaAzotea to "")(set: $pidioFoto to false)(set: $dioRingPop to false)Le pasas las pilas a Flor.
—¡AY! —Las agarra con las dos manos como si fueran un premio—. ¡Gracias!
—Para el futuro.
—Para el futuro —repite, solemnísima, y se las mete al bolsillo de la casaca.
Y después se cuelga la bolsa de tela y mira el cielo con desesperación.
—Ya. Vamos corriendo. La luz se me va.
—¿Segura no prefieres que me quede con el amargado?
—¡NO! —Ya te está agarrando del brazo—. ¡Ya elegiste! ¡Yo tengo hora! ¡Él tiene todo el día!
—Yo también tengo hora —dice Amaru desde el piso, sin levantar la vista del cable—. Mi papá llega a las siete.
—Tu papá siempre llega tarde.
—Ese es un dato peligroso de asumir.
—¡Tupananchikkama! —grita Flor, arrastrándote hacia la puerta.
—¿Qué es eso? —preguntas.
—¡Hasta luego! ¡Literal "hasta que nos volvamos a encontrar"! ¡Haku, haku! ¡Es "vamos"! ¡CAMINA!

Es una casa con la sala convertida en tienda. Hay una vitrina de vidrio con mates burilados de todos los tamaños, unos chiquitos como huevos y otros gigantes como pelotas de fútbol, todos con dibujos rayados a mano: fiestas, cosechas, animales.
La mamá de su amiga los recibe, les da un vaso de emoliente que nadie pidió, y desaparece.
—Ya —dice Flor, sacando el celular y un trípode que es una barra de plástico y nada más—. El plan es este.
—Ya.
—Necesito un video de treinta segundos. Vertical. Que se vea bonito y que no parezca hecho por alguien que no sabe. —Pausa—. Que es exactamente lo que soy.
—No parece.
—Parece muchísimo.
Levanta un mate mediano, con una escena de una feria tallada alrededor.
—Mira esto. ¿No es precioso?
—Sí.
—Sumaq —dice ella—. Bonito, lindo, precioso. Todo eso junto.
—Sumaq.
—Y feo es millay. Pero millay es más fuerte, es como asqueroso, horrible. —Arruga la nariz—. No le digas millay a algo que solo está feíto. Eso es cruel.
—Millay es nivel máximo.
—Millay es nivel máximo.
Flor pone el mate sobre tres superficies distintas y te mira.
—Ya. Tú tienes ojos frescos. ¿Cuál?
—¿Cuál? —insiste—. Rápido, se me va la luz.

¿Dónde lo pones?
• [[La mesa de madera oscura, adentro.->Fondo mesa]] //El mate resalta pero la luz es amarilla y plana.//
• [[El poyo de cemento del patio, al sol.->Fondo patio]] //La luz es preciosa pero el fondo es una pared con una mancha de humedad.//
• [[El alféizar de la ventana, a contraluz.->Fondo ventana]] //Se ve el cerro atrás, borroso. El mate queda medio oscuro.//
""")

for k, (clave, x) in enumerate([("mesa", 4150), ("patio", 4300), ("ventana", 4450)]):
    add(f"Fondo {clave}", "4M1", (x, 4500), f"""
(set: $fondoElegido to "{clave}")Señalas.

* [[Continuar.->Kaypi]]
""")

add("Kaypi", "4M1", (4600, 4500), """
Y ahí ella te enseña, sin darse cuenta de que está enseñando:
—Kaypi —dice, poniendo el mate donde señalaste—. Acá. Y chaypi es allá. —Lo mueve—. Kaypi, chaypi. Es lo que más vas a usar en tu vida, te juro.
—Kaypi. Chaypi.
—Y si es más arriba: hanaq. Más abajo: uray. —Levanta y baja la mano—. Hanaqman, uraman. Para arriba, para abajo.
—Suena a instrucciones de mudanza.
—¡ES QUE ES ESO! —Se ríe—. La gente cree que el quechua es todo poético. Y sí, hay cosas poéticas. Pero también es "sube eso", "bájalo", "ponlo allá".

Grabas tú. Ella sostiene el mate y lo va girando en la luz.
Y en un momento, entre toma y toma, dices:
—Está bonito.
Flor baja el mate.
—A ver, para. Esto te lo tengo que enseñar porque te va a servir.
—¿Qué cosa?
—Hay una escala. —Levanta la mano y va marcando escalones en el aire—. Nivel uno: describir. Puka kashan — está rojo. Eso no es nada, es un dato. Puedes decírselo a una pared.<!-- REVISAR: "kashan" es cusqueño; en chanka sería "pukam kachkan". -->
—Ya.
—Nivel dos: cumplido. Sumaq kashan — está bonito. Eso ya es una opinión. Se lo dices a una cosa, a una comida, a un mate. Y también a una persona, y no pasa nada.<!-- REVISAR: "sumaqmi kachkan". -->
—Ya.
—Nivel tres: piropo. —Baja la voz—. Sumaqmi kanki. Eres bonito. Ahí ya cambiaste el sujeto. Ya no es la cosa, es la persona.
—...Ya.
—Y nivel cuatro —dice, muy seria—: demasiado intenso.
—¿Cuál es el cuatro?
—Sunquy —dice—. Mi corazón. Sunqullay. Corazoncito mío.
—Eso suena bonito.
—Suena bonito y es nivel cuatro. —Te apunta con el dedo—. Eso se lo dices a alguien con quien llevas dos años. O a tu abuelita. No hay término medio. Si se lo dices a alguien que conociste hoy, esa persona va a llamar a su mamá.
—¿En serio?
—En serio. —Vuelve a levantar el mate—. Y lo peor es que en internet salen todos juntos, en la misma lista, sin decirte cuál es cuál. Por eso los turistas quedan mal.
Anotas mentalmente. Y en el celular.

Graban como veinte tomas. La mayoría malas.
—Otra vez.
—Ya salió bien esa.
—Salió movida.
—No salió movida.
—Ariel, salió movida.
—Ya. Otra vez.
(if: $fondoElegido is "ventana")[En la toma catorce ella pone el mate en el alféizar, con el cerro al fondo, y la luz le pega justo en el borde tallado y se ve el relieve entero.](else:)[En la toma trece ya está claro que tu fondo no funciona. (if: $fondoElegido is "mesa")[La luz amarilla hace que el mate parezca de plástico.](else:)[La mancha de humedad sale en todas las tomas, como un fantasma con mala actitud.]
—¿Y si probamos en la ventana? —dices.
Flor lo mueve al alféizar sin discutir. Y en la toma catorce, con el cerro al fondo, la luz le pega justo en el borde tallado y se ve el relieve entero.]
Los dos se quedan callados.
—Esa —dices.
—Esa.
—Esa.
—¡ESA! —Flor da un salto—. ¡AY, ESA! ¡Mira! ¡Mira cómo se ve la línea del cerro atrás!
—Se ve buenazo.
—¡Es que tú lo pusiste ahí! —Se voltea—. Yo lo tenía en la mesa como una tonta.
—Tú lo giraste bien.
—Los dos lo hicimos bien —decide, y lo dice como sentencia final.

* [[Continuar.->Qilli]]
""")

add("Qilli", "4M1", (4750, 4500), """
En la toma dieciocho a ella se le cae el mate.
No pasa nada, cae sobre la bolsa de tela. Pero los dos gritan.
—¡AY!
—¡AY!
Flor lo levanta, lo revisa, no tiene nada, y se lo abraza al pecho con los ojos cerrados.
—Casi mato el trabajo de un señor de setenta años.
—Casi.
—No le digas a nadie.
—Le voy a decir a todos.
—Ariel.
—Le voy a decir a Amaru.
—¡NO! —Se le va la voz—. ¡A Amaru menos! ¡Me lo va a sacar en cara hasta que me muera!
—Entonces págame.
Flor entrecierra los ojos.
—Ay, qilli —dice—. Ya saliste con eso.
—¿Qué?
—Qilli. Sucio, mugroso. —Sonríe de costado—. Pero como te lo estoy diciendo yo, es cariñoso. Es como decirte "ay, malo".
—Qilli —repites.
—Sin h. Ojo. Con h es de Cusco.
—¿Y acá no?
—Acá no. Acá es qilli, piña, mikuy. Sin toda esa cosa de la garganta. —Se encoge de hombros—. Cada valle tiene lo suyo.<!-- REVISAR: en la escena 2 (Tarde, Comida) Flor enseña "qhilli", "phiña" y "mikhuy". Cambiarlos a qilli / piña / mikuy. -->
Guarda el celular. Mira la luz, que ya está anaranjada de verdad.
—Ya. Tengo el video.
—¿Ya está?
—Ya está. Falta editarlo pero eso lo hago de noche. —Se cuelga la bolsa—. Oye.
—Ya.
—¿Subimos a la azotea de mi casa?
—¿Para qué?
—Para nada. —Se encoge de hombros—. Para revisar las fotos. Y porque desde ahí se ve toda la ciudad cuando se está poniendo el sol y es lo más bonito que hay, y tú te vas a ir en unos días y no lo has visto.
—Haku.
Flor se detiene con la bolsa a medio colgar.
—...Ay.
—¿Qué?
—Nada. —Se cuelga la bolsa del todo—. Que lo dijiste bien.
—¿En serio?
—En serio. Ni pensaste. —Empieza a caminar—. Eso es distinto.

* [[Haku.->Azotea]]
""")

# ---------------------------------------------------------------- Flor 2
add("Azotea", "4M2", (4900, 4500), """
Se sube por una escalera de cemento sin baranda, pegada a la pared del patio, con los escalones un poco altos. Puku los ve pasar y comenta.
—¡Loro!
—Ya, Puku.
—¡Loro!
—Ya, Puku.
Arriba no hay nada especial. Un tanque de agua negro. Ropa tendida. Las varillas de fierro saliendo del techo, esperando un tercer piso. Un colchón viejo enrollado contra una pared. Baldes.
Y después te das la vuelta.
—Uy.
—Ajá —dice Flor.
Porque desde acá se ve todo. Los techos de teja bajando en escalera, las paredes blancas puestas unas encima de otras, la torre de una iglesia asomando entre medio, y detrás los cerros enormes y pelados con el sol metiéndose justo detrás de uno de ellos.
Y todo está anaranjado. Las paredes, el polvo, la ropa tendida, tus manos.
—Ya sé —dice Flor, sentándose en el borde con las piernas colgando—. Grabo mil videos de mates y lo que debería grabar es esto.
—¿Y por qué no?
—Porque no se puede. —Da una palmadita al cemento a su lado para que te sientes—. Lo he intentado como cien veces. Sale una foto de una ciudad naranja. Y no es eso.
—¿Qué es?
—Es esto. —Hace un gesto que abarca todo—. Y esto no cabe en el celular.
Se sientan. Ella saca el celular y empieza a pasar las tomas.
—Mira esta. Movida.
—Movida.
—Esta también.
—Esa está bien.
—Está bien pero se ve mi dedo.
—Ah, cierto.
—Y esta... —se detiene— esta es la buena.
Se quedan mirando la toma catorce en la pantalla chiquita, con el mate en el alféizar y el cerro borroso atrás.
—Sí es la buena —dices.
—Es la buena.
Baja el celular a su falda.
Y se queda mirando el cerro real, el de verdad, el que está enfrente.
—Ariel.
—Ya.
—Te tengo que confesar algo.

* [[Continuar.->Confesión]]
""")

add("Confesión", "4M3", (5050, 4500), """
—Ay.
—No es grave. —Se ríe, nerviosa—. O sea, es grave para mí.
—Ya.
—Cuando te vimos hoy en la mañana. En la puerta. Con Puku. —Se acomoda—. Amaru y yo hablamos en quechua, ¿te acuerdas?
—Me acuerdo.
—Yo dije que eras gringo.
Silencio.
—Lo escuché —dices.
—¿ESCUCHASTE?
—Escuché la palabra. No entendí nada más, pero esa la entendí.
Flor se tapa la cara con las dos manos.
—Ay no.
—No pasa nada.
—Sí pasa. —Se destapa—. Y lo peor es que Amaru dijo que no. Dijo "no le veo cara de gringo". Y yo insistí. Yo dije "mírale los ojos".
—Ya.
—Y después me dijiste allillanchu y me quise morir.
Te ríes.
—No te rías, me quise morir de verdad.
—Está bien.
—No está bien. —Se abraza las rodillas—. Yo odio que me hagan eso a mí.
—¿Qué te hacen?
—Ya me está pasando. —Mira el cerro—. Fui a Lima en agosto para el examen. Cinco días. Y en cinco días me preguntaron como ocho veces de dónde era.<!-- REVISAR: confirmar el mes del examen (en la escena 2 dice que empieza en marzo). -->
—Bueno, eso lo preguntan siempre—
—No así. —Voltea—. No preguntan "¿de dónde eres?". Preguntan //"¿de dónde eres?"//. Con la cara. Y cuando dices Ayacucho hacen "aaah" y ya saben todo lo que necesitan saber de ti.
—...
—Una chica me dijo que hablaba bonito el español. —Se ríe sin gracia—. Bonito. Como sorprendida.
—Uf.
—Y yo me reí. Ese es el problema. Me reí y dije gracias. —Se encoge de hombros—. Porque qué vas a hacer.
Se quedan callados. Abajo, alguien está barriendo.
—Y entonces hoy te hice lo mismo a ti —dice—. En mi propia calle. A alguien que nació acá.
—No es lo mismo.
—Es lo mismo pero al revés.
—Sí. —Lo piensas—. Es lo mismo pero al revés.
—A ti te dicen gringo acá y a mí me van a decir serrana allá. —Levanta las cejas—. Y los dos somos de acá. Los dos. Y a los dos nos van a hacer explicar de dónde somos toda la vida.
El sol termina de meterse detrás del cerro. Todo se pone morado de golpe, como si alguien hubiera cambiado un filtro.
—Oye, pero yo te quería decir otra cosa —dice Flor.
—Ya.
—Lo de hoy. Lo del video. —Se acomoda para mirarte de frente—. Tú tienes buen ojo.
—Fue suerte.
—No fue suerte. (if: $fondoElegido is "ventana")[Yo tenía el mate en una mesa fea y tú dijiste ponlo en la ventana. Y era obvio cuando lo dijiste, pero yo no lo vi.](else:)[Tu primer fondo era horrible, ah. Pero cuando no funcionó, tú dijiste ponlo en la ventana. Y era obvio cuando lo dijiste, pero yo no lo vi.] —Pausa—. Eso no se aprende. O lo tienes o no lo tienes.
—Gracias.
—Sulpayki.
—Sulpayki.
—Imamanta. —Y después, ladeando la cabeza—: Y ojo que eso fue nivel dos.
—¿Qué cosa?
—El cumplido. Nivel dos de la escala. —Levanta un dedo—. No te emociones.
—No me estaba emocionando.
—Un poquito sí.
—Un poquito sí —admites.
Y los dos se ríen, y ella se pasa la mano por el pelo, y de pronto se queda callada y se le va la sonrisa, y mira otra vez los techos.
—Ariel.
—Ya.
—¿Te puedo decir algo que no le he dicho a nadie?

* [[—Sí.->No quiero irme]]
""")

add("No quiero irme", "4M3", (5200, 4500), """
Flor no habla al toque.
Se queda mirando los techos, que ya están grises, y se agarra las rodillas más fuerte.
—No quiero irme.
Silencio.
—...¿A Lima?
—A Lima. A la universidad. A nada. —Se le sale rápido, como quien se saca una venda—. No quiero irme.
—Pero ingresaste.
—Ingresé. Y estudié un año entero para ingresar, y lloré cuando salió la lista, y mi mamá lloró, y mi tía llamó a todo el mundo. —Traga—. Y todo eso fue verdad. Yo estaba feliz de verdad.
—Ya.
—Y como a la semana me desperté y pensé: en marzo ya no vivo acá.
Se le quiebra un poquito al final.
—Y desde ese día no se me quita.
No dices nada. Te parece que decir algo sería peor.
—Y no puedo decirlo —sigue—. ¿A quién? ¿A mi mamá, que anda contándole a las señoras del mercado? ¿A mi tía, que me dijo que soy la primera de la familia? —Se ríe sin ganas—. ¿A Amaru, que está pagándose una academia con lo que gana arreglando parlantes para poder postular a algo que ni sabe si quiere? ¿A él le voy a decir que no quiero mi vacante?
—...
—Se vería horrible. Se vería como una malcriada.
—No se vería así.
—Se vería exactamente así. —Se seca un ojo con la manga, rápido, como quien no quiere que se note—. Todos se mataron por esto. Yo me maté por esto. Y ahora resulta que la quiero devolver.
—¿Y por qué no quieres ir? —preguntas.
—Ese es el tema. —Levanta las manos—. Que no tengo una razón buena.
—A ver.
—No es que tenga miedo, o sea sí tengo miedo, pero no es eso. —Se muerde el labio—. Es que me gusta acá.
—Ya.
—Me gusta acá. Me gusta mi casa. Me gusta que Doña Nati sepa quién soy. Me gusta que el señor Hilario le baje el precio a mi mamá. Me gusta subir a esta azotea. Me gusta que mi tía venga de visita y cocinen para treinta. —Se le atropellan las palabras—. Me gusta el ruido de mi casa, y en Lima voy a estar en un cuarto alquilado en Pueblo Libre con dos personas que no conozco.
—...
—Y esa no es una razón. Esa es una tontería.
—No es una tontería.
—Es una tontería, Ariel. Nadie deja de estudiar por eso.
—No dije que dejaras de estudiar. Dije que no es una tontería.
Flor voltea a mirarte.
—Yo crecí sin eso —dices.
—¿Sin qué?
—Sin que nadie sepa quién soy. —Miras los techos—. En mi edificio no conozco a nadie. O sea sé sus caras, pero no sé sus nombres. Vivimos con mi mamá en el mismo sitio hace catorce años y no sé cómo se llama la señora del quinto.
—Ay.
—Y hoy llegué acá, y en seis horas Doña Nati sabía qué compré, tu tía sabía quién era mi mamá, y un señor de ferretería me dijo en la cara que tengo acento de Lima.
Flor se ríe. Con la nariz llena.
—Don Hilario.
—Don Hilario.
—Es terrible.
—Es terrible. —Pausa—. Y no sabes lo raro que se siente que alguien sepa quién eres.
Se quedan callados. Se está poniendo azul oscuro. Se prende una luz en una casa, y después otra.
(if: $confesoBeca)[—Ahí está la cosa —dice Flor—. Que tú te estás yendo a Estados Unidos, que es lejísimos, y estás aprendiendo quechua. Y yo me voy a Lima y en Lima voy a dejar de hablarlo.](else:)[—Oye. Tú también estás en sabático, ¿no? —dice Flor—. ¿Y después?
—Estoy postulando a Estados Unidos.
—¿A ESTADOS UNIDOS? —Se le olvida por un segundo que estaba llorando—. ¿Y recién me lo dices?
—No salió el tema.
—¡Siempre sale el tema! —Y después se le acomoda la cara—. Ahí está la cosa, entonces. Que tú te estás yendo a Estados Unidos, que es lejísimos, y estás aprendiendo quechua. Y yo me voy a Lima y en Lima voy a dejar de hablarlo.]
—¿Por qué?
—Porque con quién. —Se encoge de hombros—. Acá lo hablo con mi mamá, con mi tía, con mis primos, con la vecina. Allá... —hace un gesto vacío— con nadie.
—Con Amaru por teléfono.
—Amaru contesta con dos palabras.
—Es verdad.
—Es tan verdad.
—Oye, pero mira esto —dices, y se te ocurre a medio camino—. Es raro, ¿no?
—¿Qué cosa?
—Que yo lo esté aprendiendo justo cuando tú lo vas a dejar de usar.
Flor se queda quieta.
—Ay.
—¿Qué?
—Que eso está feo y bonito al mismo tiempo. —Se seca la cara con las dos manos—. Odio cuando pasa eso.

* [[Continuar.->Killa]]
""")

add("Killa", "4M4", (5350, 4500), """
Y entonces, sin pensarlo, levantas la barbilla hacia el cielo, justo encima del cerro donde se metió el sol, donde acaba de aparecer una uña de luna, finísima, bajita, siguiendo al sol.<!-- Luna de uno o dos días: se pone temprano, así que cuadra con "hoy no hay luna" de la ruta de Amaru. -->
—Oye. ¿Cómo se dice luna?
—Killa.
—Ah, como mes.
—Como mes. —Flor mira arriba—. Es la misma palabra.
—¿Y eso por qué?
—Porque el mes es la luna, pues. —Se encoge de hombros como si fuera lo más obvio del mundo—. Cuentas lunas y esos son tus meses. No es que se parezcan, es que es lo mismo.
Te quedas con eso.
—Entonces cada vez que dices el mes estás diciendo la luna.
—Ajá.
—Aunque no la veas.
Flor voltea despacio.
Y se queda mirándote un rato largo, con la cara medio destruida de haber llorado un poquito y medio iluminada de haber entendido algo.
—Ay, Ariel.
—¿Qué?
—Que allá no la voy a ver.
—...
—En Lima el cielo está tapado siempre. —Vuelve a mirar arriba—. Y voy a seguir contando los meses igual.
Y después, más bajo:
—Voy a seguir diciendo killa aunque no la vea.
Y ahí, en la azotea, con la ciudad prendiéndose abajo, tu celular empieza a vibrar.
Y vibra. Y vuelve a vibrar. Y no para.

* [[Continuar.->Menú azotea]]
""")

add("Menú azotea", "4M5", (5500, 4500), """
El celular sigue vibrando en tu bolsillo. Todavía no lo sacas.
Flor se está secando la cara con la manga, mirando hacia otro lado para que no la veas hacerlo.
Tienes unos segundos antes de contestar.

✦ ¿Qué haces? ✦

(if: $compras contains "ringpop")[• (link-goto: "«Espera. Tengo algo para ti.»", "Azotea ringpop")
//Es un caramelo. Está en la bolsa desde el kiosko. Doña Nati ya hizo el chiste y tú te moriste de vergüenza. Pero ahorita Flor acaba de llorar un poquito en su propia azotea y a lo mejor un anillo de caramelo es exactamente el nivel de tontería que se necesita.//
]• (link-goto: "«Miski.»", "Azotea miski")
//Solo su nombre. El que le puso su abuelita. Decirlo nomás, sin pedir nada.//
• (link-goto: "«Mándame el video cuando lo edites.»", "Azotea video")
//No dices nada de lo otro. Le das algo del futuro en vez de algo del momento. Es cobarde y es amable.//
• (link-goto: "«Puedes volver, ¿no?»", "Azotea volver")
//La pregunta práctica. Vacaciones, feriados, verano. Puede ser un alivio o puede sonar a que no la escuchaste.//
• (link-goto: "«Yo también estoy asustado.»", "Azotea asustado")
//Se la devuelves. Tú también te vas, más lejos, y solo. Nadie te ha preguntado hoy cómo te sientes al respecto.//
• (link-goto: "No decir nada. Solo quedarte ahí.", "Azotea silencio")
//A veces alguien que acaba de confesar algo no necesita respuesta. Necesita que no te vayas.//
• (link-goto: "Contestar el teléfono", "La llamada")
//Es tu mamá. Lleva cinco llamadas. Y el momento se va a cerrar solo.//
""")

CONTESTAR = "\n\n* [[Contestar.->La llamada]]\n"

add("Azotea ringpop", "4M5", (5350, 4625), """
(set: $temaAzotea to "ringpop")(set: $dioRingPop to true)—Espera. Tengo algo para ti.
—¿Ah?
Hurgas en la bolsa del kiosko. Y ahí, en la penumbra, tus dedos encuentran el plástico duro.
Lo sacas.
Flor se queda mirándolo dos segundos enteros. Y después suelta una carcajada tan fuerte que se le va la voz y tiene que agarrarse del borde de la azotea.
—¡AY! ¡AY, NO!
—Es un caramelo.
—¡YA SÉ QUE ES UN CARAMELO!
—Es literalmente el único formato en que los venden—
—¡ARIEL! —Se seca los ojos, que ahora están húmedos por otra razón—. ¡Ay, no puedo!
Se lo pasas. Ella lo agarra con las dos manos, se lo pone en el dedo por encima del guante imaginario, lo levanta a la luz de la casa de al lado y lo hace girar como en las películas.
—Ay, es hermoso.
—Es de fresa.
—Es hermoso.
Y después baja la mano y se queda mirándolo, todavía sonriendo, pero con los ojos otra vez brillantes.
—Nadie me ha regalado nada hoy —dice.
—Es un caramelo de dos cincuenta.
—Ya sé. —Se lo saca del dedo y lo aprieta en el puño—. Igual.
Silencio.
Y entonces se le prende algo en la cara.
—Espérate. —Se voltea—. ¿Esto lo compraste donde Doña Nati?
—...Sí.
—¿Y ella lo vio?
—...Sí.
Flor abre la boca y no sale nada durante como cuatro segundos.
—Ariel.
—¿Qué?
—Doña Nati es la madrina de Amaru.
—...No.
—Sí.
—No me digas.
—Para mañana lo sabe mi mamá. —Se lleva las manos a la cara—. Ay, y va a ser peor, porque mi mamá va a pensar que es para mí.
—Es para ti.
—¡YA SÉ QUE ES PARA MÍ! —Se ríe con las manos todavía en la cara—. ¡Pero mi mamá lo va a pensar como mamá! ¡Que es distinto!
Y sigue riéndose, y llorando un poquito, y apretando el Ring Pop en el puño, y no te lo devuelve.""" + CONTESTAR)

add("Azotea miski", "4M5", (5500, 4625), """
(set: $temaAzotea to "miski")—Miski.
Flor se queda quieta.
—...¿Qué?
—Nada. Solo quería decirlo.
—¿Por qué?
—Porque dijiste que ese sí te gusta.
Se le pone la cara rara. No sabes leerla al principio: como si estuviera decidiendo entre hacer un chiste o no hacerlo.
Y no lo hace.
—Nadie me dice así —dice.
—¿Nadie?
—Mi abuelita me decía. Ella me lo puso. —Se abraza las rodillas—. Después ya no. Mi mamá me dice Flor, mis primos me dicen Flor, en el colegio Flor. Amaru me dice Flor cuando está normal y María cuando está molesto.
—¿María?
—María es el peor. María es "estás en problemas". —Media sonrisa—. Nadie usa Miski.
—Yo lo voy a usar.
—Ay, no.
—¿Por qué no?
—Porque ahorita estoy sensible y me vas a hacer llorar otra vez. —Y se le rompe la voz justo en "otra vez", lo cual arruina completamente su argumento.
—Perdón.
—No te disculpes. —Se limpia con la manga—. Ay, ya. Dilo otra vez.
—¿Segura?
—Dilo.
—Miski.
—Ya. Ya está. —Se ríe con la nariz tapada—. Ya me arruinaste.""" + CONTESTAR)

add("Azotea video", "4M5", (5650, 4625), """
(set: $temaAzotea to "video")—Mándame el video cuando lo edites.
Flor levanta la cara.
—¿En serio?
—Obvio.
—No es la gran cosa. Son treinta segundos de un mate girando.
—Quiero verlo.
—Es para la tienda de la mamá de mi amiga. Lo van a ver como cuarenta personas.
—Cuarenta y uno.
Se ríe, medio ahogada.
—Ay, ya.
—Y me avisas cuando lo subas.
—Te aviso. —Saca el celular y escribe algo, ahí mismo, delante de ti—. Ya. Recordatorio puesto. "Mandarle el video a Ariel."
—¿Le pusiste alarma?
—Le puse alarma.
—Es un video de treinta segundos.
—Le puse alarma —repite, y guarda el celular.
Y después, mirando los techos:
—Es la primera vez que alguien me pide ver algo que hice.
Y lo dice tan tranquila, tan sin peso, que te toma un segundo darte cuenta de lo triste que es.""" + CONTESTAR)

add("Azotea volver", "4M5", (5800, 4625), """
(set: $temaAzotea to "volver")—Puedes volver, ¿no?
Flor asiente despacio.
—Sí. Puedo volver.
—O sea, hay vacaciones. Julio, enero. Feriados largos.
—Ajá.
—No es que te vayas para siempre.
—Ajá. —Se queda callada un momento—. Eso me dice todo el mundo.
—Ah.
—No, está bien. Es verdad. —Se encoge de hombros—. Es que "puedes volver" es distinto de "vivir acá".
—...Ya.
—Cuando vuelves de visita todos te tratan bien, te cocinan, te preguntan cómo te va. Y eso es lindo. —Mira los techos—. Pero ya eres visita. Ya no sabes quién se mudó, quién se murió, quién puso una tienda nueva.
—...
—Mi tío el de Huancayo viene cada Navidad y todos lo quieren un montón. Y cada vez que viene cuenta las mismas tres historias. —Pausa—. Porque las nuevas ya no las tiene.
Y se queda mirando la ciudad prendiéndose.
—Yo no quiero volver de visita a mi propia casa.""" + CONTESTAR)

add("Azotea asustado", "4M5", (5950, 4625), """
(set: $temaAzotea to "asustado")—Yo también estoy asustado.
Flor voltea.
—¿Tú?
—Yo.
—Pero tú te vas a Estados Unidos.
—Por eso.
—...Ah. —Se acomoda—. Cierto. Ay, cierto.
—Tú te vas a Lima, que está a nueve horas en carro y donde vive gente que habla tu idioma. —Te frotas las manos—. Yo me voy a un sitio donde no conozco a nadie, en otro idioma, y ni siquiera sé si voy a entrar.
—Ay.
—Y si entro, me voy solo. Mi mamá se queda.
Flor no dice nada. Solo se acerca un poquito en el borde de la azotea, hombro con hombro, que es su manera de decir cosas.
—¿Y qué es lo que más te asusta? —pregunta.
Lo piensas.
—Que allá voy a ser el peruano. Nada más que eso. —Te encoges de hombros—. Acá soy Ariel. Allá voy a ser el peruano y ya.
—Uf.
—¿Qué?
—Nada, es que... —Se ríe sin gracia—. Es lo mismo pero peor.
—¿Cómo?
—Que yo también voy a ser una cosa nomás. —Junta las manos—. Yo tengo terror de que me digan chola.
Silencio.
—Y no "serrana", que también lo dicen pero al menos te lo dicen de frente. —Se le endurece un poco la voz—. Chola es otra cosa. Chola te lo dicen cuando ya decidieron todo sobre ti.
—...
—Y lo peor es que ni siquiera lo van a decir. —Mira sus manos—. Lo van a pensar y van a ser amables. Y tú te vas a pasar cuatro años sin saber cuál de todos lo pensó.
Y ahí no tienes nada que decir, porque no lo tienes.
Así que solo te quedas.
—Perdón —dice ella después de un rato—. Se puso feo esto.
—No te disculpes.
—Es que era una azotea bonita.
—Sigue siendo una azotea bonita.""" + CONTESTAR)

add("Azotea silencio", "4M5", (6100, 4625), """
(set: $temaAzotea to "silencio")No dices nada.
Te quedas ahí, sentado en el borde, con las piernas colgando al lado de las de ella, mirando la ciudad prenderse abajo.
Flor se seca la cara con la manga. Respira hondo dos veces.
Y como no dices nada, sigue.
—Y lo peor es que ya pagué la matrícula —dice—. O sea mi mamá pagó. Con lo del terreno de mi abuelita.
—...
—Y cada vez que pienso "no quiero ir" me acuerdo de ese papel.
—...
—Y después me da cólera conmigo misma, porque hay gente que se mataría por lo que yo tengo y yo estoy acá llorando en mi azotea como una malcriada.
—...
—...
—Gracias —dice, al rato.
—No dije nada.
—Ya sé. —Se limpia la nariz—. Por eso.
Y se quedan ahí, sin decir nada más, hasta que se prenden todas las luces de la ladera.""" + CONTESTAR)

add("La llamada", "4M6", (5650, 4500), """
(if: $temaAzotea is not "")[El celular no para. Ya no puedes seguir ignorándolo.
]Sacas el celular. La pantalla te da en la cara y los dos parpadean.

Mamá — llamada perdida ×5

Y encima, entrando ahora, la sexta.
Contestas.
—¡ARIEL!
—¡Hola ma—
—¡¿DÓNDE ESTÁS?!
—Estoy—
—¡ESTOY EN LA CASA DE LOS QUISPE Y NO ESTÁS!
Miras a Flor. Flor te mira a ti. Los dos entienden al mismo tiempo.
—Ma. Estoy arriba.
—¿ARRIBA DÓNDE?
—En la azotea. La de acá. De esta casa.
Pausa.
—...¿Estás en la azotea?
—Sí.
Y del otro lado escuchas a tu mamá alejar el teléfono y decirle a alguien, en quechua, algo que termina con la palabra //azotea// en español.
Y después escuchas a la mamá de Flor gritar:
—¡FLOR! ¡BAJEN!
Y a Flor, al lado tuyo, gritar hacia abajo:
—¡YA VAMOS!
Y tu mamá, en el teléfono, riéndose:
—Ay, hijita. Baja pues.<!-- REVISAR: "hijita" a un hijo varón. -->
Cuelga.
Flor se para, se sacude el pantalón, y te estira la mano para ayudarte a levantar.
—Haku —dice.

* [[Haku.->El patio]]
""")

add("El patio", "4M6", (5800, 4500), """
Bajan la escalera de cemento sin baranda, Flor adelante, saltando los escalones de dos en dos con una seguridad que a ti te da vértigo.
El patio está lleno.
Tu mamá sentada en una silla verde con una taza. La mamá de Flor al lado, agarrándole el brazo. La tía. Tres primos que no conoces. El parlante bluetooth de siempre sonando; los dos grandes, todavía mudos contra la pared. Puku despierto y furioso.
Y en el rincón de la mesa de herramientas, Amaru. De espaldas. Agachado sobre un parlante con el cautín en la mano.
Flor lo ve y frena en seco.
—Ay no.
—¿Qué?
—Sigue en eso. —Camina hacia él—. ¡AMARU!
—No.
—¡Todavía estás con eso!
—No.
—¡Ya es de noche!
Amaru se endereza. Tiene el pelo parado de un lado, una mancha negra en la mejilla, y la cara de alguien que ha tenido una relación personal muy larga con un objeto inanimado.
—No era el cable —dice.
—¿Cómo que no era el cable?
—No era el cable.
—¡Siempre es el cable!
—¡ESO DIJE YO! —Levanta las dos manos, y en una todavía tiene el cautín, lo cual hace que dos primos se echen para atrás—. ¡Eso dije yo hace dos horas! ¡Y no era!
—¿Y qué era?
—El otro cable.
Silencio.
—Amaru.
—Es distinto.
—Es un cable.
—Es el otro cable. —Se voltea hacia ti, buscando al único aliado disponible—. Ariel. Dile. Es distinto.
—Yo no sé nada de cables.
—Es distinto —insiste, hablándole al aire—. Uno es de señal y el otro es de corriente. No son el mismo problema. No son la misma familia de problema.
—¡PERO ES UN CABLE! —grita Flor.
—¡ES OTRO CABLE!
Y ahí Flor se detiene. Se le acomoda algo en la cara. Se acerca dos pasos.
—Amaru.
—Qué.
—¿Por qué tienes tierra en la mejilla?
—Es estaño.
—El estaño es plateado.
—Es humo de estaño.
—El humo no se pega.
—Este humo sí.
Flor se voltea hacia la mesa, donde está tu mamá, y sube la voz:
—¡Señora Rosa! ¡Mire a este! ¡Se pasó la tarde con un cable!
—¡Ay, qué lindo! —dice tu mamá.
—¡No es lindo! ¡Estuvo dos horas con un cable!
—¡Es trabajador! —dice la mamá de Flor.
—¡Es obsesivo!
—¡Es trabajador! —repite su mamá, y le da una palmada al hombro de Amaru al pasar, y Amaru pone la cara de alguien que acaba de ganar un juicio que no estaba peleando.
Y entonces Amaru te mira a ti. Directo. Y en un tono absolutamente plano dice:
—¿Y ustedes qué hicieron?
Flor abre la boca.
—Grabamos el video.
—Dos horas.
—Salió bien.
—Dos horas para treinta segundos.
—Es un proceso.
—Ajá.
—¡ES UN PROCESO!
—Yo también tuve un proceso —dice Amaru, señalando el parlante— y a mí me dijeron obsesivo.
—¡Es distinto!
—Es exactamente lo mismo.
Y ahí los dos se quedan callados al mismo tiempo, mirándose, con la incomodidad de dos personas que acaban de descubrir en público que son la misma persona.
—...Ya —dice Flor.
—Ya.
—No hablemos de esto.
—No hablemos de esto.
Amaru apaga el cautín. Se limpia la mano en el pantalón. Y mientras camina hacia la mesa, pasa al lado tuyo y dice, bajito, sin voltear:
—¿Lloró?
—...Un poquito.
—Ajá. —Sigue caminando—. Siempre llora en la azotea.
—¡TE ESCUCHÉ!
—¡QUERÍA QUE ESCUCHARAS!
Y Puku, encima de todo:
—¡LORO!
—Cállate, Puku —dicen los tres al mismo tiempo.
(if: $temaAzotea is "ringpop")[Amaru, ya sentado, mira el puño cerrado de su hermana. Mira el anillo de caramelo que asoma entre sus dedos. Te mira a ti.
—No pregunto —dice.
—No preguntes —dicen Flor y tú al mismo tiempo.
]Y tu mamá, en medio de todo eso, te agarra del brazo y te sienta a su lado.
—Ay, hijita. —Todavía se está riendo—. ¿Comiste?
—Comí un montón.
—¿Te portaste bien?
—Sí.
—Mmm. —Te mira, y se le ve la taza humeando entre las manos, y la cara distinta que tiene desde que llegó a esta ciudad—. ¿Y qué tanto has aprendido?
Y lo dice medio en broma, sin esperar respuesta.

* [[Continuar.->Final]]
""")

# ---------------------------------------------------------------- Final
add("Final", "F1", (5950, 4400), """
(set: $rutasJugadas to it + (a: $ruta))✦ FINAL — Tupananchikkama ✦

Y tú la miras. Y ella tiene la taza entre las manos y la cara distinta que tiene desde que llegó a esta ciudad, y detrás de ella están Flor y Amaru todavía (if: $ruta is "flor")[peleando por un cable](else:)[persiguiéndose por el patio], y la tía sirviendo algo que nadie pidió, y Puku gritando.
—Pisillata —dices.
Tu mamá baja la taza.
Y se le pone una cara que no le habías visto nunca. No es la de reírse con ternura y cambiar de tema. Es otra.
—...Ay.
—¿Estuvo mal?
—No. —Se le llenan los ojos y se apura en secárselos con el dorso de la mano, molesta consigo misma—. No, estuvo bien.
—Estuvo un poquito mal —dice Amaru desde el otro lado.
—¡AMARU! —grita Flor.
—Estuvo bien de contenido.
—¡ESTUVO PERFECTO!
—El contenido estuvo perfecto.
Y tu mamá se ríe con la mano en la cara, y le dice algo a la mamá de Flor en quechua, rápido, y las dos se ríen más, y esta vez tú entiendes dos palabras enteras en medio de la frase.
Dos.
Y con eso basta para saber que están hablando de ti.

* [[Continuar.->Los tres]]
""")

add("Los tres", "F2", (6100, 4400), """
//[ILUSTRACIÓN — Los tres. Rótulo sobre la imagen: «La noche siguiente». El pasto del parque feo, que en realidad es tierra. De noche. Los tres echados en fila mirando arriba, Flor en el medio. La linterna con el celofán rojo tirada a un lado, prendida, tiñendo todo. Amaru señalando algo en el cielo. Flor con la boca abierta a media carcajada. Ariel volteado hacia ellos en vez de hacia el cielo. Y arriba, cruzando la ilustración entera, el Mayu.]//

''La noche siguiente.''

—¿Y esa cuál es?
—Esa es la llama.
—Yo no veo ninguna llama.
—Está ahí.
—Yo tampoco veo la llama.
—Ustedes dos son ciegos.

* [[Continuar.->El carro]]
""")

add("El carro", "F2", (6250, 4400), """
//[ILUSTRACIÓN — El carro. Dos días después. La misma carretera de curvas, en sentido contrario. Adelante, Rosa hablando con el conductor. Ariel en el asiento de atrás, con la frente apoyada en la ventana.]//

Los cerros pasando. La luz blanquísima.
(if: $pidioFoto)[En la mano, el celular. En la pantalla, una foto completamente negra.](else-if: $temaAzotea is "video")[En la mano, el celular. En la pantalla, un video de treinta segundos: un mate girando frente a un cerro borroso.](else:)[En la mano, el celular. En la pantalla, el grupo, con la foto de Puku arriba.]
Y en la esquina de arriba, una notificación:

''EL GRUPOOOOOO 🦜''
Flor: ya llegaron?
Flor: AVISA
Amaru: avisa
Flor: AY MIREN QUIÉN HABLA
Flor: el que contesta con dos palabras
Amaru: son dos palabras porque alcanzan
Flor: 😐
Flor: ariel ayuda
Flor: ARIEL
Tú: tupananchikkama
Flor: 🥹
Flor: AY
Flor: AMARU MIRA
Amaru: lo vi
Amaru: lo escribió bien

Ariel sonríe contra el vidrio.
Afuera, los cerros.

* [[Continuar.->Créditos]]
""")

add("Créditos", "F3", (6400, 4400), """
<div style="text-align:center">

''KILLA''
//un verano en quechua//

<br><br>''Agradecimientos''

A quienes prestaron su voz.
Sin ellas y ellos, este juego sería solo texto.

A quienes revisaron cada palabra
y dijeron con paciencia: acá no se dice así.

Al quechua chanka,
que no está en un museo,
que se mezcla, se adapta, insulta con cariño,
manda mensajes por WhatsApp
y grita cosas desde la cocina.

A las madres que dejaron de enseñarlo
por miedo a que sus hijos hablaran raro,
y a las que lo enseñaron igual.

A quien lo está aprendiendo tarde:
pisillata también cuenta.

''Tupananchikkama.''

— FIN —

(if: $rutasJugadas's length < 2)[(link-goto: "Volver a la tarde y quedarte con el otro", "Choice")]
</div>
""")
