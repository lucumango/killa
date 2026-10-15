// =====================================================================
// RUTA DE FLOR — el video de los mates, la azotea, la confesión y la luna.
// Termina en el capítulo "final".
// =====================================================================
GUION.registrar('ruta_flor', String.raw`

@fondo casa_patio_tarde
@var fondo_elegido = ninguno
@var tema_azotea = ninguno
@var pidio_foto = 0
@var dio_ringpop = 0
@var durmio = 0
Le pasas las pilas a Flor.
flor (feliz): ¡AY! ¡Gracias!
Las agarra con las dos manos como si fueran un premio.
ariel (feliz): Para el futuro.
flor (seria): Para el futuro.
Lo repite, solemnísima, y se las mete al bolsillo de la casaca. Y después se cuelga la bolsa de tela y mira el cielo con desesperación.
flor (molesto): Ya. Vamos corriendo. La luz se me va.
ariel (burla): ¿Segura no prefieres que me quede con el amargado?
flor (molesto): ¡NO! ¡Ya elegiste! ¡Yo tengo hora! ¡Él tiene todo el día!
Ya te está agarrando del brazo.
amaru (neutral): Yo también tengo hora. Mi papá llega a las siete.
Lo dice desde el piso, sin levantar la vista del cable.
flor (burla): Tu papá siempre llega tarde.
amaru (seria): Ese es un dato peligroso de asumir.
flor (feliz): ¡Tupananchikkama!
Lo grita arrastrándote hacia la puerta.
ariel (curioso): ¿Qué es eso?
flor (feliz): ¡Hasta luego! ¡Literal "hasta que nos volvamos a encontrar"! ¡Haku, haku! ¡Es "vamos"! ¡CAMINA!
@aprender tupananchikkama haku

# ===============================================================
== tienda
@fondo tienda_mates
Es una casa con la sala convertida en tienda. Hay una vitrina de vidrio con mates burilados de todos los tamaños, unos chiquitos como huevos y otros gigantes como pelotas de fútbol, todos con dibujos rayados a mano: fiestas, cosechas, animales.
La mamá de su amiga los recibe, les da un vaso de emoliente que nadie pidió, y desaparece.
flor (seria): Ya. El plan es este.
Saca el celular y un trípode que es una barra de plástico y nada más.
ariel (neutral): Ya.
flor (seria): Necesito un video de treinta segundos. Vertical. Que se vea bonito y que no parezca hecho por alguien que no sabe. Que es exactamente lo que soy.
ariel (neutral): No parece.
flor (triste): Parece muchísimo.
Levanta un mate mediano, con una escena de una feria tallada alrededor.
flor (feliz): Mira esto. ¿No es precioso?
ariel (feliz): Sí.
flor (feliz): Sumaq. Bonito, lindo, precioso. Todo eso junto.
ariel (neutral): Sumaq.
flor (seria): Y feo es millay. Pero ojo, que millay ya es fuerte, ya es asco. Y si es horrible, asqueroso: millakuypaqmi. No le digas eso a algo que solo está feíto. Eso es cruel.
Arruga la nariz.
ariel (neutral): Millakuypaqmi es nivel máximo.
flor (seria): Millakuypaqmi es nivel máximo.
@aprender sumaq millay
Flor pone el mate sobre tres superficies distintas y te mira.
flor (feliz): Ya. Tú tienes ojos frescos. ¿Cuál? Rápido, se me va la luz.
¿Dónde lo pones?
* La mesa de madera oscura, adentro. El mate resalta, pero la luz es amarilla y plana. -> fondo_mesa
* El poyo de cemento del patio, al sol. La luz es preciosa, pero atrás hay una mancha de humedad. -> fondo_patio
* El alféizar de la ventana, a contraluz. Se ve el cerro atrás, borroso; el mate queda medio oscuro. -> fondo_ventana

== fondo_mesa
@var fondo_elegido = mesa
@ir kaypi
== fondo_patio
@var fondo_elegido = patio
@ir kaypi
== fondo_ventana
@var fondo_elegido = ventana

== kaypi
Señalas. Y ahí ella te enseña, sin darse cuenta de que está enseñando.
flor (feliz): Kaypi. Acá. Chaypi es ahí, y wakpi es allá.
Pone el mate donde señalaste. Lo mueve.
flor (feliz): Kaypi, chaypi, wakpi. Es lo que más vas a usar en tu vida, te juro.
ariel (neutral): Kaypi. Chaypi. Wakpi.
flor (feliz): Y si es más arriba: hanay. Más abajo: uray. Hanayman, urayman. Para arriba, para abajo.
Levanta y baja la mano.
ariel (burla): Suena a instrucciones de mudanza.
flor (risa): ¡ES QUE ES ESO! La gente cree que el quechua es todo poético. Y sí, hay cosas poéticas. Pero también es "sube eso", "bájalo", "ponlo allá".
@aprender kaypi_chaypi hanay_uray
Grabas tú. Ella sostiene el mate y lo va girando en la luz. Y en un momento, entre toma y toma, dices:
ariel (feliz): Está bonito.
Flor baja el mate.
flor (seria): A ver, para. Esto te lo tengo que enseñar porque te va a servir.
ariel (curioso): ¿Qué cosa?
flor (seria): Hay una escala.
Levanta la mano y va marcando escalones en el aire.
flor (seria): Nivel uno: describir. Puka kachkan, está rojo. Eso no es nada, es un dato. Puedes decírselo a una pared.
ariel (neutral): Ya.
flor (seria): Nivel dos: cumplido. Sumaq kachkan, está bonito. Eso ya es una opinión. Se lo dices a una cosa, a una comida, a un mate. Y también a una persona, y no pasa nada.
ariel (neutral): Ya.
flor (rojo): Nivel tres: piropo. Kuyayllapaqmi kanki. Eres para quererte, algo así. Ahí ya cambiaste el sujeto. Ya no es la cosa, es la persona.
Baja la voz.
ariel (nervioso): ...Ya.
flor (seria): Y nivel cuatro: demasiado intenso.
Lo dice muy seria.
ariel (curioso): ¿Cuál es el cuatro?
flor (seria): Sunquy. Mi corazón. Sunqullay. Corazoncito mío.
ariel (feliz): Eso suena bonito.
flor (seria): Suena bonito y es nivel cuatro. Eso se lo dices a alguien con quien llevas dos años. O a tu abuelita. No hay término medio. Si se lo dices a alguien que conociste hoy, esa persona va a llamar a su mamá.
Te apunta con el dedo.
ariel (sorpresa): ¿En serio?
flor (seria): En serio. Y lo peor es que en internet salen todos juntos, en la misma lista, sin decirte cuál es cuál. Por eso los turistas quedan mal.
Vuelve a levantar el mate. Anotas mentalmente. Y en el celular.
@aprender puka_kachkan sumaq_kachkan kuyayllapaqmi sunqullay
Graban como veinte tomas. La mayoría malas.
flor (seria): Otra vez.
ariel (neutral): Ya salió bien esa.
flor (seria): Salió movida.
ariel (molesto): No salió movida.
flor (seria): Ariel, salió movida.
ariel (neutral): Ya. Otra vez.
@si fondo_elegido == ventana -> toma_ventana
En la toma trece ya está claro que tu fondo no funciona.
[si fondo_elegido == mesa] La luz amarilla hace que el mate parezca de plástico.
[si fondo_elegido == patio] La mancha de humedad sale en todas las tomas, como un fantasma con mala actitud.
ariel (curioso): ¿Y si probamos en la ventana?
Flor lo mueve al alféizar sin discutir. Y en la toma catorce, con el cerro al fondo, la luz le pega justo en el borde tallado y se ve el relieve entero.
@ir toma_buena

== toma_ventana
En la toma catorce ella pone el mate en el alféizar, con el cerro al fondo, y la luz le pega justo en el borde tallado y se ve el relieve entero.

== toma_buena
Ninguno de los dos dice nada.
ariel (sorpresa): Esa.
flor (sorpresa): Esa.
ariel (feliz): Esa.
flor (risa): ¡ESA! ¡AY, ESA! ¡Mira! ¡Mira cómo se ve la línea del cerro atrás!
Da un salto.
ariel (feliz): Se ve buenazo.
flor (feliz): ¡Es que tú lo pusiste ahí! Yo lo tenía en la mesa como una tonta.
ariel (feliz): Tú lo giraste bien.
flor (feliz): Los dos lo hicimos bien.
Lo decide, y lo dice como sentencia final.

# ===============================================================
== qachakuchi
En la toma dieciocho a ella se le cae el mate.
No pasa nada, cae sobre la bolsa de tela. Pero los dos gritan.
flor (sorpresa): ¡AY!
ariel (sorpresa): ¡AY!
Flor lo levanta, lo revisa, no tiene nada, y se lo abraza al pecho con los ojos cerrados.
flor (triste): Casi mato el trabajo de un señor de setenta años.
ariel (burla): Casi.
flor (seria): No le digas a nadie.
ariel (burla): Le voy a decir a todos.
flor (seria): Ariel.
ariel (burla): Le voy a decir a Amaru.
flor (molesto): ¡NO! ¡A Amaru menos! ¡Me lo va a sacar en cara hasta que me muera!
Se le va la voz.
ariel (burla): Entonces págame.
Flor entrecierra los ojos.
flor (burla): Ay, qachakuchi. Ya saliste con eso.
ariel (feliz): Ese me lo enseñaste tú.
flor (feliz): Y mira qué bien lo uso. Así se dice. Con cariño. Es como decirte "ay, malo".
Sonríe de costado.
ariel (curioso): Oye, ¿y por qué en internet sale todo con h? Mikhuy, p'unchay...
flor (seria): Porque eso es de Cusco. Acá es sin h. Mikuy, punchaw, hamutani. Sin toda esa cosa de la garganta.
Se encoge de hombros.
flor (feliz): Cada valle tiene lo suyo.
Guarda el celular. Mira la luz, que ya está anaranjada de verdad.
flor (feliz): Ya. Tengo el video.
ariel (curioso): ¿Ya está?
flor (feliz): Ya está. Falta editarlo, pero eso lo hago de noche. Oye.
Se cuelga la bolsa.
ariel (neutral): Ya.
flor (feliz): ¿Subimos a la azotea de mi casa?
ariel (curioso): ¿Para qué?
flor (seria): Para nada. Para revisar las fotos. Y porque desde ahí se ve toda la ciudad cuando se está poniendo el sol y es lo más bonito que hay, y tú te vas a ir en unos días y no lo has visto.
Se encoge de hombros.
ariel (feliz): Haku.
Flor se detiene con la bolsa a medio colgar.
flor (sorpresa): ...Ay.
ariel (curioso): ¿Qué?
flor (feliz): Nada. Que lo dijiste bien.
ariel (sorpresa): ¿En serio?
flor (feliz): En serio. Ni pensaste. Eso es distinto.
Empieza a caminar.

# ===============================================================
== azotea
@fondo casa_patio_tarde
Se sube por una escalera de cemento sin baranda, pegada a la pared del patio, con los escalones un poco altos. Puku los ve pasar y comenta.
puku: ¡Loro!
flor (seria): Ya, Puku.
puku: ¡Loro!
flor (seria): Ya, Puku.
@fondo azotea_tarde
Arriba no hay nada especial. Un tanque de agua negro. Ropa tendida. Las varillas de fierro saliendo del techo, esperando un tercer piso. Un colchón viejo enrollado contra una pared. Baldes.
Y después te das la vuelta.
ariel (sorpresa): Uy.
flor (feliz): Ajá.
Porque desde acá se ve todo. Los techos de teja bajando en escalera, las paredes blancas puestas unas encima de otras, la torre de una iglesia asomando entre medio, y detrás los cerros enormes y pelados con el sol metiéndose justo detrás de uno de ellos.
Y todo está anaranjado. Las paredes, el polvo, la ropa tendida, tus manos.
flor (seria): Ya sé. Grabo mil videos de mates y lo que debería grabar es esto.
Se sienta en el borde con las piernas colgando.
ariel (curioso): ¿Y por qué no?
flor (seria): Porque no se puede. Lo he intentado como cien veces. Sale una foto de una ciudad naranja. Y no es eso.
Da una palmadita al cemento a su lado para que te sientes.
ariel (curioso): ¿Qué es?
flor (seria): Es esto. Y esto no cabe en el celular.
Hace un gesto que abarca todo. Se sientan. Ella saca el celular y empieza a pasar las tomas.
flor (seria): Mira esta. Movida.
ariel (neutral): Movida.
flor (seria): Esta también.
ariel (neutral): Esa está bien.
flor (burla): Está bien pero se ve mi dedo.
ariel (feliz): Ah, cierto.
flor (feliz): Y esta... esta es la buena.
Se quedan mirando la toma catorce en la pantalla chiquita, con el mate en el alféizar y el cerro borroso atrás.
ariel (feliz): Sí es la buena.
flor (feliz): Es la buena.
Baja el celular a su falda. Y se queda mirando el cerro real, el de verdad, el que está enfrente.
flor (seria): Ariel.
ariel (neutral): Ya.
flor (nervioso): Te tengo que confesar algo.

# ===============================================================
== confesion
ariel (nervioso): Ay.
flor (nervioso): No es grave. O sea, es grave para mí.
Se ríe, nerviosa.
ariel (neutral): Ya.
flor (nervioso): Cuando te vimos hoy en la mañana. En la puerta. Con Puku. Amaru y yo hablamos en quechua, ¿te acuerdas?
ariel (neutral): Me acuerdo.
flor (rojo): Yo dije que eras gringo.
Silencio.
ariel (neutral): Lo escuché.
flor (sorpresa): ¿ESCUCHASTE?
ariel (neutral): Escuché la palabra. No entendí nada más, pero esa la entendí.
Flor se tapa la cara con las dos manos.
flor (rojo): Ay no.
ariel (feliz): No pasa nada.
flor (triste): Sí pasa. Y lo peor es que Amaru dijo que no. Dijo "no le veo cara de gringo". Y yo insistí. Yo dije "mírale los ojos".
ariel (neutral): Ya.
flor (rojo): Y después me dijiste allinllachu y me quise morir.
Te ríes.
flor (molesto): No te rías, me quise morir de verdad.
ariel (feliz): Está bien.
flor (triste): No está bien. Yo odio que me hagan eso a mí.
Se abraza las rodillas.
ariel (curioso): ¿Qué te hacen?
flor (triste): Ya me está pasando. Fui a Lima en agosto para el examen. Cinco días. Y en cinco días me preguntaron como ocho veces de dónde era.
Mira el cerro.
ariel (neutral): Bueno, eso lo preguntan siempre...
flor (seria): No así. No preguntan "¿de dónde eres?". Preguntan "¿DE DÓNDE ERES?". Con la cara. Y cuando dices Ayacucho hacen "aaah" y ya saben todo lo que necesitan saber de ti.
Voltea.
ariel (triste): ...
flor (triste): Una chica me dijo que hablaba bonito el español. Bonito. Como sorprendida.
Se ríe sin gracia.
ariel (triste): Uf.
flor (triste): Y yo me reí. Ese es el problema. Me reí y dije gracias. Porque qué vas a hacer.
Se encoge de hombros. Un silencio. Abajo, alguien está barriendo.
flor (seria): Y entonces hoy te hice lo mismo a ti. En mi propia calle. A alguien que nació acá.
ariel (neutral): No es lo mismo.
flor (seria): Es lo mismo pero al revés.
ariel (neutral): Sí. Es lo mismo pero al revés.
Lo piensas.
flor (seria): A ti te dicen gringo acá y a mí me van a decir serrana allá. Y los dos somos de acá. Los dos. Y a los dos nos van a hacer explicar de dónde somos toda la vida.
Levanta las cejas.
@fondo azotea_noche
El sol termina de meterse detrás del cerro. Todo se pone morado de golpe, como si alguien hubiera cambiado un filtro.
flor (feliz): Oye, pero yo te quería decir otra cosa.
ariel (neutral): Ya.
flor (feliz): Lo de hoy. Lo del video. Tú tienes buen ojo.
Se acomoda para mirarte de frente.
ariel (nervioso): Fue suerte.
[si fondo_elegido == ventana] flor (seria): No fue suerte. Yo tenía el mate en una mesa fea y tú dijiste ponlo en la ventana. Y era obvio cuando lo dijiste, pero yo no lo vi.
[si fondo_elegido != ventana] flor (seria): No fue suerte. Tu primer fondo era horrible, ah. Pero cuando no funcionó, tú dijiste ponlo en la ventana. Y era obvio cuando lo dijiste, pero yo no lo vi.
flor (seria): Eso no se aprende. O lo tienes o no lo tienes.
ariel (feliz): Gracias.
flor (burla): Sulpayki.
ariel (feliz): Sulpayki.
flor (feliz): Imamanta. Y ojo que eso fue nivel dos.
Ladea la cabeza.
ariel (curioso): ¿Qué cosa?
flor (burla): El cumplido. Nivel dos de la escala. No te emociones.
Levanta un dedo.
ariel (molesto): No me estaba emocionando.
flor (burla): Un poquito sí.
ariel (nervioso): Un poquito sí.
Lo admites. Y los dos se ríen, y ella se pasa la mano por el pelo, y de pronto se queda callada y se le va la sonrisa, y mira otra vez los techos.
flor (seria): Ariel.
ariel (neutral): Ya.
flor (seria): ¿Te puedo decir algo que no le he dicho a nadie?
* Sí. -> no_quiero_irme

# ===============================================================
== no_quiero_irme
ariel (neutral): Sí.
Flor no habla al toque. Se queda mirando los techos, que ya están grises, y se agarra las rodillas más fuerte.
flor (triste): No quiero irme.
Silencio.
ariel (sorpresa): ...¿A Lima?
flor (triste): A Lima. A la universidad. A nada. No quiero irme.
Se le sale rápido, como quien se saca una venda.
ariel (curioso): Pero ingresaste.
flor (triste): Ingresé. Y estudié un año entero para ingresar, y lloré cuando salió la lista, y mi mamá lloró, y mi tía llamó a todo el mundo. Y todo eso fue verdad. Yo estaba feliz de verdad.
Traga.
ariel (neutral): Ya.
flor (triste): Y como a la semana me desperté y pensé: en marzo ya no vivo acá.
Se le quiebra un poquito al final.
flor (triste): Y desde ese día no se me quita.
No dices nada. Te parece que decir algo sería peor.
flor (triste): Y no puedo decirlo. ¿A quién? ¿A mi mamá, que anda contándole a las señoras del mercado? ¿A mi tía, que me dijo que soy la primera de la familia?
Se ríe sin ganas.
flor (triste): ¿A Amaru, que está pagándose una academia con lo que gana arreglando parlantes para poder postular a algo que ni sabe si quiere? ¿A él le voy a decir que no quiero mi vacante?
ariel (triste): ...
flor (triste): Se vería horrible. Se vería como una malcriada.
ariel (neutral): No se vería así.
flor (triste): Se vería exactamente así. Todos se mataron por esto. Yo me maté por esto. Y ahora resulta que la quiero devolver.
Se seca un ojo con la manga, rápido, como quien no quiere que se note.
ariel (curioso): ¿Y por qué no quieres ir?
flor (seria): Ese es el tema. Que no tengo una razón buena.
Levanta las manos.
ariel (neutral): A ver.
flor (triste): No es que tenga miedo, o sea sí tengo miedo, pero no es eso. Es que me gusta acá.
Se muerde el labio.
ariel (neutral): Ya.
flor (feliz): Me gusta acá. Me gusta mi casa. Me gusta que doña Nati sepa quién soy. Me gusta que don Hilario le baje el precio a mi mamá. Me gusta subir a esta azotea. Me gusta que mi tía venga de visita y cocinen para treinta.
Se le atropellan las palabras.
flor (triste): Me gusta el ruido de mi casa, y en Lima voy a estar en un cuarto alquilado en Pueblo Libre con dos personas que no conozco.
ariel (triste): ...
flor (triste): Y esa no es una razón. Esa es una tontería.
ariel (neutral): No es una tontería.
flor (molesto): Es una tontería, Ariel. Nadie deja de estudiar por eso.
ariel (neutral): No dije que dejaras de estudiar. Dije que no es una tontería.
Flor voltea a mirarte.
ariel (neutral): Yo crecí sin eso.
flor (curioso): ¿Sin qué?
ariel (neutral): Sin que nadie sepa quién soy. En mi edificio no conozco a nadie. O sea, sé sus caras, pero no sé sus nombres. Vivimos con mi mamá en el mismo sitio hace catorce años y no sé cómo se llama la señora del quinto.
Miras los techos.
flor (triste): Ay.
ariel (feliz): Y hoy llegué acá, y en seis horas doña Nati sabía qué compré, tu tía sabía quién era mi mamá, y un señor de ferretería me dijo en la cara que tengo acento de Lima.
Flor se ríe. Con la nariz llena.
flor (risa): Don Hilario.
ariel (feliz): Don Hilario.
flor (risa): Es terrible.
ariel (feliz): Es terrible. Y no sabes lo raro que se siente que alguien sepa quién eres.
Un silencio. Se está poniendo azul oscuro. Se prende una luz en una casa, y después otra.
@si amaru_sabe_becas != 1 -> azotea_no_sabia
flor (triste): Ahí está la cosa. Que tú te estás yendo a Estados Unidos, que es lejísimos, y estás aprendiendo quechua. Y yo me voy a Lima y en Lima voy a dejar de hablarlo.
@ir azotea_por_que

== azotea_no_sabia
flor (curioso): Oye. Tú también estás en sabático, ¿no? ¿Y después?
ariel (nervioso): Estoy postulando a Estados Unidos.
flor (sorpresa): ¿A ESTADOS UNIDOS? ¿Y recién me lo dices?
Se le olvida por un segundo que estaba llorando.
ariel (nervioso): No salió el tema.
flor (molesto): ¡Siempre sale el tema!
Y después se le acomoda la cara.
flor (triste): Ahí está la cosa, entonces. Que tú te estás yendo a Estados Unidos, que es lejísimos, y estás aprendiendo quechua. Y yo me voy a Lima y en Lima voy a dejar de hablarlo.

== azotea_por_que
ariel (curioso): ¿Por qué?
flor (triste): Porque con quién. Acá lo hablo con mi mamá, con mi tía, con mis primos, con la vecina. Allá... con nadie.
Se encoge de hombros. Hace un gesto vacío.
ariel (neutral): Con Amaru por teléfono.
flor (burla): Amaru contesta con dos palabras.
ariel (feliz): Es verdad.
flor (risa): Es tan verdad.
ariel (curioso): Oye, pero mira esto. Es raro, ¿no?
Se te ocurre a medio camino.
flor (curioso): ¿Qué cosa?
ariel (neutral): Que yo lo esté aprendiendo justo cuando tú lo vas a dejar de usar.
Flor se queda quieta.
flor (triste): Ay.
ariel (curioso): ¿Qué?
flor (triste): Que eso está feo y bonito al mismo tiempo. Odio cuando pasa eso.
Se seca la cara con las dos manos.

# ===============================================================
== killa
Y entonces, sin pensarlo, levantas la barbilla hacia el cielo, justo encima del cerro donde se metió el sol, donde acaba de aparecer una uña de luna, finísima, bajita, siguiendo al sol.
ariel (curioso): Oye. ¿Cómo se dice luna?
flor (seria): Killa.
ariel (sorpresa): Ah, como mes.
flor (seria): Como mes. Es la misma palabra.
Mira arriba.
ariel (curioso): ¿Y eso por qué?
flor (seria): Porque el mes es la luna, pues. Cuentas lunas y esos son tus meses. No es que se parezcan, es que es lo mismo.
Se encoge de hombros como si fuera lo más obvio del mundo. Te quedas con eso.
ariel (neutral): Entonces cada vez que dices el mes estás diciendo la luna.
flor (seria): Ajá.
ariel (neutral): Aunque no la veas.
Flor voltea despacio. Y se queda mirándote un rato largo, con la cara medio destruida de haber llorado un poquito y medio iluminada de haber entendido algo.
flor (triste): Ay, Ariel.
ariel (curioso): ¿Qué?
flor (triste): Que allá no la voy a ver.
ariel (triste): ...
flor (triste): En Lima el cielo está tapado siempre. Y voy a seguir contando los meses igual.
Vuelve a mirar arriba. Y después, más bajo:
flor (triste): Voy a seguir diciendo killa aunque no la vea.
@sfx vibrar.wav
Y ahí, en la azotea, con la ciudad prendiéndose abajo, tu celular empieza a vibrar.
Y vibra. Y vuelve a vibrar. Y no para.

# ===============================================================
== menu_azotea
El celular sigue vibrando en tu bolsillo. Todavía no lo sacas.
Flor se está secando la cara con la manga, mirando hacia otro lado para que no la veas hacerlo.
Tienes unos segundos antes de contestar. ¿Qué haces?
* «Espera. Tengo algo para ti.» -> azotea_ringpop [si c_ringpop == 1]
* «Miski.» -> azotea_miski
* «Mándame el video cuando lo edites.» -> azotea_video
* «Puedes volver, ¿no?» -> azotea_volver
* «Yo también tengo miedo.» -> azotea_asustado
* No decir nada. Solo quedarte ahí. -> azotea_silencio
* Contestar el teléfono -> la_llamada

# ---------------------------------------------------------------
== azotea_ringpop
@var tema_azotea = ringpop
@var dio_ringpop = 1
ariel (nervioso): Espera. Tengo algo para ti.
flor (curioso): ¿Ah?
Hurgas en la bolsa del kiosko. Y ahí, en la penumbra, tus dedos encuentran el plástico duro. Lo sacas.
Flor se queda mirándolo dos segundos enteros. Y después suelta una carcajada tan fuerte que se le va la voz y tiene que agarrarse del borde de la azotea.
flor (risa): ¡AY! ¡AY, NO!
ariel (nervioso): Es un caramelo.
flor (risa): ¡YA SÉ QUE ES UN CARAMELO!
ariel (nervioso): Es literalmente el único formato en que los venden...
flor (risa): ¡ARIEL! ¡Ay, no puedo!
Se seca los ojos, que ahora están húmedos por otra razón.
Se lo pasas. Ella lo agarra con las dos manos, se lo pone en el dedo, lo levanta a la luz de la casa de al lado y lo hace girar como en las películas.
flor (feliz): Ay, es hermoso.
ariel (feliz): Es de fresa.
flor (feliz): Es hermoso.
Y después baja la mano y se queda mirándolo, todavía sonriendo, pero con los ojos otra vez brillantes.
flor (triste): Nadie me ha regalado nada hoy.
ariel (neutral): Es un caramelo de dos cincuenta.
flor (triste): Ya sé. Igual.
Se lo saca del dedo y lo aprieta en el puño. Silencio.
Y entonces se le prende algo en la cara.
flor (sorpresa): Espérate. ¿Esto lo compraste donde doña Nati?
ariel (nervioso): ...Sí.
flor (sorpresa): ¿Y ella lo vio?
ariel (nervioso): ...Sí.
Flor abre la boca y no sale nada durante como cuatro segundos.
flor (seria): Ariel.
ariel (nervioso): ¿Qué?
flor (seria): Doña Nati es la madrina de Amaru.
ariel (sorpresa): ...No.
flor (seria): Sí.
ariel (sorpresa): No me digas.
flor (rojo): Para mañana lo sabe mi mamá. Ay, y va a ser peor, porque mi mamá va a pensar que es para mí.
Se lleva las manos a la cara.
ariel (neutral): Es para ti.
flor (risa): ¡YA SÉ QUE ES PARA MÍ! ¡Pero mi mamá lo va a pensar como mamá! ¡Que es distinto!
Y sigue riéndose, y llorando un poquito, y apretando el Ring Pop en el puño, y no te lo devuelve.
* Contestar. -> la_llamada

# ---------------------------------------------------------------
== azotea_miski
@var tema_azotea = miski
ariel (neutral): Miski.
Flor se queda quieta.
flor (sorpresa): ...¿Qué?
ariel (neutral): Nada. Solo quería decirlo.
flor (curioso): ¿Por qué?
ariel (neutral): Porque dijiste que ese sí te gusta.
Se le pone la cara rara. No sabes leerla al principio: como si estuviera decidiendo entre hacer un chiste o no hacerlo. Y no lo hace.
flor (triste): Nadie me dice así.
ariel (sorpresa): ¿Nadie?
flor (triste): Mi abuelita me decía. Ella me lo puso. Después ya no. Mi mamá me dice Flor, mis primos me dicen Flor, en el colegio Flor. Amaru me dice Flor cuando está normal y María cuando está molesto.
Se abraza las rodillas.
ariel (curioso): ¿María?
flor (burla): María es el peor. María es "estás en problemas". Nadie usa Miski.
Media sonrisa.
ariel (feliz): Yo lo voy a usar.
flor (rojo): Ay, no.
ariel (curioso): ¿Por qué no?
flor (triste): Porque ahorita estoy sensible y me vas a hacer llorar otra vez.
Y se le rompe la voz justo en "otra vez", lo cual arruina completamente su argumento.
ariel (nervioso): Perdón.
flor (triste): No te disculpes. Ay, ya. Dilo otra vez.
Se limpia con la manga.
ariel (curioso): ¿Segura?
flor (seria): Dilo.
ariel (feliz): Miski.
flor (risa): Ya. Ya está. Ya me arruinaste.
Se ríe con la nariz tapada.
* Contestar. -> la_llamada

# ---------------------------------------------------------------
== azotea_video
@var tema_azotea = video
ariel (feliz): Mándame el video cuando lo edites.
Flor levanta la cara.
flor (sorpresa): ¿En serio?
ariel (feliz): Obvio.
flor (nervioso): No es la gran cosa. Son treinta segundos de un mate girando.
ariel (feliz): Quiero verlo.
flor (nervioso): Es para la tienda de la mamá de mi amiga. Lo van a ver como cuarenta personas.
ariel (burla): Cuarenta y uno.
Se ríe, medio ahogada.
flor (risa): Ay, ya.
ariel (feliz): Y me avisas cuando lo subas.
flor (feliz): Te aviso. Ya. Recordatorio puesto. "Mandarle el video a Ariel."
Saca el celular y escribe algo, ahí mismo, delante de ti.
ariel (sorpresa): ¿Le pusiste alarma?
flor (seria): Le puse alarma.
ariel (burla): Es un video de treinta segundos.
flor (seria): Le puse alarma.
Lo repite, y guarda el celular. Y después, mirando los techos:
flor (seria): Es la primera vez que alguien me pide ver algo que hice.
Y lo dice tan tranquila, tan sin peso, que te toma un segundo darte cuenta de lo triste que es.
* Contestar. -> la_llamada

# ---------------------------------------------------------------
== azotea_volver
@var tema_azotea = volver
ariel (neutral): Puedes volver, ¿no?
Flor asiente despacio.
flor (seria): Sí. Puedo volver.
ariel (neutral): O sea, hay vacaciones. Julio, enero. Feriados largos.
flor (seria): Ajá.
ariel (neutral): No es que te vayas para siempre.
flor (triste): Ajá. Eso me dice todo el mundo.
Se queda callada un momento.
ariel (nervioso): Ah.
flor (seria): No, está bien. Es verdad. Es que "puedes volver" es distinto de "vivir acá".
Se encoge de hombros.
ariel (neutral): ...Ya.
flor (triste): Cuando vuelves de visita todos te tratan bien, te cocinan, te preguntan cómo te va. Y eso es lindo. Pero ya eres visita. Ya no sabes quién se mudó, quién se murió, quién puso una tienda nueva.
Mira los techos.
ariel (triste): ...
flor (triste): Mi tío el de Huancayo viene cada Navidad y todos lo quieren un montón. Y cada vez que viene cuenta las mismas tres historias. Porque las nuevas ya no las tiene.
Y se queda mirando la ciudad prendiéndose.
flor (triste): Yo no quiero volver de visita a mi propia casa.
* Contestar. -> la_llamada

# ---------------------------------------------------------------
== azotea_asustado
@var tema_azotea = asustado
ariel (triste): Yo también tengo miedo.
Flor voltea.
flor (sorpresa): ¿Tú?
ariel (triste): Yo.
flor (curioso): Pero tú te vas a Estados Unidos.
ariel (triste): Por eso.
flor (triste): ...Ah. Cierto. Ay, cierto.
Se acomoda.
ariel (triste): Tú te vas a Lima, que está a nueve horas en carro y donde vive gente que habla tu idioma. Yo me voy a un sitio donde no conozco a nadie, en otro idioma, y ni siquiera sé si voy a entrar.
Te frotas las manos.
flor (triste): Ay.
ariel (triste): Y si entro, me voy sin nadie. Mi mamá se queda.
Flor no dice nada. Solo se acerca un poquito en el borde de la azotea, hombro con hombro, que es su manera de decir cosas.
flor (curioso): ¿Y qué es lo que más te asusta?
Lo piensas.
ariel (triste): Que allá voy a ser "from Peru". Nada más que eso. Acá soy Ariel. Allá voy a ser "from Peru" y ya.
flor (triste): Uf.
ariel (curioso): ¿Qué?
flor (triste): Nada, es que... es lo mismo pero peor.
Se ríe sin gracia.
ariel (curioso): ¿Cómo?
flor (triste): Que yo también voy a ser una cosa nomás. Yo tengo terror de que me digan chola.
Junta las manos. Silencio.
flor (seria): Y no "serrana", que también lo dicen, pero al menos te lo dicen de frente. Chola es otra cosa. Chola te lo dicen cuando ya decidieron todo sobre ti.
Se le endurece un poco la voz.
ariel (triste): ...
flor (triste): Y lo peor es que ni siquiera lo van a decir. Lo van a pensar y van a ser amables. Y tú te vas a pasar cuatro años sin saber cuál de todos lo pensó.
Mira sus manos.
Y ahí no tienes nada que decir, porque no lo tienes. Así que solo te quedas.
flor (nervioso): Perdón. Se puso feo esto.
Lo dice después de un rato.
ariel (neutral): No te disculpes.
flor (triste): Es que era una azotea bonita.
ariel (feliz): Sigue siendo una azotea bonita.
* Contestar. -> la_llamada

# ---------------------------------------------------------------
== azotea_silencio
@var tema_azotea = silencio
No dices nada.
Te quedas ahí, en el borde, con las piernas colgando al lado de las de ella, mirando la ciudad prenderse abajo.
Flor se seca la cara con la manga. Respira hondo dos veces. Y como no dices nada, sigue.
flor (triste): Y lo peor es que ya pagué la matrícula. O sea, mi mamá pagó. Con lo del terreno de mi abuelita.
ariel (triste): ...
flor (triste): Y cada vez que pienso "no quiero ir" me acuerdo de ese papel.
ariel (triste): ...
flor (molesto): Y después me da cólera conmigo misma, porque hay gente que se mataría por lo que yo tengo y yo estoy acá llorando en mi azotea como una malcriada.
ariel (triste): ...
flor (triste): ...
flor (feliz): Gracias.
Lo dice al rato.
ariel (curioso): No dije nada.
flor (feliz): Ya sé. Por eso.
Se limpia la nariz. Y se quedan ahí, sin decir nada más, hasta que se prenden todas las luces de la ladera.
* Contestar. -> la_llamada

# ===============================================================
== la_llamada
[si tema_azotea != ninguno] El celular no para. Ya no puedes seguir ignorándolo.
Sacas el celular. La pantalla te da en la cara y los dos parpadean.
Mamá, llamada perdida. Cinco veces.
Y encima, entrando ahora, la sexta. Contestas.
mama (seria): ¡ARIEL!
ariel (nervioso): ¡Hola ma...!
mama (seria): ¡¿DÓNDE ESTÁS?!
ariel (nervioso): Estoy...
mama (seria): ¡ESTOY EN LA CASA DE LOS QUISPE Y NO ESTÁS!
Miras a Flor. Flor te mira a ti. Los dos entienden al mismo tiempo.
ariel (neutral): Ma. Estoy arriba.
mama (seria): ¿ARRIBA DÓNDE?
ariel (neutral): En la azotea. La de acá. De esta casa.
Pausa.
mama (seria): ...¿Estás en la azotea?
ariel (neutral): Sí.
Y del otro lado escuchas a tu mamá alejar el teléfono y decirle a alguien, en quechua, algo que termina con la palabra "azotea" en español.
Y después escuchas a la mamá de Flor gritar:
senora (molesto): ¡FLOR! ¡BAJEN!
Y a Flor, al lado tuyo, gritar hacia abajo:
flor (feliz): ¡YA VAMOS!
Y tu mamá, en el teléfono, riéndose:
mama (feliz): Ay, wawa. Baja pues.
Cuelga.
Flor se para, se sacude el pantalón y te estira la mano para ayudarte a levantar.
flor (feliz): Haku.
* Haku. -> el_patio

# ===============================================================
== el_patio
@fondo casa_patio_noche
Bajan la escalera de cemento sin baranda, Flor adelante, saltando los escalones de dos en dos con una seguridad que a ti te da vértigo.
El patio está lleno.
Tu mamá sentada en una silla verde con una taza. La mamá de Flor al lado, agarrándole el brazo. La tía. Tres primos que no conoces. El parlante bluetooth de siempre sonando; los dos grandes, todavía mudos contra la pared. Puku despierto y furioso.
Y en el rincón de la mesa de herramientas, Amaru. De espaldas. Agachado sobre un parlante con el cautín en la mano.
Flor lo ve y frena en seco.
flor (sorpresa): Ay no.
ariel (curioso): ¿Qué?
flor (molesto): Sigue en eso. ¡AMARU!
Camina hacia él.
amaru (molesto): No.
flor (molesto): ¡Todavía estás con eso!
amaru (molesto): No.
flor (molesto): ¡Ya es de noche!
Amaru se endereza. Tiene el pelo parado de un lado, una mancha negra en la mejilla, al lado de la curita, y la cara de alguien que ha tenido una relación personal muy larga con un objeto inanimado.
amaru (triste): No era el cable.
flor (sorpresa): ¿Cómo que no era el cable?
amaru (triste): No era el cable.
flor (molesto): ¡Siempre es el cable!
amaru (molesto): ¡ESO DIJE YO! ¡Eso dije yo hace dos horas! ¡Y no era!
Levanta las dos manos, y en una todavía tiene el cautín, lo cual hace que dos primos se echen para atrás.
flor (curioso): ¿Y qué era?
amaru (neutral): El otro cable.
Silencio.
flor (seria): Amaru.
amaru (seria): Es distinto.
flor (seria): Es un cable.
amaru (seria): Es el otro cable. Ariel. Dile. Es distinto.
Se voltea hacia ti, buscando apoyo en la única persona disponible.
ariel (nervioso): Yo no sé nada de cables.
amaru (molesto): Es distinto. Uno es de señal y el otro es de corriente. No son el mismo problema. No son la misma familia de problema.
Insiste, hablándole al aire.
flor (molesto): ¡PERO ES UN CABLE!
amaru (molesto): ¡ES OTRO CABLE!
Y ahí Flor se detiene. Se le acomoda algo en la cara. Se acerca dos pasos.
flor (curioso): Amaru.
amaru (neutral): Qué.
flor (curioso): ¿Por qué tienes tierra en la mejilla?
amaru (neutral): Es estaño.
flor (burla): El estaño es plateado.
amaru (neutral): Es humo de estaño.
flor (burla): El humo no se pega.
amaru (seria): Este humo sí.
Flor se voltea hacia la mesa, donde está tu mamá, y sube la voz:
flor (burla): ¡Señora Rosa! ¡Mire a este! ¡Se pasó la tarde con un cable!
mama (feliz): ¡Ay, qué lindo!
flor (molesto): ¡No es lindo! ¡Estuvo dos horas con un cable!
senora (feliz): ¡Es trabajador!
flor (molesto): ¡Es obsesivo!
senora (feliz): ¡Es trabajador!
Lo repite, y le da una palmada en el hombro a Amaru al pasar, y Amaru pone la cara de alguien que acaba de ganar un juicio que no estaba peleando.
Y entonces Amaru te mira a ti. Directo. Y en un tono absolutamente plano dice:
amaru (neutral): ¿Y ustedes qué hicieron?
Flor abre la boca.
flor (feliz): Grabamos el video.
amaru (neutral): Dos horas.
flor (feliz): Salió bien.
amaru (neutral): Dos horas para treinta segundos.
flor (seria): Es un proceso.
amaru (neutral): Ajá.
flor (molesto): ¡ES UN PROCESO!
amaru (neutral): Yo también tuve un proceso, y a mí me dijeron obsesivo.
Señala el parlante.
flor (molesto): ¡Es distinto!
amaru (neutral): Es exactamente lo mismo.
Y ahí los dos se callan al mismo tiempo, mirándose, con la incomodidad de dos personas que acaban de descubrir en público que son la misma persona.
flor (rojo): ...Ya.
amaru (rojo): Ya.
flor (rojo): No hablemos de esto.
amaru (rojo): No hablemos de esto.
Amaru apaga el cautín. Se limpia la mano en el pantalón. Y mientras camina hacia la mesa, pasa al lado tuyo y dice, bajito, sin voltear:
amaru (neutral): ¿Lloró?
ariel (nervioso): ...Un poquito.
amaru (neutral): Ajá. Siempre llora en la azotea.
Sigue caminando.
flor (molesto): ¡TE ESCUCHÉ!
amaru (neutral): ¡QUERÍA QUE ESCUCHARAS!
Y Puku, encima de todo:
puku: ¡LORO!
Los tres al mismo tiempo: "Cállate, Puku".
@si tema_azotea != ringpop -> patio_mama
Amaru, ya sentado, mira el puño cerrado de su hermana. Mira el anillo de caramelo que asoma entre sus dedos. Te mira a ti.
amaru (seria): No pregunto.
Flor y tú al mismo tiempo: "No preguntes".

== patio_mama
Y tu mamá, en medio de todo eso, te agarra del brazo y te sienta a su lado.
mama (feliz): Ay, wawa. ¿Comiste?
Todavía se está riendo.
ariel (feliz): Comí un montón.
mama (feliz): ¿Te portaste bien?
ariel (feliz): Sí.
Te mira, y se le ve la taza humeando entre las manos, y la cara distinta que tiene desde que llegó a esta ciudad.
mama (burla): Mmm. ¿Y qué tanto has aprendido?
Y lo dice medio en broma, sin esperar respuesta.
@capitulo final
`);
