# Pasajes: hub del parque, temas, cierre (se duerme, mamá, la casa).
P = []
def add(name, tags, pos, text):
    P.append((name, tags, pos, text.strip('\n') + '\n'))

VOLVER = "\n\n* [[Seguir mirando el cielo->Parque]]\n"

add("Parque", "3M8", (4900, 4075), """
✦ ¿Qué dices? ✦
Los dos echados en el cemento. Frío en la espalda. Las estrellas volviendo de a pocas.

(if: $temas < 3)[(unless: $temasUsados contains "nombre")[• (link-goto: "«Amaru» (solo su nombre)", "Tema nombre")
//A veces decir el nombre de alguien es toda la frase. Él eligió ese nombre. Úsalo.//
](if: $compras contains "frugele" and $compras contains "linterna" and not ($temasUsados contains "frugele"))[• (link-goto: "«Espera, tengo algo»", "Tema frugele")
//El envoltorio es de celofán rojo. La linterna está en tu bolsillo. Se te acaba de ocurrir algo.//
](if: $compras contains "ringpop" and not $dioRingPop)[• (link-goto: "«Tengo algo para ti»", "Tema ringpop")
//Es un caramelo. Es literalmente un caramelo. No significa nada. No tiene por qué significar nada.//
](unless: $temasUsados contains "irte")[• (link-goto: "«¿Te irías de Ayacucho?»", "Tema irte")
//La pregunta que le hiciste a Flor sin hacérsela. Acá pesa distinto.//
](unless: $pidioFoto)[• (link-goto: "«Hay que tomarnos una foto»", "Tema foto")
//Salida cobarde y tierna: no dices nada, pides una foto que sabes que va a salir negra.//
](unless: $temasUsados contains "sabatico")[• (link-goto: "«¿Y si no postulas a nada este año?»", "Tema sabatico")
//Le devuelves la pregunta que nadie le hizo, pero en serio esta vez. Puede que no le guste.//
]]• (link-goto: "«¿Vienes mucho acá?»", "Tema vienes")
//La pregunta segura. Lo dejas hablar de él sin empujarlo.//
• (link-goto: "No decir nada", "Tema silencio")
//Se quedan callados. A veces eso también es una respuesta, y con él probablemente sea la correcta.//
""")

add("Tema nombre", "3M8", (4600, 4200), """
(set: $temas to it + 1)(set: $temasUsados to it + (a: "nombre"))—Amaru.
No dices nada más. Solo eso.
Y él tarda un segundo en contestar, porque no era una pregunta y no sabe qué hacer con eso.
—...Ya.
—Nada. Solo quería decirlo.
—¿Por qué?
—Porque dijiste que nadie lo usa. En los papeles.
Silencio.
Se escucha el viento moviendo la lata de un techo, lejos.
—...Ah —dice Amaru.
Y no dice nada más durante un rato bastante largo. Tú tampoco. Sigues mirando el río de estrellas y sientes el cemento helado en los omóplatos y no te mueves.
Después escuchas que traga.
—Nadie hace eso —dice.
—¿Qué cosa?
—Decirlo así. Sin querer nada. —Se le nota que está eligiendo las palabras con cuidado, que es lo que hace cuando algo le importa—. En mi casa lo dicen cuando quieren que arregle algo. Mi hermana lo dice para molestarme. Mi tío ni lo usa, me dice "sobrino".
—Ya.
—Nadie lo dice... —se queda a medias— nomás.
—Bueno. Yo lo dije nomás.
—Ya me di cuenta.
Pasa otro rato.
—Amaru también es una palabra normal, ¿no? —dices—. O sea, existe aparte de ti.
—Sí. Es la serpiente. La grande, de los ríos. —Pausa—. Sale en las historias. Se supone que vive abajo, en el agua, y que cuando sale, sale hacia arriba. Rompe el cerro y sube.
—¿Y a dónde va?
—Al cielo. —Se encoge de hombros contra el cemento, y lo escuchas raspar—. Se convierte en otra cosa allá arriba. Rayo, o arcoíris, o no sé. Hay como cinco versiones.
Te quedas mirando el cielo con eso encima.
—Entonces te llamas como algo que vive abajo y sube.
—...Sí.
—Y a ti te gusta mirar arriba.
Amaru no contesta.
Y ahí, aunque está oscuro y no le ves la cara, sabes exactamente qué cara tiene. La conoces desde la tarde. La que pone cuando alguien dice algo que él ya había pensado pero nunca había escuchado de vuelta.
—Yaya —dice, al fin, muy bajito.
—¿Eso es bueno o malo?
—Ya te dije que es bueno.
—Nunca sé.
—Es bueno, Ariel. —Y después de una pausa—: Es que no sé qué hacer con eso.
—No tienes que hacer nada.
Se quedan echados.
En algún momento su brazo y tu brazo quedan cerca, no tocándose, pero cerca lo suficiente para que sientas el frío de su casaca al lado del tuyo, y ninguno de los dos se mueve ni un centímetro, y los dos están perfectamente conscientes de eso.
Y arriba, el río sigue ahí, quieto, sin enterarse de nada.""" + VOLVER)

add("Tema frugele", "3M8", (4750, 4200), """
(set: $temas to it + 1)(set: $temasUsados to it + (a: "frugele"))—Espera, tengo algo.
Te sientas de golpe y hurgas en la bolsa del kiosko. Amaru se apoya en los codos.
—¿Qué haces?
—Espera.
—Suyay —dice él.
—Eso. Suyay.
Sacas el Frugele. Le quitas el envoltorio de celofán rojo con los dientes, te metes el caramelo a la boca —no lo vas a desperdiciar— y estiras el envoltorio entre los dedos hasta que queda plano.
Después sacas la linterna.
—Ah —dice Amaru.
—Espera.
—Ya sé lo que vas a hacer.
—Espera.
Pones el celofán sobre el lente de la linterna. Lo sujetas con el pulgar. La prendes.
Y el parque se vuelve rojo.
No un rojo fuerte. Un rojo suave, granulado, que se derrama sobre el cemento y el tobogán oxidado y la banca, y que hace que todo se vea como si estuviera pasando adentro de algo. Le da a la cara de Amaru un color que no es el de la piel de nadie y que igual le queda bien.
—Uy —dice.
—¿Ves?
—Sí veo.
Mueves la linterna despacio y la luz roja barre el pasto que es tierra, el poste sin foco, la pared del fondo.
—¿Y cómo se te ocurrió eso?
—No sé. —Te encoges de hombros—. Compré las dos cosas y en algún momento las vi juntas en la bolsa y ya no se me fue de la cabeza.
Amaru te mira. Con la cara roja de luz, no de vergüenza, aunque a lo mejor las dos cosas.
—Eso es lo que yo hago —dice.
—¿Qué cosa?
—Eso. Ver dos cosas que están ahí y pensar qué pasa si las juntas. —Se sienta bien—. Eso es lo que hago todo el día.
—Ah.
—Y tú lo hiciste con un caramelo.
—Fue suerte.
—No fue suerte.
Se quedan un rato jugando con eso, que es lo más tonto del mundo: apuntar la linterna roja a cosas y decir "mira". El tobogán queda increíble. La cara del otro queda ridícula. Amaru te la quita y te apunta directo a los ojos y tú te quejas y él dice "quería ver algo".
—¿Qué querías ver?
—Nada.
—¿Qué querías ver, Amaru?
—Nada. —Te devuelve la linterna—. Apágala.
La apagas.
Y otra vez la oscuridad total, y otra vez los ojos acostumbrándose, y otra vez las estrellas volviendo de a pocas.
—Ahora tenemos que esperar cinco minutos otra vez —dice él.
—Valió la pena.
—Ajá.
Se vuelven a echar.
—Ariel.
—Ya.
—Los astrónomos usan luz roja.
Volteas la cabeza tan rápido que raspas el cemento.
—¿Qué?
—Luz roja. En los observatorios. —Está mirando arriba, muy tranquilo, como quien comenta el clima—. Para no perder la visión de noche. La luz blanca te la borra y tienes que esperar otra vez. La roja no tanto.
—¿Y tú cómo sabes eso?
—Vi un video.
—¿Viste un video de observatorios?
—Veo videos de gente arreglando cosas —dice, y se le nota la sonrisa aunque no la veas—. Los observatorios son cosas.
Y te quedas ahí, echado en el cemento helado de un parque feo, con un caramelo rojo en la boca y un envoltorio arrugado en la mano, dándote cuenta de que sin querer acabas de armar exactamente lo que arma la gente que hace lo que tú quieres hacer.
—Entonces lo hice bien —dices.
—Lo hiciste bien.""" + VOLVER)

add("Tema ringpop", "3M9", (4900, 4200), """
(set: $temas to it + 1)(set: $temasUsados to it + (a: "ringpop"))(set: $dioRingPop to true)—Tengo algo para ti...
Y ahí te arrepientes a medio camino, porque lo dijiste con demasiada pausa, con demasiada seriedad, y ya no hay forma de que suene casual.
Amaru se apoya en los codos otra vez.
(if: $temasUsados contains "frugele")[—¿Otra cosa?
—Sí.
—¿Es otra linterna?
—No.](else:)[—¿Qué cosa?
—Espera.]
Metes la mano en la bolsa. Y ahí, en la oscuridad, tus dedos encuentran el plástico duro.
Y lo piensas dos segundos enteros.
Y lo sacas igual.
(if: $compras contains "linterna")[Prendes la linterna un momento —blanca, sin celofán, y los dos se quejan— y lo levantas.](else:)[Prendes la pantalla del celular un momento —los dos se quejan— y lo levantas.]
Un Ring Pop. Rojo. Del tamaño de una uva. Con su anillo de plástico transparente.
Silencio absoluto.
—...Es un caramelo —dices.
Amaru no dice nada.
—Es un caramelo, Amaru.
—Ya sé que es un caramelo.
—Es un caramelo con forma de anillo. Que es como vienen. Todos vienen así. No es una decisión que yo tomé.
—Ariel.
—Es literalmente el único formato en que los venden.
—Ariel.
Te callas.
Amaru se sienta del todo. Se pasa la mano por la nuca. Mira el Ring Pop. Mira la linterna. Mira otra vez el Ring Pop.
—¿Doña Nati te vio comprar eso?
—...Sí.
—¿Y qué te dijo?
—...
—¿Qué te dijo, Ariel?
—Que en su época también eran caramelos —dices, con la voz de alguien leyendo su propia sentencia— y que así se casó su hermana.
Amaru se tapa la cara con las dos manos.
—Ay no.
—Ya sé.
—Ay no.
—Ya lo sé, Amaru.
—Para mañana lo sabe mi mamá. —Habla contra sus palmas—. Para el sábado lo sabe mi familia entera. Va a haber gente en esa fiesta que sabe esto y que yo no sabía que existía.
(if: $mensajeEnviado is "amor")[—Y encima mandaste "amor" al grupo —agrega, todavía contra las palmas—. Flor tiene captura. Flor siempre tiene captura.
]—Puedo devolverlo.
—No puedes devolverlo, ya lo compraste.
—Puedo comérmelo.
—Cómetelo.
—Ya. —Empiezas a abrirlo—. Me lo como.
—...
—...
—No te lo comas —dice.
Te detienes.
—¿Qué?
—Que no te lo comas. —Estira la mano—. Dámelo.
—Dijiste que me lo coma.
—Cambié de opinión. Eso se puede.
Se lo pasas. Él lo agarra y se queda mirándolo en la palma, y hasta en la oscuridad se nota que no sabe qué hacer con la cara.
—No significa nada —dices.
—Ya sé que no significa nada.
—Es un caramelo.
—Es un caramelo —repite.
Y se lo mete al bolsillo de la casaca. Sin abrirlo.
—...¿No te lo vas a comer?
—Después.
—Se va a derretir en tu bolsillo.
—No se va a derretir, hacen dos grados.
—Amaru.
—Después —dice, y se echa de vuelta en el cemento, y se cruza de brazos, y mira el cielo con una concentración absolutamente falsa.
Te echas al lado suyo.
Pasan como cuarenta segundos de silencio total.
—Oye —dices.
—No.
—Todavía no dije nada.
—Ya sé lo que ibas a decir.
—¿Qué iba a decir?
—Algo sobre el caramelo.
—...Sí, era sobre el caramelo.
—No lo digas.
Y ninguno de los dos dice nada más durante un rato larguísimo, y arriba el río de estrellas sigue exactamente igual, y en el bolsillo de su casaca hay un anillo de plástico con un rubí de azúcar que no se va a comer nunca.""" + VOLVER)

add("Tema irte", "3M8", (5050, 4200), """
(set: $temas to it + 1)(set: $temasUsados to it + (a: "irte"))Te quedas jugando con el borde de la casaca, doblándolo y desdoblándolo entre los dedos.
Y piensas: se me acaba mañana. O pasado. Mi mamá termina los trámites y nos subimos a un carro y esto no vuelve a pasar.
—¿Te irías de Ayacucho? —preguntas.
Amaru no contesta al toque.
—¿Yo?
—Tú.
—...
Se pasa la lengua por los dientes. Se acomoda contra el cemento.
—Ya me fui una vez —dice—. De chiquito. Cuatro años en Lima.
(if: $pregunta is "vivido")[—Ya me contaron. San Juan de Lurigancho.
—Flor te contó. —Pausa—. Pero Flor no se acuerda. Yo sí.](else:)[—Ah, ¿en serio? Eso no me lo contaron.
—Porque casi nadie se acuerda. Flor no se acuerda. Yo sí.]
—¿Y qué te acuerdas?
Se queda pensando un rato.
—Que era ruidoso —dice—. Que en el colegio se reían de cómo hablaba mi mamá cuando iba a recogerme. Que el cielo estaba tapado siempre y yo pensaba que era humo. —Pausa—. Y que no había nadie.
—¿Cómo que no había nadie? Es Lima, hay diez millones de personas.
—Por eso. —Se encoge de hombros—. Había un montón de gente y ninguna sabía quién era yo.
Te quedas callado, porque eso es exactamente tu vida y nunca lo habías escuchado dicho así.
—Acá me pesa que todos me conozcan —sigue—. Todos los días me pesa. Doña Nati sabe qué compraste, mi tío ya sabe de tu mamá, en la fiesta van a preguntarme veinte veces qué voy a estudiar. —Levanta una mano y la deja caer—. Pero allá me pesaba lo otro. Y lo otro pesa más.
—O sea que no te irías.
—No dije eso.
—...
—Me iría —dice—. Pero por algo. No para escaparme. —Voltea la cabeza en el cemento y ahora sí te está mirando—. Tú te vas por algo. Tú sabes qué vas a hacer allá. Yo me iría por irme, y eso ya lo probé y no funciona.
—Ya.
—Si supiera qué quiero, me voy mañana. —Vuelve a mirar arriba—. El problema no es acá. El problema es que no sé.
El viento sube otra vez. Alguien, muy abajo, apaga la música de la fiesta que no es la de su tía, y de golpe se escucha muchísimo mejor el silencio.
—Oye —dice él.
—Ya.
—¿Por qué preguntaste eso?
Y ahí tienes que decidir si mentir.
—Porque me voy en unos días —dices— y no sé si voy a volver.
Amaru no dice nada.
—O sea, voy a volver. Algún día. Pero no sé cuándo, y a lo mejor para entonces tú ya estás en otro lado, y Flor ya está en Lima, y esta casa está cerrada o no está, y yo voy a estar en algún sitio con el cielo tapado. —Te frotas la cara con las dos manos—. Y entonces se me ocurrió preguntarte ahora porque después ya no puedo.
Silencio.
—Ariel.
—¿Qué?
—Eso fue lo más triste que alguien me ha dicho en un parque.
Te ríes. Con la voz medio rota, pero te ríes.
—Perdón.
—No, está bien. —Pausa—. Es que hay que decirlo también. Nadie lo dice.
Y después de un rato, sin ningún tipo de aviso, Amaru dice:
—Tupananchikkama.
—Ya sé qué significa —dices—. Flor lo gritó desde el pasaje.
—Flor lo grita todo. Pero no lo piensa.
Te quedas con eso.
—Entonces no es "hasta luego".
—No.
—Es una promesa.
—Es media promesa —dice Amaru—. Es "hasta que", no "cuándo". No dice cuándo.
—Eso es peor.
—Eso es más honesto.
Y se quedan echados los dos, mirando el mismo río de estrellas desde el mismo cemento helado, sin decir nada más durante mucho rato.""" + VOLVER)

add("Tema foto", "3M8", (5200, 4200), """
(set: $temas to it + 1)(set: $temasUsados to it + (a: "foto"))(set: $pidioFoto to true)—Hay que tomarnos una foto.
—No va a salir.
—Sí va a salir.
—No hay luz, Ariel.
—(if: $compras contains "linterna")[Tengo linterna.](else:)[Tienes linterna.]
—Entonces vamos a salir los dos con la cara blanca como en interrogatorio.
—Ya, sin linterna. —Ya estás sacando el celular—. Modo noche.
—Eso es para ciudades.
—Sonríe.
Levantas el brazo. La pantalla se prende y los dos se quejan otra vez, y en la vista previa no se ve absolutamente nada, solo dos manchas grises flotando en un vacío.
—Ni te veo —dices.
—Estoy acá.
—¿Dónde?
—Acá. —Se acerca un poco. Le sientes el hombro contra el hombro—. Ya. Toma.
Tomas la foto.
El flash no se activa porque lo tenías apagado, así que solo hay medio segundo donde la pantalla brilla y después vuelve todo a la oscuridad.
Miras el resultado.
—...
—¿Salió?
—Salió negra.
—Te dije.
—Salió completamente negra. —Le acercas la pantalla, y en efecto es un rectángulo negro con dos manchones grisáceos que podrían ser cualquier cosa—. Mira. Esto podría ser cualquier persona.
—Ese soy yo.
—¿Cómo sabes?
—Porque estoy a la izquierda.
—No se ve nada, Amaru.
—Estoy a la izquierda —insiste—. Esa mancha de ahí es mi nariz.
—Esa mancha podría ser el tobogán.
—El tobogán está atrás.
Le das vuelta al celular. Le vuelves a dar vuelta.
—Voy a tomar otra.
—Va a salir igual.
Tomas otra. Sale igual.
Tomas una tercera y en esa sale, muy tenue, una franja más clara arriba: el río.
—Uy. Mira.
Amaru se acerca a ver.
—Ah. Salió el Mayu.
—Salimos nosotros no, pero salió el Mayu.
—Eso es mejor —dice él—. Nosotros estamos acá igual. Las estrellas están lejos.
Y no sabes si eso fue muy profundo o muy tonto, y decides que da lo mismo.
Te quedas mirando la foto negra un rato. La primera, la mala.
—La voy a guardar.
—¿Esa? Si no se ve nada.
—Por eso. —Amplías con dos dedos, y no aparece nada nuevo, solo píxeles grises—. Cuando esté en Lima voy a mirar esto y voy a saber exactamente qué es.
—Nadie más va a saber qué es.
—Nadie más tiene que saber.
Amaru no dice nada durante unos segundos.
Después:
—Mándamela.
—¿La negra?
—La negra.
Se la mandas. Al grupo, sin darte cuenta.
(if: $dioRingPop)[El celular de él vibra en su bolsillo, encima del Ring Pop.](else:)[El celular de él vibra en su bolsillo.]
No la abre. Solo lo siente vibrar y deja la mano ahí.
Y en el grupo, un minuto después:

Flor: qué es eso
Flor: ariel
Flor: ARIEL QUÉ ES ESA FOTO
Flor: POR QUÉ ESTÁ NEGRA
Flor: DÓNDE ESTÁN
Flor: AMARU CONTESTA
Amaru: estamos afuera
Flor: AFUERA DÓNDE
Amaru: afuera
Flor: 😐
Flor: 😐😐
Flor: ya me enteraré""" + VOLVER)

add("Tema sabatico", "3M8", (5350, 4200), """
(set: $temas to it + 1)(set: $temasUsados to it + (a: "sabatico"))(if: (history:)'s 2ndlast is "Tema foto")[Guardas el celular. La pantalla se apaga y otra vez hay que esperar a que los ojos vuelvan.
]—Oye —dices—. ¿Y si no postulas a nada este año?
Amaru no se mueve.
—¿Cómo?
—Que si no postulas. Este año. —Te encoges de hombros contra el cemento—. Ya estás en sabático. ¿Qué pasa si haces otro?
Silencio largo.
—No se puede.
—¿Por qué no?
—Porque no. —Y después, más bajo—: Porque ya es uno. Uno se entiende. Dos ya es otra cosa.
—¿Otra qué cosa?
—Otra cosa que la gente dice de ti. —Se sienta a medias, apoyado en un codo—. Uno es "está viendo qué hacer". Dos es "se quedó". Y acá conozco gente que se quedó. Y no es que les vaya mal, ah, no estoy diciendo eso. —Se pasa la mano por la nuca—. Es que en algún momento dejaron de decir "el próximo año" y ya nadie les pregunta nada.
—¿Y eso te asusta?
—Muchísimo.
Lo dice sin adornar. Sin la mueca, sin el chiste, sin mirar el cable.
—Ya —dices.
—Pero además está lo de la plata —sigue, y ahora habla más rápido, como si hubiera abierto una llave—. La academia la estoy pagando yo, con lo que me pagan arreglando cosas. Mis papás ayudan, pero yo pongo la mitad. Y otro año es otro año de eso.
—No sabía.
—No lo digo mucho.
—¿Flor sabe?
—Flor sabe. Flor sabe todo. —Media sonrisa en la oscuridad—. Flor me ofreció darme lo de su cumpleaños y yo le dije que no.
—¿Por qué?
—Porque es de su cumpleaños.
Se quedan callados. Un carro pasa dos calles abajo y las luces barren la pared del fondo del parque, un segundo nomás, y después nada.
—Pero igual —dices.
—Igual qué.
—Igual estás pagando una academia para postular a algo que no sabes si quieres.
Amaru se queda muy quieto.
—...Sí.
—O sea, técnicamente estás pagando por apurarte.
—Ariel.
—¿Qué?
—Eso me lo voy a estar pensando como tres días.
—Perdón.
—No, está bien. —Se echa otra vez—. Es que nadie me lo había puesto así.
—Es que todos te preguntan qué vas a estudiar. Nadie te pregunta cuándo.
—Nadie me pregunta nada. —Pausa—. Me dicen.
Pasa un rato.
—Igual no voy a hacer otro sabático —dice.
—Ya.
—Pero está bien que exista la opción. —Levanta un poco la cabeza y la vuelve a apoyar—. O sea, saber que se puede. Aunque no lo hagas. Es distinto a pensar que no se puede.
—Sí, es distinto.
—Tú tienes eso.
—¿Yo?
—Tú sabes que puedes irte. Yo recién estoy averiguando qué puedo. —Y agrega, antes de que digas nada—: No es reclamo. Es un dato.
—Ya.
—Es un buen dato —dice, y se le nota que está tratando de que no suene triste—. Es mejor tener el dato que no tenerlo.
Se quedan echados.
—Amaru.
—Ya.
—Si algún día decides que quieres mirar cosas y no arreglarlas, avísame.
—¿Por qué?
—Porque yo voy a estar en algún lado mirando cosas —dices— y me vendría bien alguien que sepa por qué funcionan.
Silencio.
Y después, muy bajito, casi para él:
—Yaya.
—¿Bueno o malo?
—Bueno.
—Nunca sé, Amaru.
—Nunca sabes —dice— y por eso hay que seguir preguntando.""" + VOLVER)

# ---------------------------------------------------------------- Cierre
add("Tema vienes", "3M10", (4900, 4325), """
—¿Vienes mucho acá?
—Bastante.
—¿Solo?
—Siempre solo. —Se acomoda—. Bueno, hasta hoy.

* [[Continuar.->Monólogo]]
""")

add("Tema silencio", "3M10", (5050, 4325), """
No dices nada. Amaru tampoco.
Pasa un minuto. Pasan dos. El viento, el metal lejano, un perro.
Y cuando ya pensabas que la noche se iba a quedar así, él habla, sin que le preguntes:
—Vengo mucho acá. Por si te lo preguntabas.
—No te lo estaba preguntando.
—Igual. —Pausa—. Siempre solo. Bueno, hasta hoy.

* [[Continuar.->Monólogo]]
""")

add("Monólogo", "3M10", (5200, 4325), """
(set: $durmioEnHombro to true)Y no le da ningún peso a eso. Lo dice como quien reporta el clima, y sigue.
—Vengo cuando la casa suena mucho. Que es casi siempre. —Se cruza de brazos sobre el pecho—. En mi casa siempre hay alguien. Siempre. Mi mamá, mi tía, mi prima, alguien viendo tele, alguien cocinando, el parlante. Y no es que me moleste, ah. Es que a veces necesito que no haya.
—Ya.
—Entonces me subo. Me demoro doce minutos, ya los tengo contados. —Pausa—. Y me quedo un rato y me bajo y ya estoy bien.
—¿Y qué haces acá?
—Nada. Miro. —Se ríe corto—. Suena mal cuando lo digo en voz alta.
—No suena mal.
—Suena a que no hago nada.
—Estás mirando. Es distinto.
—Eso es lo que yo digo.
Se te está cerrando la espalda de frío pero no te quieres mover. Cambias un poco el peso de la cabeza. El cemento está durísimo.
—La primera vez que subí tenía como trece —dice Amaru—. Me había peleado con mi papá por una tontería, no me acuerdo ni de qué. Salí caminando y llegué acá de casualidad, ni sabía que existía. Estaba oscuro y me senté en esa banca y miré arriba y dije //ah, ya//.
—¿Ya qué?
—Ya. Nada. Ya. —Se encoge de hombros—. Como que se me acomodó algo.
Cierras los ojos un segundo porque el cielo te está cansando la vista.
—Y de ahí ya venía siempre. Cuando desaprobé un simulacro, cuando se murió mi abuelita, cuando Flor se enteró que había ingresado y todo el mundo estaba feliz en la casa y yo también estaba feliz pero me cansé.
Abres los ojos. Los cierras otra vez.
—Ese día vine y me quedé como dos horas. Mi mamá me llamó como ocho veces.
—Mm.
—Y lo raro es que no me pasaba nada malo, ah. Estaba contento por ella. Es que a veces estar contento también cansa.
Ajustas la cabeza. Encuentras algo menos duro que el cemento y te acomodas ahí sin pensarlo.
—Y en la academia me pasa igual. A las siete de la mañana me levanto, a las ocho estoy sentado, y hay como cuarenta personas en un salón respirando. Cuarenta. Y todos quieren lo mismo. Y sales de ahí y todos hablan de puntajes.
—...
—Entonces llego a mi casa y me encierro y arreglo algo, porque cuando arreglas algo no tienes que hablar con nadie y el problema tiene una respuesta. —Pausa—. A lo mejor por eso me gusta. No por la electrónica. Por eso.
—...
—Y mi papá cree que es porque tengo talento. Y no es talento, es que es lo único que me deja tranquilo.
—...
—...Ariel.
—...
—¿Ariel?
Se queda muy quieto.
Porque tu cabeza está apoyada en su hombro, pesada, del todo, y estás respirando despacio y hace como dos minutos que no dices nada.
—Ah —dice Amaru, en voz muy baja. Casi para nadie.
Y no se mueve.
Podría moverse. Podría despertarte, o correr el hombro, o decir algo. Y en vez de eso se queda exactamente igual, con el brazo tieso y la mirada al frente, calculando la situación como quien calcula un circuito.
Pasan dos minutos.
—Se va a resfriar —dice al aire, muy bajito, en el tono de alguien construyendo una justificación técnica.
Con la mano libre, despacísimo, se abre el cierre de la casaca. Se la saca con un solo brazo, tardando como cuarenta segundos para no moverse del otro lado, y te la echa encima.
Huele a estaño y a frío.
—Suyay —murmura, aunque nadie le pidió nada.
Y se queda ahí, con un solo brazo, sin casaca, con dos grados, mirando el río de estrellas y absolutamente sin ninguna intención de moverse.
(if: $dioRingPop)[Y en el bolsillo de la casaca que ahora tienes encima, sin que lo sepas, va el Ring Pop.]

* [[...->Despertar]]
""")

add("Despertar", "3M11", (5350, 4325), """
Te despiertas de golpe, como se despierta uno cuando no tenía permiso para dormirse.
Lo primero que registras es que tienes una casaca encima que no es tuya.
Lo segundo es dónde tienes la cabeza.
Te sientas tan rápido que te raspas el codo contra el cemento.
—Ay. Ay, perdón. Perdón—
—No pasa nada.
—Me quedé dormido.
—Sí.
—¿Cuánto?
Amaru mira su celular. La pantalla les ilumina la cara a los dos, azul, y en ese medio segundo le ves la expresión: absolutamente neutra, demasiado neutra, la cara de alguien que lleva un rato practicándola.
—Doce minutos.
—Los tienes contados.
—Tengo todo contado.
Te frotas la cara con las dos manos.
—Perdón, en serio, qué roche—
—Ariel. No pasa nada. —Pausa—. Roncabas un poco.
Te congelas.
—Yo no ronco.
—Roncabas.
—Yo no ronco.
—Yo estaba ahí.
—Estabas mal ubicado.
—Estaba debajo de tu cabeza —dice Amaru—. No hay mejor ubicación que esa. Soy el testigo con mejor ubicación de la historia.
—A lo mejor era el viento.
—El viento no hace //mhh//.
—No hago //mhh//.
—Hacías //mhh//.
Te tapas la cara. Él se ríe, corto, y se le nota que llevaba doce minutos guardando esa risa.
Te acuerdas de la casaca. Te la sacas de encima y se la estiras.
—Toma.
—Quédatela.
—Estás en polo. Hacen dos grados.
—No tengo frío.
—Estás temblando.
—Estoy vibrando. Es distinto.
—Amaru.
—Es un fenómeno muscular normal.
Se la pones en la falda. Él la agarra, se la pone sin discutir más, y sube el cierre hasta el cuello con una velocidad que contradice todo lo que acaba de decir.
—Gracias —dices.
—Sulpayki.
—Sulpayki.
—Imamanta.
Se quedan sentados un momento. El cielo está igual. La fiesta de abajo se acabó o se mudó adentro.
—Oye —dices.
—No.
—Todavía no dije nada.
—Ibas a decir algo sobre lo de hace rato.
—...Sí.
—No lo digas.
—Ya. No lo digo.
—Gracias.
—Pero lo estoy pensando.
—Piénsalo callado.

* [[Continuar.->Ocho y media]]
""")

add("Ocho y media", "3M11", (5500, 4325), """
Y entonces vibra tu celular.
Vibra, y vuelve a vibrar, y vuelve a vibrar, y no para.
Lo sacas. La pantalla te ciega. Y en el brillo blanco lees, una encima de otra:

Mamá — llamada perdida
Mamá — llamada perdida
Mamá — llamada perdida
Mamá — llamada perdida
Mamá — llamada perdida

Cinco.
Y encima de todas, entrando ahora mismo, la sexta.
—Ay no.
—¿Qué?
—Mi mamá.
Contestas.
—¡ARIEL!
—¡Hola ma—
—¡¿DÓNDE ESTÁS?!
—Estoy—
—¡ESTOY EN LA CASA DE LOS QUISPE Y NO ESTÁS!
—Estoy acá cerca—
—¡SON LAS OCHO Y MEDIA!
Miras el celular. Son las ocho y treinta y dos.
—¡Ya voy! ¡Ya estoy yendo!
—¡¿CON QUIÉN ESTÁS?!
Y del otro lado, de fondo, escuchas la voz de otra señora diciendo algo, y después una risa, y después la voz de tu mamá cambiando completamente de tono:
—Ah, ya. Está con el hijo de la María.
Y después, alejándose del teléfono, hablándole a alguien más, en quechua.
Y tú te quedas parado en la oscuridad escuchando a tu mamá hablar quechua por teléfono, fluido, rápido, riéndose, con una soltura que no le has escuchado nunca en dieciocho años.
—...Ma.
—¡Ya, ya! ¡Ven! —Y cuelga.
Bajas el celular despacio.
—¿Qué pasó? —pregunta Amaru.
—Está en tu casa.
—Ah.
—Con tu mamá.
—Ah.
—Están hablando en quechua.
Amaru se levanta del cemento de un salto.
—Haku —dice—. Esto tenemos que verlo.

* [[Haku.->Vuelta a casa]]
""")

add("Vuelta a casa", "3M12", (5650, 4325), """
Bajan los doce minutos en seis.
Se escucha la casa desde media cuadra: música, voces, y encima de todo dos señoras hablando al mismo tiempo sin que ninguna espere a que la otra termine.
Empujan la puerta del patio.
Y ahí está.
Tu mamá, sentada en una silla de plástico verde, con una taza en la mano, riéndose con la cabeza echada para atrás. La mamá de Amaru al lado, agarrándole el brazo. La tía enfrente. Tres primos que no conoces. El parlante nuevo ya instalado y funcionando. Puku despierto y furioso por la hora.
Y tu mamá se ve distinta. No sabes explicarlo. Está sentada distinto. Ocupa más espacio.
—¡AHÍ ESTÁ! —grita, y se levanta—. ¡Ariel! ¡Ven, ven!
Y antes de que llegues a la mesa, Flor se te cruza en el camino.
Flor, que estaba sentada en el banco, que se para lentísimo, con el celular en la mano y una sonrisa que te hiela la sangre.
—Ariel.
—Hola.
—Ariel, Ariel, Ariel.
—Hola, Flor.
(if: $pidioFoto)[—Qué bonita foto me mandaste.
—Estaba oscuro.
—Estaba negra. —Levanta el celular y muestra el rectángulo negro a toda la mesa—. Miren. Miren lo que me mandaron. Esta es la evidencia.
—No se ve nada —dice un primo.
—¡EXACTO!](else:)[—Les escribí veinte veces.
—No teníamos... señal.
—Amaru tiene señal hasta en el baño.
—Estábamos sin luz.
—Sin luz —repite Flor, despacio, como quien anota algo para usarlo el resto de su vida.]
—Flor —dice Amaru.
—¿Sí, hermano?
—No.
—Todavía no he dicho nada.
—Te conozco.
Flor se voltea hacia él y lo examina de arriba a abajo, muy despacio, como quien pasa un escáner.
Y se detiene.
—Amaru.
—Qué.
—¿Por qué tienes el pelo aplastado de un solo lado?
Silencio.
—Es el viento.
—El viento no aplasta de un lado.
—Este viento sí.
—El viento no aplasta de un lado, Amaru.
—Estuvimos echados —dice él—. En el cemento. Por eso.
Y ahí Flor abre los ojos y se lleva la mano a la boca, y tú te das cuenta un segundo tarde de que acaba de recibir información gratis que no tenía.
—¿ECHADOS?
—Mirando las estrellas —dice Amaru, con una dignidad que se le está cayendo a pedazos—. Es lo que se hace. Te echas.
—¡AY!
—Es la posición estándar.
—¡MAMÁ! —grita Flor hacia la mesa—. ¡ESTABAN ECHADOS!
—¡Qué lindo! —dice la mamá, sin ningún tipo de malicia, que es lo peor que podía pasar.
—¡Está haciendo un frío horrible! —dice la tía—. ¡Se van a enfermar!
—¡Yo les dije! —dice Flor, que no les dijo nada.
Amaru se sienta en el primer sitio libre que encuentra y agarra un vaso vacío y hace como que toma de él.
Flor se sienta a tu lado. Baja la voz.
—Ya. En serio. ¿Todo bien?
—Todo bien.
—¿Se portó?
—¿Quién?
—El amargado.
—Se portó.
—Mmm. —Te mira de costado—. ¿Habló?
—Habló bastante.
Flor se queda quieta un segundo. Y después, sin ninguna burla:
—Ah. Qué bueno.
Y no dice nada más, lo cual, viniendo de ella, es enorme.
Y entonces se estira, mira a su hermano al otro lado de la mesa, y sube la voz otra vez:
—¡AMARU!
—Qué.
(if: $dioRingPop)[—¿Qué tienes en el bolsillo?
Amaru se lleva la mano al bolsillo por puro reflejo.
Que es exactamente lo que ella estaba esperando.
—Nada.
—Se te ve un bulto.
—Es mi celular.
—Tu celular está en la mesa.
Los dos miran la mesa. El celular de Amaru está en la mesa.
—Es otro celular —dice.
—¿Otro celular?
—Tengo dos.
—¡No tienes dos celulares!
—Tengo dos desde hoy.](else:)[—Estás sonriendo.
—No estoy sonriendo.
—Estás sonriendo con la boca cerrada, que es peor. —Estira la mano—. Dame tu celular.
—No.
—¡Dame tu celular!
—¡NO!]
Y Flor se lanza por encima de la mesa y Amaru se levanta de golpe y sale al patio y ella detrás gritando "¡A VER!" y él gritando "¡NO!", y los primos riéndose y la tía diciendo "¡el mantel! ¡EL MANTEL!" y Puku, encima de todo el escándalo, gritando:
—¡LORO! ¡LORO!
Y tu mamá, en medio de todo eso, te agarra del brazo y te sienta a su lado.
—Ay, hijita.<!-- REVISAR: la mamá le dice "hijita" aquí y en los WhatsApp. ¿Intencional? --> —Todavía se está riendo—. ¿Comiste?
—Comí un montón.
—¿Te portaste bien?
—Sí.
—Mmm. —Te mira—. ¿Y qué tanto has aprendido?
Y lo dice medio en broma, sin esperar respuesta.

* [[Continuar.->Final]]
""")

