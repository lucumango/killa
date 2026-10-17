// =====================================================================
// CAPÍTULO 3 — El kiosko de doña Nati, las notas, los mensajes al grupo,
// la vuelta a la casa y la elección de ruta (Flor o Amaru).
// =====================================================================
GUION.registrar('cap03', String.raw`

# Si vienes de los créditos a jugar la otra ruta, saltas directo a la elección.
@si volver_a_elegir == 1 -> elegir_ruta

# ===============================================================
== salir_kiosko
@fondo casa_patio
@var plata = {yape}
@var cuenta = 0
@var n_compras = 0
ariel (neutral): Voy al kiosko. ¿Quieren algo?
flor (feliz): ¡Pilas!
amaru (neutral): No necesitas pilas.
flor (molesto): ¡Necesito pilas!
amaru (neutral): ¿Para qué?
flor (seria): Para el futuro.
Amaru se queda mirándola tres segundos enteros.
amaru (neutral): Ya. Tráele pilas para el futuro.
flor (feliz): ¡Gracias!
amaru (neutral): Que no sabemos de qué tamaño.
flor (feliz): ¡AA!
amaru (seria): No sabes eso.
flor (molesto): ¡Todas las pilas son AA!
Y ahí Amaru se voltea hacia ti, muy serio.
amaru (seria): Anota esto. Es importante. Mi hermana cree que todas las pilas son AA.
ariel (burla): Anotado.
amaru (seria): Que conste que yo lo dije delante de testigos.
flor (molesto): ¡AMARU!
amaru (neutral): Es a la vuelta. La esquina y a la derecha. No te pierdas.
Te lo dice a ti, ignorándola completamente.
ariel (molesto): No me voy a perder.
@si presentacion == perdi -> salir_perdi
amaru (neutral): Eso dicen todos los que se pierden.
ariel (neutral): Los que se pierden no dicen nada. Por eso se pierden.
Amaru se queda quieto. Procesa. Y asiente lentamente, con genuino respeto técnico.
amaru (neutral): Correcto.
@ir calle_kiosko

== salir_perdi
amaru (neutral): Eso dijiste la vez pasada.
ariel (molesto): La vez pasada no lo había dicho todavía.
@ir calle_kiosko

# ===============================================================
== calle_kiosko
@fondo calle_kiosko
Sales al pasaje. Ya son como las cinco y la luz está bajando de blanco a dorado, y todo se ve mejor: las paredes, el polvo, la ropa tendida.
En la esquina, tres señores están sentados en unos cajones de cerveza al lado de una puerta abierta, con vasos, riéndose de algo con muchísimas ganas. Uno le da una palmada al otro en la espalda y se ríen más fuerte. Al pasar los escuchas:
compadre: ...ay compadre, ya estás waska pues...
compadre: ¡No estoy waska!
compadre: ¡Estás waska!
compadre: ¡Sinkaña kachkanki, compadre!
Y se ríen los tres, con más ganas todavía.
Te sigues de largo, y a los diez pasos te frenas.
Waska.
Tú has dicho esa palabra toda tu vida. En Lima. En fiestas. "Estaba waska." Nunca en tu vida se te ocurrió preguntarte de dónde salía.
Sigues caminando con una sensación rara en el pecho.
Media cuadra después, una puerta de zaguán con un letrero de cartón escrito con plumón grueso: VENDO CHUQLLU SANCOCHADO HABAS TAMBIÉN.
En la vereda del frente, una chica que tendrá veintipico camina rápido cargando bolsas, y detrás de ella va una niña de tres años que se distrae con absolutamente todo.
chica: ¡Wawa! ¡Wawa, camina!
La chica no voltea. La niña no camina. La niña está viendo una hormiga.
chica: ¡Wawa!
Y en un pasaje lateral hay una profesora joven con un chaleco de institución y como ocho niños de cinco años haciendo una ronda. Ella aplaude con ritmo y ellos gritan las respuestas.
profe: ¡Imayllanchik!
ninos: ¡ASÁ!
profe: ¡Haykallanchik!
ninos: ¡ASÁ!
profe: ¡Kusa! ¡Otra vez! ¡Más fuerte!
Te quedas mirando eso como treinta segundos, sin darte cuenta, hasta que una señora tiene que rodearte para pasar.

# ===============================================================
== bodega
@fondo kiosko_barrio
No te pierdes. Casi.
El kiosko de esta zona es distinto al de la plaza: más chiquito, medio metido en la sala de una casa, con una ventanita enrejada y una señora que teje sentada adentro.
Adelante tuyo hay un señor comprando pan. La señora le cuenta las monedas y le pone los panes en una bolsa, y él, antes de irse, apoya la mano en la reja.
feli: Señora... yapita pues.
La señora suspira con toda la paciencia acumulada del oficio, mete la mano en la canasta y le echa un pan más.
nati (neutral): Ya pues, don Feli.
feli: Sulpayki, señorita.
nati (seria): No soy señorita.
feli: Para mí sí.
Y se va contentísimo.
Ahora te toca a ti. La señora deja el tejido y te mira por encima de los lentes.
nati (neutral): ¿Qué te doy?
Y ahí, con la luz dorada entrando por la reja y el corazón medio acelerado, decides usar lo que tienes. Señalas el estante con las pilas.
ariel (nervioso): Pilas AA, por favor. Y...
@var c_pilas = 1
@var plata -= 5
@var cuenta += 5
@var n_compras += 1
La señora pone las pilas en el mostrador. Para el futuro.

== kiosko_nati
[si kiosko_visto != 1] Doña Nati vuelve a su tejido. Sabe exactamente cuánto tiempo tarda alguien de dieciocho años en decidir.
[si kiosko_visto != 1] En tu Yape te quedan S/ {plata:2} si pagas las pilas: lo que te yapeó tu mamá, menos la ferretería, más lo que ya tenías.
[si kiosko_visto == 1] En el mostrador ya hay {n_compras} cosas. Te quedan S/ {plata:2}.
@var kiosko_visto = 1
* Mirar lo que hay para comer -> kiosko_comer
* Mirar las otras cosas -> kiosko_utiles
* Ya está. Poner todo en el mostrador. -> pago_nati

== kiosko_comer
Galletas, chocolates, gaseosas, un frasco grande de caramelos, un cajón de mandarinas.
Te quedan S/ {plata:2}.
* Sublime / Princesa (S/ 2.00) -> ver_chocolate [si c_chocolate != 1 && plata >= 2]
* Mandarinas (bolsa de 6) (S/ 5.00) -> ver_mandarinas [si c_mandarinas != 1 && plata >= 5]
* Galletas surtidas (S/ 1.50) -> ver_galletas [si c_galletas != 1 && plata >= 1.5]
* Gaseosa zero azúcar (S/ 3.00) -> ver_gaseosa [si c_gaseosa != 1 && plata >= 3]
* Ring Pop (S/ 2.50) -> ver_ringpop [si c_ringpop != 1 && plata >= 2.5]
* Frugele rojo (S/ 0.50) -> ver_frugele [si c_frugele != 1 && plata >= 0.5]
* Volver al mostrador -> kiosko_nati

== ver_chocolate
Como agua para chocolate. Si te lo comes con suficiente sentimiento, alguien a tres cuadras se pone a llorar sin saber por qué. Riesgo bajo. Recompensa emocional alta.
* Llevarlo -> comprar_chocolate
* Mejor no -> kiosko_comer

== comprar_chocolate
@var c_chocolate = 1
@var plata -= 2
@var cuenta += 2
@var n_compras += 1
@ir kiosko_comer

== ver_mandarinas
Puku no come galleta. Nadie dijo nada sobre mandarinas. Nadie ha dicho nada sobre mandarinas. Puku ha estado esperando esta laguna legal toda su vida.
* Llevarlo -> comprar_mandarinas
* Mejor no -> kiosko_comer

== comprar_mandarinas
@var c_mandarinas = 1
@var plata -= 5
@var cuenta += 5
@var n_compras += 1
@ir kiosko_comer

== ver_galletas
NO PARA PUKU. Para ti. Para ti nomás. Mira a Puku. Mira a Puku a los ojos y dile que no son para él.
* Llevarlo -> comprar_galletas
* Mejor no -> kiosko_comer

== comprar_galletas
@var c_galletas = 1
@var plata -= 1.5
@var cuenta += 1.5
@var n_compras += 1
@ir kiosko_comer

== ver_gaseosa
Si es cero azúcar, ¿entonces qué tiene? ¿Y por qué es dulce? ¿De dónde sale lo dulce? Doña Nati no lo sabe. Doña Nati vende, no explica.
* Llevarlo -> comprar_gaseosa
* Mejor no -> kiosko_comer

== comprar_gaseosa
@var c_gaseosa = 1
@var plata -= 3
@var cuenta += 3
@var n_compras += 1
@ir kiosko_comer

== ver_ringpop
Es un anillo. Es un anillo comestible. Nadie te está obligando a nada. Pero es un anillo. Y hay dos hermanos en esa casa. Y solo hay un Ring Pop.
* Llevarlo -> comprar_ringpop
* Mejor no -> kiosko_comer

== comprar_ringpop
@var c_ringpop = 1
@var plata -= 2.5
@var cuenta += 2.5
@var n_compras += 1
@ir kiosko_comer

== ver_frugele
Tus favoritos. Siempre el rojo. Nunca discutas con alguien que prefiere el verde, esa gente no razona. (El envoltorio es de celofán. Rojo. Translúcido. Sin ninguna razón en particular.)
* Llevarlo -> comprar_frugele
* Mejor no -> kiosko_comer

== comprar_frugele
@var c_frugele = 1
@var plata -= 0.5
@var cuenta += 0.5
@var n_compras += 1
@ir kiosko_comer

== kiosko_utiles
Un estante con cuadernos, lapiceros, plumones, cinta, cables y una libretita chiquita de tapa dura.
Te quedan S/ {plata:2}.
* Libretita de tapa dura (S/ 3.50) -> ver_libretita [si c_libretita != 1 && plata >= 3.5]
* Cinta adhesiva / de embalar (S/ 4.00) -> ver_cinta [si c_cinta != 1 && plata >= 4]
* Plumón indeleble + lapicero (S/ 3.00) -> ver_plumon [si c_plumon != 1 && plata >= 3]
* Pañuelos de papel (S/ 1.00) -> ver_panuelos [si c_panuelos != 1 && plata >= 1]
* Cable de carga / adaptador (S/ 8.00) -> ver_cable [si c_cable != 1 && plata >= 8]
* Linterna chiquita (S/ 6.00) -> ver_linterna [si c_linterna != 1 && plata >= 6]
* Volver al mostrador -> kiosko_nati

== ver_libretita
Para quienes parten llevando consigo las palabras que algún día esperan volver a pronunciar.
* Llevarlo -> comprar_libretita
* Mejor no -> kiosko_utiles

== comprar_libretita
@var c_libretita = 1
@var plata -= 3.5
@var cuenta += 3.5
@var n_compras += 1
@ir kiosko_utiles

== ver_cinta
Tienes un buen presentimiento sobre esto. Are you feeling lucky? No sabes para qué la vas a necesitar. La vas a necesitar.
* Llevarlo -> comprar_cinta
* Mejor no -> kiosko_utiles

== comprar_cinta
@var c_cinta = 1
@var plata -= 4
@var cuenta += 4
@var n_compras += 1
@ir kiosko_utiles

== ver_plumon
Indeleble significa que si te equivocas, te equivocaste para siempre. Como los tatuajes. Como los nombres. Como llamarse Jorge tres generaciones seguidas.
* Llevarlo -> comprar_plumon
* Mejor no -> kiosko_utiles

== comprar_plumon
@var c_plumon = 1
@var plata -= 3
@var cuenta += 3
@var n_compras += 1
@ir kiosko_utiles

== ver_panuelos
El artículo más aburrido del kiosko. Nadie compra pañuelos pensando en el momento en que los va a necesitar. Ese es justamente el punto de los pañuelos.
* Llevarlo -> comprar_panuelos
* Mejor no -> kiosko_utiles

== comprar_panuelos
@var c_panuelos = 1
@var plata -= 1
@var cuenta += 1
@var n_compras += 1
@ir kiosko_utiles

== ver_cable
Cuatro celulares cargando en una sola regleta. Alguien en esa casa está sufriendo en silencio. Podrías salvar a esa casa. Podrías ser quien trajo el quinto puerto.
* Llevarlo -> comprar_cable
* Mejor no -> kiosko_utiles

== comprar_cable
@var c_cable = 1
@var plata -= 8
@var cuenta += 8
@var n_compras += 1
@ir kiosko_utiles

== ver_linterna
Todavía hay sol. Va a haber sol como una hora más. Después ya no.
* Llevarlo -> comprar_linterna
* Mejor no -> kiosko_utiles

== comprar_linterna
@var c_linterna = 1
@var plata -= 6
@var cuenta += 6
@var n_compras += 1
@ir kiosko_utiles


# ===============================================================
== pago_nati
Pones todo sobre el mostrador. Doña Nati deja el tejido y mueve las cosas con un dedo mientras cuenta.
[si n_compras == 1] Es una sola cosa, pero igual la cuenta.
¿Cómo preguntas?
* ¿Haykataq? -> pago_haykataq
* ¿Cuánto es? -> pago_cuanto

== pago_haykataq
@var uso_haykataq_nati = 1
Y ahí lo dices, con la boca un poquito seca:
ariel (nervioso): ¿Haykataq?
Ella levanta la vista. No se sorprende como don Hilario. Solo hace un ruidito con la garganta, aprobatorio, como quien reconoce a alguien que hizo la tarea.
@ir cuenta_nati

== pago_cuanto
ariel (neutral): ¿Cuánto es?
nati (seria): Haykataq, se dice. Ya estás acá. Pregunta bien.
Te corrige sin levantar la vista.
ariel (nervioso): ...¿Haykataq?
nati (neutral): Ahí está.

== cuenta_nati
nati (neutral): A ver...
Cuenta con el dedo.
[si n_compras == 1] nati (neutral): Huk. Una cosita.
[si n_compras == 2] nati (neutral): Iskay. Dos cositas.
[si n_compras == 3] nati (neutral): Kimsa. Tres cositas.
[si n_compras == 4] nati (neutral): Tawa. Cuatro cositas.
[si n_compras == 5] nati (neutral): Pichqa. Cinco cositas.
[si n_compras == 6] nati (neutral): Suqta. Seis cositas.
[si n_compras == 7] nati (neutral): Qanchis. Siete cositas.
[si n_compras == 8] nati (neutral): Pusaq. Ocho cositas.
[si n_compras == 9] nati (neutral): Isqun. Nueve cositas.
[si n_compras == 10] nati (neutral): Chunka. Diez cositas.
[si n_compras > 10] nati (neutral): Achka. Un montón de cositas.
[si n_compras == 1] ariel (neutral): Huk.
[si n_compras == 2] ariel (neutral): Iskay.
[si n_compras == 3] ariel (neutral): Kimsa.
[si n_compras == 4] ariel (neutral): Tawa.
[si n_compras == 5] ariel (neutral): Pichqa.
[si n_compras == 6] ariel (neutral): Suqta.
[si n_compras == 7] ariel (neutral): Qanchis.
[si n_compras == 8] ariel (neutral): Pusaq.
[si n_compras == 9] ariel (neutral): Isqun.
[si n_compras == 10] ariel (neutral): Chunka.
[si n_compras > 10] ariel (neutral): Achka.
[si n_compras == 9] @aprender isqun
[si n_compras > 10] @aprender achka
nati (neutral): Ajá.
Y te dice el total.

@si c_linterna != 1 -> cuenta_frugele
nati (curioso): ¿Y para qué quieres linterna? Todavía hay sol.
ariel (nervioso): Por si acaso.
nati (neutral): Mmm. Akchi, le decimos a la luz. Y alumbrar es kanchay. La linterna sí es la linterna, ya nadie le dice de otra forma.
ariel (curioso): Akchi. Kanchay.
nati (neutral): Eso. La luz y lo que hace la luz.
Y agrega, sin darle importancia:
nati (neutral): A las siete ya está oscuro acá. Bien oscuro. No como en Lima que hay poste en cada esquina.
@aprender akchi

== cuenta_frugele
@si c_frugele != 1 -> cuenta_mandarinas
nati (neutral): El rojo siempre.
Lo dice viendo cuál sacaste del frasco.
ariel (feliz): Es el mejor.
nati (feliz): Mi nieto igual. Solo el rojo. Los otros se quedan ahí meses.
Levanta el frasco y lo sacude.
nati (neutral): Mira, puros verdes. Nadie quiere el verde.
ariel (neutral): Nadie quiere el verde.
nati (neutral): Lliwmi puka miskita munanku. Todos quieren el rojo.
Y tú, sin pensarlo, contestas:
ariel (feliz): Arí. Pukatam munani.
Doña Nati suelta una risa corta.
nati (feliz): Ay. Ya aprendiste lo importante.

== cuenta_mandarinas
@si c_mandarinas != 1 -> cuenta_libretita
nati (neutral): Están dulces esas. Recién traídas.
ariel (curioso): ¿De acá?
nati (neutral): Del valle. Acá no crecen.
Y mientras las mete a la bolsa:
nati (feliz): Miski están. Bien miski.
Se te escapa la risa, y ella te mira.
nati (curioso): ¿Qué?
ariel (feliz): Nada. Conozco a alguien que se llama así.

== cuenta_libretita
@si c_libretita != 1 -> cuenta_ringpop
Ella mira la libretita. Después te mira a ti.
nati (curioso): ¿Para el colegio?
ariel (nervioso): No, ya salí. Es para... para anotar palabras.
nati (neutral): Ah. Ya.
Asiente despacio, sin preguntar cuáles. Y le pasa la mano por la tapa antes de dártela, como quitándole un polvo que no tiene.

== cuenta_ringpop
@si c_ringpop != 1 -> cuenta_fin
Doña Nati agarra el Ring Pop. Lo levanta a la altura de sus ojos. Lo hace girar.
Y después te mira por encima de los lentes con una expresión que te congela en el sitio.
nati (seria): ¿Y esto para quién es?
ariel (nervioso): Es... para mí. Es un caramelo.
nati (seria): Mjm. Es un caramelo.
No lo suelta.
ariel (nervioso): Es un caramelo.
nati (seria): En mi época también eran caramelos. Y así se casó mi hermana.
Lo dice asintiendo con muchísima seriedad.
ariel (nervioso): Señora...
nati (neutral): Yo solo digo lo que pasó.
Lo pone en la bolsa. Pero antes de soltar la bolsa, la sujeta un segundo más.
nati (curioso): ¿Es para uno de los Quispe?
ariel (sorpresa): ¡No!
nati (feliz): Ah, ya sabía que estabas donde los Quispe. Toda la calle sabe. Pasaste por acá con los dos hace media hora.
Sonríe con todos los dientes.
ariel (nervioso): No es para nadie.
nati (burla): Arí, arí. Imamanta.
Te suelta la bolsa.

== cuenta_fin
* Pagar. -> cierre_nati
* Señora... yapita pues. -> yapita_nati

== yapita_nati
@var yapita = 1
ariel (nervioso): Señora... yapita pues.
Doña Nati se queda quieta con las agujas en el aire.
nati (sorpresa): ¿Tú también?
Suspira, mete la mano en el frasco y te echa un Frugele en la bolsa. Verde.
nati (seria): Para que aprendas.

== cierre_nati
Le yapeas los S/ {cuenta:2}. Suena el sonidito.
@yape -{cuenta} Kiosko de doña Nati
@si c_ringpop == 1 -> cierre_ringpop
Ella mete todo en una bolsa de plástico transparente y te la empuja.
ariel (feliz): Sulpayki.
nati (feliz): Imamanta.
Y vuelve al tejido.
@ir notas

== cierre_ringpop
Ella mete lo que falta en la bolsa de plástico transparente y te la empuja.
ariel (nervioso): Sulpayki.
Sales del kiosko con la cara ardiendo y un anillo de caramelo en una bolsa transparente que se ve desde la calle.

# ===============================================================
== notas
@fondo calle_kiosko
Abres las notas. La lista de la mañana se ve patética ahora. Empiezas a agregar todo lo del día, tratando de escribir los sonidos como te salen.
Y al final, una sección nueva: escuchado en la calle. Para preguntar.
@aprender yapita waska sinka wawa kusa chuqllu
@celular
Los repasas en voz baja, moviendo los labios, caminando de vuelta con la bolsa del kiosko.
Allinllachu. Sulpayki. Imamanta. Haykataq. Pisillata.
[si pregunta == edad] Chunka pusaqniyuq watayuqmi kani.
[si pregunta != edad] Iskay waranqa iskay chunka suqtayuq.
Ya no suenan tan extranjeras.

# ===============================================================
== mensajes
Antes de volver a entrar, sacas el celular otra vez. Puedes escribir algo. En el quechua que creas que sabes. Si se entiende, te contestan. Si no se entiende...
Bueno. Si no se entiende, ya sabes lo que pasa con los mensajes que nadie entiende.
* Escribir al grupo -> msg_grupo
* Escribirle a Amaru -> msg_amaru
* Escribirle a Flor -> msg_flor
* Escribir lo que yo quiera -> msg_libre
* No mandar nada -> vuelta

== msg_grupo
¿Qué le mandas al grupo?
* allinllachu -> msg_allinllachu
* sulpayki x el almuerzo 🙏 -> msg_sulpayki
* compré pilas AA. para el futuro -> msg_pilas
* ñuqapa sutiymi Ariel -> msg_sutiymi
* munani 🥺 -> msg_munani
* allin punchaw hermanos quispe... -> msg_punchaw
* qachakuchi piñapsu upacha -> msg_insultos
* imataq sutiyki? -> msg_imataq [si amaru_broma == 1]
* haykataq? -> msg_haykataq
* amor 🥺💍 -> msg_amor [si c_ringpop == 1]
* Mejor no -> mensajes

== msg_amaru
¿Qué le mandas a Amaru?
* oe sal. mikhuy? -> msg_mikhuy
* Mejor no -> mensajes

== msg_flor
¿Qué le mandas a Flor?
* miski 🥺 -> msg_miski
* Mejor no -> mensajes

== msg_libre
@var mensaje_enviado = libre
@chat grupo escribir
@ir vuelta

== msg_allinllachu
@var mensaje_enviado = allinllachu
@mensaje grupo | yo | allinllachu
@mensaje grupo | flor | allinllam 😌
@mensaje grupo | flor | OYE ESCRIBE MAS
@mensaje grupo | flor | no me dejes asi
@mensaje grupo | amaru | allinllam.
@chat grupo leer
Punto final. Es todo lo que vas a recibir de Amaru.
@ir vuelta

== msg_sulpayki
@var mensaje_enviado = sulpayki
@mensaje grupo | yo | sulpayki x el almuerzo 🙏
@mensaje grupo | flor | imamanta causa 💅
@mensaje grupo | flor | ay ya dice causa
@mensaje grupo | flor | se nos pegó
@mensaje grupo | amaru | imamanta
@mensaje grupo | amaru | era de mi mamá igual, dile a ella
@chat grupo leer
@ir vuelta

== msg_pilas
@var mensaje_enviado = pilas
@mensaje grupo | yo | compré pilas AA. para el futuro
@mensaje grupo | flor | 🥹
@mensaje grupo | flor | GRACIAS
@mensaje grupo | flor | amaru mira
@mensaje grupo | amaru | el futuro no existe
@mensaje grupo | amaru | pero gracias
@chat grupo leer
@ir vuelta

== msg_sutiymi
@var mensaje_enviado = sutiymi
@mensaje grupo | yo | ñuqapa sutiymi Ariel
@mensaje grupo | amaru | ya sé cómo te llamas
@mensaje grupo | amaru | te tengo agendado
@mensaje grupo | flor | JAJAJAJAJA se presentó otra vez
@mensaje grupo | flor | hola ariel mucho gusto
@mensaje grupo | flor | yo soy flor
@chat grupo leer
@ir vuelta

== msg_munani
@var mensaje_enviado = munani
@mensaje grupo | yo | munani 🥺
@mensaje grupo | flor | QUÉ COSA
@mensaje grupo | flor | QUÉ QUIERES
@mensaje grupo | flor | dilo completo
@mensaje grupo | flor | no puedes solo poner "quiero" y desaparecer
@mensaje grupo | amaru | falta el objeto.
@mensaje grupo | amaru | la oración está incompleta.
@mensaje grupo | amaru | ¿qué quieres?
@chat grupo leer
@ir vuelta

== msg_punchaw
@var mensaje_enviado = punchaw
@mensaje grupo | yo | allin punchaw hermanos quispe. ñuqa kani ariel. mikuni miski. sulpayki tukuy
@chat grupo leer
Entregado. Leído.
Nada.
@ir vuelta

== msg_insultos
@var mensaje_enviado = insultos
@mensaje grupo | yo | qachakuchi piñapsu upacha
@chat grupo leer
Leído por los dos.
Silencio absoluto.
@ir vuelta

== msg_imataq
@var mensaje_enviado = imataq
@mensaje grupo | yo | imataq sutiyki?
@mensaje grupo | flor | flor
@mensaje grupo | flor | nos conocemos hace 4 horas
@mensaje grupo | flor | comiste en mi casa
@chat grupo leer
@ir vuelta

== msg_haykataq
@var mensaje_enviado = haykataq
@mensaje grupo | yo | haykataq?
@mensaje grupo | amaru | ¿cuánto es qué
@mensaje grupo | flor | ¿cuánto es qué?????
@mensaje grupo | flor | ariel
@mensaje grupo | flor | ariel cuánto es qué
@chat grupo leer
@ir vuelta

== msg_amor
@var mensaje_enviado = amor
@mensaje grupo | yo | amor 🥺💍
@chat grupo leer
Visto por los dos.
Flor está escribiendo...
Flor dejó de escribir.
Flor está escribiendo...
Flor dejó de escribir.
@mensaje grupo | amaru | ¿ese mensaje era para el grupo?
@chat grupo leer
@ir vuelta

== msg_mikhuy
@var mensaje_enviado = mikhuy
@mensaje amaru | yo | oe sal. mikhuy?
@mensaje amaru | amaru | mikuy.
@mensaje amaru | amaru | sin h.
@mensaje amaru | amaru | eso es cusqueño.
@mensaje amaru | amaru | y ya comí. tres platos. me viste
@chat amaru leer
Tres minutos después:
@mensaje amaru | amaru | igual salgo
@chat amaru leer
@ir vuelta

== msg_miski
@var mensaje_enviado = miski
@mensaje flor | yo | miski 🥺
@mensaje flor | flor | ???
@mensaje flor | flor | ese es mi nombre
@mensaje flor | flor | o me estás diciendo dulce
@mensaje flor | flor | ARIEL
@mensaje flor | flor | CUÁL DE LOS DOS
@mensaje flor | flor | NO ME DEJES EN VISTO ASÍ
@chat flor leer
@ir vuelta

# ===============================================================
== vuelta
@sfx vibrar.mp3
El celular vibra en tu mano.
@mensaje mama | ariel esto va a terminar tardísimo me quedo hasta que salga el sistema te recojo más noche donde los quispe ya le escribí a la señora maría ella dice que no hay problema
@mensaje mama | yo | ya ma
@mensaje mama | PORTATE BIEN ayuda en algo no estés sentado nomas
@chat mama leer
Guardas el celular. Empujas la puerta del patio.
@fondo casa_patio_tarde
@si mensaje_enviado == amor -> vuelta_amor
@si mensaje_enviado == punchaw -> vuelta_punchaw
flor (feliz): ¡Volvió! ¡No se perdió!
Lo grita desde adentro.
ariel (molesto): Te dije que no me iba a perder.
flor (burla): Amaru dijo que sí.
amaru (neutral): Dije que probablemente.
Lo corrige sin levantar la vista de lo suyo.
@ir vuelta_casa

== vuelta_amor
Los dos están mirando el techo y nadie dice nada durante ocho segundos enteros.
flor (rojo): ...Volviste.
amaru (rojo): No se perdió.
Se lo dice al techo.
@ir vuelta_casa

== vuelta_punchaw
Cuando entras, Flor está con el celular en la mano y cara de dolor.
flor (triste): Ay, Ariel.
amaru (neutral): ¿Qué le pasó?
flor (triste): No sé. Le pasó algo.

== vuelta_casa
[si mensaje_enviado == insultos] amaru (seria): Te dije que iba a pasar esto.
[si mensaje_enviado == insultos] flor (molesto): ¡PERO SI LO DIJO ACÁ ADENTRO!
[si mensaje_enviado == insultos] amaru (seria): Lo dijo por chat. Es afuera. El chat es afuera.
Y ahí ves que la casa cambió en los veinte minutos que no estuviste. La mesa está a medio recoger. La mamá y la tía siguen en la cocina, pero ahora hablando de otra cosa, algo de cantidades, algo de "¿y alcanza?".
Y en el patio, contra la pared, hay ahora dos parlantes grandes que antes no estaban, negros, con las esquinas peladas, y un enredo de cables sacados de una caja.
flor (feliz): Tenemos problemas.
Lo anuncia con el tono de quien está encantada de que existan problemas.
ariel (curioso): ¿Qué pasó?
flor (feliz): Dos cosas. Cosa uno: mi tía cumple años y hay fiesta acá el sábado, y mi papá dijo "Amaru, los parlantes", como siempre, y uno de los parlantes está haciendo un ruido.
amaru (molesto): No está haciendo un ruido. Está haciendo EL ruido. Es distinto.
Está agachado al lado del cable.
flor (seria): Está haciendo un ruido. Y él tiene que arreglarlo hoy, porque mi papá llega a las siete y va a preguntar, y si no está listo va a ser un tema.
amaru (neutral): No va a ser un tema.
flor (seria): Va a ser un tema.
Amaru se queda callado, lo cual confirma que va a ser un tema.
flor (feliz): Cosa dos: yo tengo que grabar un video.
Y ahora sí se le sube la voz.
ariel (curioso): ¿Qué video?
flor (feliz): Es para una amiga. Bueno, para la tienda de su mamá. Venden mates burilados, cosas así, y quieren empezar a subir cosas a Instagram porque nadie los conoce fuera de acá.
Se le enredan un poco las palabras de la emoción.
flor (feliz): Y yo le dije que se lo hacía gratis. Como práctica. Para tener algo que mostrar cuando llegue a la universidad, ¿me entiendes? Porque todos van a llegar con su portafolio y yo voy a llegar con... con nada.
amaru (neutral): No vas a llegar con nada.
Todavía agachado.
flor (triste): Voy a llegar con nada.
amaru (neutral): Tienes cosas.
flor (molesto): Tengo cosas feas.
amaru (neutral): Tienes cosas.
Flor lo ignora y se voltea hacia ti con las manos juntas.
flor (feliz): Y tengo que grabarlo hoy, porque hoy hay esta luz. ¿Ves esa luz? Esa luz dura como una hora más. Mañana está nublado, ya vi el pronóstico.
amaru (neutral): El pronóstico nunca acierta acá.
flor (seria): Hoy sí va a acertar.
Y entonces los dos se callan al mismo tiempo, y voltean, y te miran.
Flor tiene el celular en una mano y una bolsa de tela en la otra, con las cosas para grabar.
Amaru tiene un cable en la mano y el multímetro amarillo en la otra, y una expresión que dice claramente que no va a insistir en nada, que si te vas con su hermana no va a decir ni pío, y que preferiría que no.
flor (feliz): Ya. ¿Con quién te quedas?
amaru (seria): No la ayudes. Te va a hacer cargar cosas.
flor (molesto): ¡Tú también le vas a hacer cargar cosas!
amaru (neutral): Yo le voy a hacer SOSTENER cosas. Es distinto.
flor (molesto): ¡Es exactamente lo mismo!
Puku, desde su jaula, opina:
puku: ¡Loro!
Los dos a la vez: "Nadie te preguntó".
Y se quedan mirándote, esperando.

# ===============================================================
== elegir_ruta
@fondo casa_patio_tarde
@guardar
[si volver_a_elegir == 1] Vuelves a esa tarde. Flor con la bolsa de tela, Amaru con el cable. Los dos esperando.
@tarjeta ✦ ELIGE RUTA ✦ | Podrás conocer al otro después. Pero el orden importa.
* FLOR. Tiene que grabar un video corto para la tienda de mates, y necesita a alguien con ojo para escoger tomas y fondos. -> ir_flor [si jugo_flor != 1]
* AMARU. Le pidieron dejar listos los parlantes para el cumpleaños de la tía. Algo va a fallar, obviamente. -> ir_amaru [si jugo_amaru != 1]

== ir_flor
@var volver_a_elegir = 0
@var ruta = flor
@capitulo ruta_flor

== ir_amaru
@var volver_a_elegir = 0
@var ruta = amaru
@capitulo ruta_amaru
`);
