// =====================================================================
// CAPÍTULO 1 — Llegada, la plaza, el loro, los hermanos, la ferretería.
// Formato (ver LEEME.md):
//   == etiqueta            marca un lugar al que se puede saltar
//   personaje (emocion): texto     diálogo (el busto cambia según la emoción)
//   texto suelto           narración
//   * Opción -> etiqueta   opción del jugador (varias seguidas = un menú)
//   @comando ...           fondo, cuadro, musica, sfx, aprender, guardar, explorar, ir, etc.
//   # comentario
// OJO: no uses el acento grave ` dentro del texto.
// =====================================================================
GUION.registrar('cap01', String.raw`

@tarjeta Capítulo 1 | La carretera
@fondo off
@animacion carro
@musica carretera.mp3
@limpiar
@esperar 7000

# --- el carro solo, sin nada encima (sube o baja el 7000 de arriba: son milisegundos) ---
La carretera sube en curvas que parecen dibujadas por alguien con rencor. Cada vez que el carro se ladea, algo dentro de ti se ladea medio segundo después, y ese medio segundo es el problema.
@limpiar
@esperar 1500
Adelante, tu mamá y el conductor van en quechua desde hace como veinte minutos. No entiendes nada, pero entiendes el ritmo: ella dice algo largo, él responde con dos sílabas, los dos se ríen.
Hay una manera de reírse que tu mamá solo tiene acá, en el carro, saliendo de Lima. Más suelta. Como si en Lima hablara con el cuerpo un poco encogido y recién ahora lo estirara.
@limpiar
@esperar 1500
Escuchas "Ayacucho" en medio de la frase, y después algo con "terreno", y después otra vez puro quechua.

# --- recién acá entramos al carro y aparece la ilustración ---
@cuadro ariel_ventana
En tu celular tienes las notas abiertas:
@aprender rimaykullayki allinllachu allinmi imataq_sutiyki sutiymi sulpayki
celular: rimaykullayki — buenos días / saludo formal
celular: allinllachu? — ¿estás bien? (= hola)
celular: allinmi — estoy bien
celular: imataq sutiyki? — ¿cómo te llamas?
celular: ñuqapa sutiymi Ariel — me llamo Ariel
celular: sulpayki — gracias
Las repites mentalmente. Ri-may-ku-llay-ki. Suena a algo que se enrolla. Intentas moverlo con los labios sin sonido, porque si tu mamá te escucha va a girar la cabeza y va a poner esa cara.

# --- el mareo ---
@sfx nausea.mp3
@cuadro ariel_nausea
Una curva más cerrada. El estómago te sube hasta el pecho.

# --- vuelve el carro y hablan con bustos ---
@cuadro off
mama (seria): Baja la luna un poco, wawa. Estás verde. Respira por la nariz.
ariel (nausea): Estoy bien.
mama (seria): Estás verde.
Le dice algo al conductor en quechua. El hombre se ríe otra vez y afloja un poco la velocidad.
Bajas la ventana dos dedos. Entra un aire frío, seco, con olor a eucalipto y a tierra removida, un olor que no conoces pero que tu cuerpo parece reconocer de algún lado, de esas dos veces que viniste cuando eras peque y no recuerdas casi nada. Solo un patio. Un perro amarillo. Nada más.
Afuera, los cerros son enormes y pelados y bonitos de una manera que no sabes explicar todavía.
Cierras los ojos y vuelves a la lista. Allinllachu. Allinllachu. Te imaginas diciéndoselo a alguien más tarde, a alguna tía, a algún primo lejano que no vas a reconocer. Te imaginas la cara que pondrían.
Al rato el motor cambia de tono. Empiezan a aparecer casas, un grifo, un letrero pintado a mano, gente caminando por la berma. El conductor dice algo y tu mamá te toca la rodilla por encima del asiento.
mama (feliz): Ya estamos entrando. Un ratito nomás.
ariel (neutral): Ya, mamá.
Apoyas la frente contra el vidrio y cierras los ojos. El vidrio está frío y vibra un poquito con el motor, y por alguna razón eso ayuda más que cualquier otra cosa.
Las voces de adelante se vuelven un murmullo con forma, sin palabras: la de tu mamá subiendo al final de las frases, la del conductor bajando siempre.
En algún momento el sueño te gana a medias. No del todo. Lo suficiente para que el estómago te suelte.
@fondo ciudad_entrada
Cuando abres los ojos ya están entrando de verdad. Casas de dos pisos con las varillas de fierro saliendo del techo, esperando un tercer piso que quizás nunca llegue. Un mototaxi rojo que se les cruza sin mirar.
Mujeres con sombrero de ala ancha y falda ancha caminando por el borde de la pista con una naturalidad que no tiene nada que ver con el turismo. Un letrero: Se vende chicha de jora. Otro: Jr. 28 de Julio.
Y la luz. Es otra luz. Como si alguien le hubiera subido el contraste al mundo.
mama (feliz): Ariel. Mira esa iglesia. Ahí me bautizaron.
@sfx wand.mp3
@cuadro iglesia
Miras. Es de piedra rosada, enorme, con dos torres.

# ---------------------------------------------------------------
== plaza_llegada
@animacion off
@cuadro off
@fondo plaza
@musica plaza.mp3
El carro los deja cerca de la plaza. Bajas y las piernas te tiemblan como si el piso todavía se moviera, pero el aire de acá afuera te arregla en diez segundos: seco, delgado, con un frío que no es el frío pegajoso de Lima.
Respiras hondo y hasta te da un poco de risa lo bien que se siente.
Tu mamá ya está sacando papeles del bolso, contándolos con el pulgar. Modo trámite.
mama (seria): Voy a la notaría. Es acá nomás, en la esquina, pero puede demorar. ¿Te vienes o te quedas?
Sientes el celular en el bolsillo con las palabras adentro. Allinllachu. Rimaykullayki. La plaza está ahí, llena de gente y de palmeras chiquitas y de un sonido general que quieres escuchar mejor.
* Me quedo acá -> plaza_quedarse
* Voy contigo -> plaza_acompanar

== plaza_quedarse
ariel (neutral): Voy a dar una vuelta, ma.
mama (burla): Ya. No te pierdas, ah. Y no te vayas a comprar cualquier cosa en la calle que te va a caer mal.
mama (seria): Media hora. Y contesta el celular.
@ir plaza_lonche

== plaza_acompanar
ariel (nervioso): Quiero ir contigo.
Te mira con una ceja levantada, todavía agarrando su cartera contra el pecho.
mama (seria): ¿A dónde vas a ir tú? No conoces por acá, Ariel. Te vas a perder en dos cuadras.
ariel (neutral): No me voy a perder. Quiero acompañarte.
Suelta una risa corta, de esas que le salen del pecho, sacudiendo la cabeza.
mama (burla): Te conozco. A la media hora te vas a aburrir, vas a estar mirando el reloj y quejándote de que te duelen los pies con esas zapatillas delgadas que te has traído de Lima.
mama (seria): Anda siéntate por la plaza nomás. Media hora. Y contesta el celular.
@ir plaza_lonche

== plaza_lonche
Saca el celular de la cartera con una agilidad que no le ves en la casa. Sus dedos van directo a la pantalla, y dos segundos después el tuyo vibra en el bolsillo.
@yape +15 Rosa Quispe
mama (burla): Cómprate un lonche por ahí. Un pan con queso, un mate caliente para que se te asiente la barriga.
Cierra la puerta del carro de un golpe seco. La ves cruzar la pista afirmando los pasos sobre la tierra, saludando con la cabeza a una señora que vende panes en una canasta.
La plaza es un cuadrado perfecto con un montón de cosas adentro. Camina, mira, y cuando quieras irte, baja por la abertura de los portales.
@guardar
@explorar plaza

# ----- cosas de la plaza (se activan con E; terminan con @volver) -----
== plaza_kiosko
Entras al kiosko. Huele a cartón y a caramelo. Hay revistas colgadas con pinzas, chicles, galletas, cigarros sueltos, una nevera con Inca Kola y chicha morada embotellada.
La señora te mira desde atrás del mostrador con cara de no tener ningún apuro.
@si agua == 1 -> plaza_kiosko_ya
Compras una botella de agua porque te da vergüenza salir sin comprar nada.
@yape -2 Kiosko de la plaza
@var agua = 1
@volver
== plaza_kiosko_ya
Ya tienes tu agua. La señora sigue sin apuro.
@volver

== plaza_iglesia
Piedra rosada, enorme, dos torres. Ahí bautizaron a tu mamá. Intentas imaginarla bebé y no puedes.
@volver

== plaza_monumento
El monumento del centro: un soldado a caballo sobre un bloque de piedra con placas, rodeado de una reja baja y de dos arbolitos podados en bola.
No sabes quién es. Hay un nombre en la placa que no alcanzas a leer desde acá.
@volver

== plaza_pileta
Una pileta de piedra con un chorro flaco. El agua suena poquito. Un perro toma de la orilla.
@volver

== plaza_senores
Señores sentados sin hacer absolutamente nada, con el sombrero puesto y las manos sobre las rodillas, como si esa fuera su ocupación oficial.
Uno te mira. Piensas en decir allinllachu. No lo dices.
@volver

== plaza_retablos
Una vitrina con retablos: cajitas de madera pintadas, llenas de figuritas diminutas de gente en una fiesta. Te acercas al vidrio.
Hay una fila de músicos del tamaño de una uña, cada uno con su instrumento.
@volver

== plaza_heladero
Un heladero empuja su carrito tocando la bocinita. Te acuerdas de lo que dijo tu mamá sobre comprar cosas en la calle.
@volver

== plaza_perro
Un perro flaco color caramelo, echado panza arriba en la mitad de la vereda, absolutamente entregado. La gente simplemente lo rodea.
@si perro_rascado == 1 -> plaza_perro_otravez
¿Le rascas la pancita?
* Sí -> plaza_perro_si
* Mejor no -> plaza_perro_no

== plaza_perro_si
@sfx bark.mp3
Te agachas y le rascas la panza. El perro estira una pata hacia el cielo y suelta un ladrido corto, que no es de susto ni de queja: es más bien un comentario.
No se levanta. No tiene la menor intención de levantarse.
@var perro_rascado = 1
@volver

== plaza_perro_no
Te quedas mirándolo un rato. Él te mira a ti, de cabeza, sin moverse ni un milímetro.
Sigues de largo con la leve sensación de haber dejado algo pendiente.
@volver

== plaza_perro_otravez
Sigue ahí, en la misma posición exacta, como si el rato que pasó no hubiera existido.
@volver

== plaza_gato
Un gato blanco y flaco está sentado al borde de la vereda, mirándote con esa seriedad que tienen los gatos cuando no van a hacer absolutamente nada.
Das un paso. El gato se levanta, estira las patas de adelante y se va caminando rápido, sin correr, como si tuviera un asunto pendiente del que recién se acuerda.
Lo sigues con la vista hasta que dobla por la abertura de los portales y desaparece en la bajada.
Te quedas mirando esa calle.
@volver

== plaza_notaria
La notaría. Adentro se ve una fila de sillas de plástico y tu mamá de espaldas, con los papeles. Mejor no molestar.
@volver

# ---------------------------------------------------------------
== perderse
@fondo calle_bajada
Sales. El sol te pega de frente, blanquísimo, y te tapas la cara con la mano, lo cual es ridículo porque al mismo tiempo tienes los brazos con piel de gallina del frío.
Así funciona acá, parece. El sol y el frío al mismo tiempo, sin ponerse de acuerdo.
Caminas. Miras una pared, porque tiene un color que no habías visto: un azul añil despintado, con una mancha de humedad que parece un mapa.
Después una puerta de madera vieja con un aldabón de fierro en forma de mano.
Después una escalera de piedra que sube entre dos casas y no sabes a dónde va, pero subes un poco solo para ver.
Después una calle angosta con el techo de teja y un cable de luz cruzando de un lado al otro, con zapatillas colgadas.
Después una tiendita con sacos abiertos de maíz de mil colores en la puerta: blanco gigante, morado, amarillo.
Después una escalera otra vez, o la misma, no sabes.
Después doblas por un pasaje porque escuchaste una radio sonando huayno y querías escuchar de dónde salía.
Y entonces te detienes.
@musica off
@fondo calle_loro
La radio ya no se escucha. La plaza tampoco. Estás en una calle empedrada y estrecha, en bajada, con casas de adobe pintadas de blanco y las esquinas de las puertas gastadas. No hay nadie.
Hay una carretilla vacía apoyada contra una pared. Hay una maceta con geranios rojos sobre un muro. Hay ropa tendida en un segundo piso.
Sacas el celular. Una raya de señal, que va y viene. El mapa gira sobre sí mismo tratando de decidir dónde estás y termina poniéndote un puntito azul gordo que abarca como cuatro cuadras.
Excelente.
Guardas el celular. Bueno. La plaza es hacia... ¿arriba? Fue todo bajada, ¿no? ¿O fue subida?
Y ahí, mientras sigues ahí de pie tratando de reconstruir tus últimos veinte minutos, escuchas algo raro. Muy cerca. Una voz chillona, aguda, que dice, clarísimo:
voz: ¡Loro! ¡Loro! ¡Ah! ¡Loro!
Volteas.

# ----- ESCENA DIBUJADA: el loro -----
@cuadro loro_encuentro
A tu izquierda, en la entrada de un patio abierto, colgada de un gancho bajo el alero, hay una jaula grande de fierro. Y adentro hay un loro verde brillante, con la cabeza ladeada, mirándote con un ojo redondo y amarillo.
Se mueve de lado por su palito. Te sigue mirando.
puku: ¡Loro!
ariel (sorpresa): ¡Ay! Me asustaste.
Das un paso atrás por reflejo, con la mano en el pecho, y el loro te mira con una satisfacción evidente. Cero arrepentimiento.
Te acercas otra vez, ya con curiosidad. Es un loro precioso, verde manzana con las plumas del ala más oscuras y unas rayitas amarillas cerca de la cara. La jaula está limpia, tiene un platito de metal con maíz y una rodaja de plátano medio comida. Alguien lo cuida bien.
@sfx camara.wav
Sacas el celular y le tomas una foto. El loro, que claramente ya ha sido fotografiado antes, se pone de perfil. En serio. Se pone de perfil.
Miras alrededor. El patio detrás de la jaula tiene el piso de tierra apisonada, una pared con baldes apilados, una bicicleta sin cadena. Nadie.
ariel (neutral): Hubiese comprado galleta en el kiosko para invitarte.
voz: No come galleta.
@cuadro off
@fondo calle_loro
La voz viene de atrás y arriba, y das un segundo salto en menos de un minuto, lo cual empieza a ser una racha.
Hay dos personas paradas en el escalón de la puerta de al lado. Una chica y un chico, más o menos de tu edad, ella un poquito más baja, los dos con el mismo pelo negrísimo y la misma forma de cara, así que no hay que ser detective.
Ella tiene una casaca rosada con el cierre a medio subir y está sonriendo con toda la cara, encantada con la situación. Él tiene una polera negra, las manos en los bolsillos, y una expresión de estar evaluando cuánto le va a costar esto.
flor (feliz): Le hace mal. Una vez mi tía le dio galleta de vainilla y estuvo mal dos días. Sufriendo. Gritando.
amaru (neutral): Gritando no.
flor (burla): Gritando. Tú estabas en el colegio.
Se te quedan mirando los dos. La chica con curiosidad abierta, el chico con las cejas un poquito levantadas, esperando.
flor (feliz): ¿Te perdiste?
No lo pregunta con maldad, lo pregunta con la certeza absoluta de quien ya sabe la respuesta.
puku: ¡Loro!
Los dos se voltean a mirarse y se dicen algo en quechua, rápido, con la naturalidad de quien lleva toda la vida haciéndolo. No agarras nada, salvo una palabra que sale flotando entre las otras como un pescado muerto en un río:
amaru (neutral): ...gringo...
La chica le responde más largo, más rápido, y le da un empujoncito en el brazo. Él pone los ojos en blanco.
Y a ti se te suben los nervios al cuello. ¿Será por los ojos? ¿Por la manera de pararte? ¿Por la casaca? No eres turista, tu mamá nació a como quince cuadras de acá, pero eso ahorita no está escrito en tu cara.
Entonces abres la boca. Y sale, en un hilito de voz:
ariel (nervioso): ...Allinllachu...
Silencio.
Los dos se quedan quietos. El loro también, lo cual empeora todo.
ariel (nervioso): ...sutiyqa Arielmi...
La "q" se te va por otro lado. La "ll" te sale a la limeña, blandita. Suena como si estuvieras leyendo un idioma en voz alta por primera vez, que es exactamente lo que está pasando.
La chica se lleva las dos manos a la boca. Y se ríe. Pero no es una risa de burla, es una risa que le sale de golpe, con los hombros y todo.
flor (risa): ¡Ayyy! ¡Habla! ¡Chiqaqchu! ¿Sabes quechua?
El chico, en cambio, ha hecho una mueca. Una mueca muy específica. Como si hubiera pisado algo blando. Se pasa la mano por la nuca y mira hacia otro lado.
amaru (molesto): Yaya.
No queda claro si te lo dice a ti o a su hermana o al universo.
flor (feliz): ¡No le hagas caso! Está así siempre. Yo soy Flor Miski María Quispe Ccori. Dime Miski, o Flor, cualquiera. Él es...
amaru (seria): Amaru.
flor (burla): Jorge Amaru Jesús.
amaru (molesto): Amaru. Nada más.
Te mira a ti, medio segundo, y baja la vista otra vez.
flor (feliz): ¿Y tú de dónde saliste? Por acá no pasa nadie que no viva acá.
ariel (nervioso): Yo...
Y ahí se te abre, por un segundo, un abanico entero de respuestas posibles.
flor (burla): ¿Yo...?
puku: ¡Loro!
Amaru resopla por la nariz. Casi una risa. Casi.

* Vengo de viaje, con mi mamá. -> resp_viaje
* Me perdí. -> resp_perdi
* Yo... sí vivo acá. -> resp_vivo

# ===============================================================
== resp_viaje
@var presentacion = viaje
ariel (neutral): Vengo de viaje, con mi mamá.
flor (feliz): Ahhh. ¿Y tu mamá dónde está?
Asiente como si eso explicara mucho, aunque no explica casi nada.
ariel (neutral): En la notaría. Cerca de la plaza.
flor (seria): Ah, ya. Trámites. Eso es todo el día. Ya fuiste.
Lo dice con la solemnidad de alguien que ha esperado sentada en muchas sillas de plástico.
amaru (neutral): ¿La de la esquina de la plaza o la que está subiendo?
ariel (neutral): La de la esquina, creo.
amaru (neutral): Esa es lenta.
Se vuelve a mirar el piso. Pero lo dijo. Es la primera cosa que te dice sin que su hermana lo obligue.
flor (feliz): Nosotros vivimos acá, dos casas. Bueno, la casa de mi tía. Ese es Puku. Puku Puku le puso mi abuelita, pero todos le dicen Puku nomás.
puku: ¡Loro!
flor (triste): Es lo único que dice. Le enseñamos como cinco cosas y solo le gustó esa.
amaru (neutral): Dice "mamá" también.
flor (burla): Dijo "mamá" una vez, hace tres años, y nadie más lo escuchó aparte de ti.
amaru (seria): Yo lo escuché.
flor (burla): Nadie más lo escuchó.
Te mira a ti buscando alianza, como si acabaras de ser incorporado a un juicio familiar de larga data.
Después se le prende algo en la cara. Se acuerda de lo de antes.
flor (feliz): Oye, pero espera. Lo del quechua. ¿De dónde sacaste eso? Porque lo dijiste horrible, pero lo dijiste.
amaru (seria): Flor.
flor (feliz): ¿Qué? Es un halago. En serio. Los que vienen de afuera no intentan. Ni lo intentan. Sacan foto a la señora con su sombrero y se van. Tú intentaste. Mal. Pero intentaste.
@ir sutiyqa

# ===============================================================
== resp_perdi
@var presentacion = perdi
ariel (neutral): Me perdí.
Lo dices y ya está, no hay vuelta atrás. Y en el momento en que lo dices se te quita un peso de encima, porque llevabas como diez minutos fingiendo que caminabas con rumbo.
Flor abre la boca. Y aplaude una vez, feliz.
flor (risa): ¡Ya sabía! ¡Ya sabía! ¿Ves? Te dije.
amaru (neutral): No dijiste nada.
flor (feliz): Lo pensé fuertísimo.
amaru (neutral): Eso no cuenta.
Flor lo ignora completamente y vuelve hacia ti, dando un paso más cerca, con una confianza que no se ganó pero que evidentemente reparte gratis.
flor (feliz): ¿Y de dónde te perdiste? O sea, ¿de dónde venías?
ariel (nervioso): De la plaza. Creo. Por ahí.
Señalas hacia atrás con el pulgar y después dudas y señalas hacia el otro lado.
amaru (neutral): Por ahí.
Por primera vez hay algo parecido a una sonrisa escondida en su cara. Muy escondida. Como detrás de tres puertas.
ariel (neutral): Hay una radio que estaba sonando. Me metí por acá porque quería ver de dónde salía la música y después ya no supe.
flor (feliz): Ah, esa es la de don Aurelio. La prende a las once y la apaga a las once y media, ni un minuto más. Nadie sabe por qué.
amaru (neutral): Tiene su programa.
flor (burla): Nadie sabe cuál programa.
Flor se voltea y señala la calle en bajada, después la escalera de piedra que se ve al fondo entre dos paredes blancas.
flor (seria): Mira, es fácil. Subes por ahí, doblas donde está la pared azul, sales a un pasaje con reja verde, y esa te bota a media cuadra de la plaza. Diez minutos. Aunque tú te vas a perder igual.
ariel (neutral): No me voy a perder.
flor (burla): Te vas a perder.
amaru (neutral): Sí se va a perder.
ariel (molesto): ¡Ah, ya!
Y los tres se quedan ahí un segundo, en esa calle vacía, con el loro verde de testigo.
flor (seria): Oye. ¿Y por qué dijiste allinllachu?
Ahí está. La pregunta que estabas esperando y temiendo.
ariel (nervioso): Porque...
flor (seria): Porque no es cosa de turista eso. Los turistas dicen hola. Y sacan foto. Tú dijiste allinllachu, malísimo, pero lo dijiste.
Amaru levanta la vista. También quiere saber.
# PUENTE (añadido para juntar rutas; edítalo si quieres)
ariel (nervioso): Lo saqué de una nota del celular. Mi mamá... bueno. Es una lista.
flor (feliz): ¡Una lista! Ay, qué tierno.
@ir sutiyqa

# ===============================================================
== resp_vivo
@var presentacion = vivo
ariel (nervioso): Yo... sí vivo acá.
Sale antes de que lo pienses bien. Y en el instante en que sale, te das cuenta de que tienes un problema, porque estás de pie en medio de una calle que no reconoces, con una botella de agua del kiosko en la mano y cara de haber llegado desde otro planeta.
flor (sorpresa): ¿Acá? ¿Acá acá?
Señala el suelo. Literalmente el suelo, la calle donde están.
ariel (nervioso): En Ayacucho.
flor (burla): Ajá. ¿En qué parte?
Se cruza de brazos, muy despacio. Le está apareciendo una sonrisa peligrosa.
ariel (nervioso): ...Por la plaza.
flor (burla): Por la plaza.
ariel (nervioso): Sí.
amaru (neutral): Todo el mundo vive "por la plaza".
No lo dice con maldad, lo dice como quien lee un resultado en una pantalla.
flor (burla): Ya. Entonces me vas a saber decir cómo se llama la calle esta.
Miras alrededor. No hay ningún letrero. Hay una pared blanca, una carretilla, geranios rojos, cero información.
ariel (nervioso): ...No la veo desde acá.
flor (risa): ¡AY! ¡No la ve desde acá! ¡Amaru, no la ve desde acá!
amaru (neutral): Escuché.
flor (risa): ¡Está mintiendo! ¡Está mintiendo malísimo!
Y lo peor es que no se está burlando de ti con crueldad. Se está divirtiendo tanto que casi da gusto.
flor (burla): A ver. Si vives acá, dime una cosa nomás. Una. ¿Cuánto está el pasaje del mototaxi hasta el mercado?
Silencio.
puku: ¡Loro!
flor (feliz): Exacto.
amaru (neutral): Yo no le veo cara de acá tampoco. Pero tampoco de gringo.
Y esa frase queda flotando ahí, en el aire frío, con el sol blanquísimo cayendo sobre las tres cabezas.
flor (seria): Ya, a ver. En serio. ¿De dónde eres? Porque dijiste allinllachu. Malísimo, pero lo dijiste. Y eso los turistas no lo hacen.
# PUENTE (añadido para juntar rutas; edítalo si quieres)
ariel (nervioso): De Lima. Vine con mi mamá. Lo del quechua... lo saqué de una nota del celular.
flor (feliz): ¡Una lista! Ay. Está bien, está bien. Ya no te molesto.
amaru (neutral): Sí lo va a molestar.
flor (feliz): Sí lo voy a molestar.
@ir sutiyqa

# ===============================================================
== sutiyqa
amaru (neutral): Dijo sutiyqa. Ni se dice así.
No ha levantado la vista. Lo dice bajito, casi para sí mismo.
flor (burla): ¿Y cómo se dice, profesor?
Amaru se pone rojo hasta las orejas y no contesta.

* ¿Cómo se dice? (preguntar en serio) -> profesor_serio
* Sí, profesor. Explíquenos. (molestarlo) -> profesor_broma

# ---------------------------------------------------------------
== profesor_serio
@var amaru_broma = 0
ariel (curioso): ¿Cómo se dice?
Y lo preguntas en serio. Con los ojos bien abiertos, inclinándote un poquito hacia adelante, con esa cara que uno pone cuando de verdad quiere saber algo.
Amaru levanta la vista. Se encuentra con esa cara. Se le ve, un segundo, medio desarmado, como si estuviera preparado para que te burlaras o para que no te importara, y no para esto.
amaru (rojo): Eh. Es... ñuqapa sutiymi Ariel. O más corto, sutiymi Ariel. Tú dijiste sutiyqa. El -qa es como... es otra cosa. Marca el tema. No es para presentarse.
flor (feliz): Ay, ya empezó.
amaru (seria): Ella preguntó.
flor (burla): Él preguntó.
amaru (rojo): Él preguntó.
Se pone rojo otra vez, y ahora no queda claro si es por la corrección o por haberte tenido que mirar de nuevo.
Flor te toma del brazo, así nomás.
flor (feliz): A ver, di conmigo. Despacio. Ñu-qa-pa.
ariel (neutral): Ñuqapa.
flor (seria): Nooo, la q no es k. Es más atrás. Acá. Como si te estuvieras atorando un poquito. Ñu-qa-pa.
ariel (neutral): Ñu... qa... pa.
flor (feliz): ¡Mejor! Sutiymi.
ariel (neutral): Sutiymi.
flor (feliz): Ñuqapa sutiymi Ariel.
Respiras. Lo dices entero, despacio, tratando de meter la garganta donde te dijo:
ariel (neutral): Ñuqapa sutiymi Ariel.
Silencio de dos segundos.
flor (sorpresa): Uy.
amaru (neutral): Estuvo bien.
Los dos hablan al mismo tiempo y los dos se callan al mismo tiempo. Flor voltea a mirar a su hermano con las cejas altísimas, como diciendo ajá. Amaru se da la vuelta y hace como que revisa el plato de maíz de Puku, que está lleno.
puku: ¡Loro!
@ir saludo_bien

# ---------------------------------------------------------------
== profesor_broma
@var amaru_broma = 1
ariel (burla): Sí, profesor. Explíquenos.
Pones las manos juntas como alumno modelo.
Flor levanta la cabeza de golpe, con la cara de quien acaba de encontrar un cómplice inesperado en la vía pública.
flor (risa): ¡Eso! Explíquenos, profesor.
amaru (molesto): Cállate.
flor (burla): ¿Nos va a tomar examen?
amaru (molesto): Cállate.
ariel (burla): Yo tengo una pregunta, profesor.
amaru (molesto): Ay, no.
ariel (burla): ¿Se puede ir al baño?
Flor grita. Grita de verdad, un gritito agudo, y se agarra del brazo de la casaca de él sacudiéndolo.
flor (risa): ¡AY! ¡Amaru! ¡Amaru, te está haciendo bulla el que acaba de llegar! ¡No lo conoces ni cinco minutos!
Amaru tiene la cara del color de los geranios. Se suelta del agarre de su hermana, se da media vuelta, camina tres pasos hacia la puerta de la casa, se detiene, y se queda ahí parado de espaldas, sin entrar.
Que es peor. Porque quedarse ahí de espaldas es admitir que se quería ir pero no tanto.
amaru (rojo): Manam...
Y después algo largo en quechua, rápido, dirigido claramente a Flor.
Flor le responde en quechua, riéndose, y captas el "profesor" adentro de la frase porque lo dice en español, con burla, en medio de todo lo demás.
flor (burla): Le dije que si es profesor debería cobrar.
amaru (rojo): No dijo eso.
flor (feliz): Dije eso.
amaru (rojo): Dijiste otra cosa.
flor (burla): Dije eso. Ariel no sabe quechua. Puedo decir lo que quiera. Por ahora.
Amaru finalmente se da la vuelta del todo. Sigue rojo, pero ya no está huyendo. Te mira a ti, directo, dos segundos enteros esta vez.
amaru (seria): Ñuqapa sutiymi Ariel. Así se dice. Ya está. Esa es la clase.
amaru (molesto): Y no digas sutiyqa nunca más.
flor (feliz): Aaaah, no. Espérate. Sí puede decir sutiyqa.
Amaru cierra los ojos un segundo, como quien ve venir un choque.
amaru (seria): No es así.
flor (seria): Sí es así. Si le preguntan ¿imataq sutiyki? él puede contestar sutiyqa Arielmi. Porque ahí el nombre ya es el tema. Ya se está hablando del nombre. ¿O no?
Silencio.
Amaru abre la boca. La cierra.
amaru (rojo): ...Es distinto.
flor (burla): Pero se puede.
amaru (seria): Se puede, pero no es lo que él estaba haciendo. Él se estaba presentando de la nada. Nadie le había preguntado.
flor (risa): ¡PERO SE PUEDE! ¿Ves? Tenías razón y no sabías. Eso es lo más bonito.
@aprender sutiyqa
ariel (neutral): Yo no tenía razón. Yo lo copié de una nota del celular.
flor (risa): ¡No importa! ¡El profesor se equivocó igual!
amaru (triste): No me equivoqué. Dije que no era para presentarse. Y no es para presentarse.
flor (burla): El profesor se equivocó.
Amaru se pasa las dos manos por la cara y las deja ahí un momento. Cuando las baja, te está mirando a ti, y hay algo raro: no está molesto. Está como... resignado y un poquito divertido, todo junto.
amaru (neutral): ¿Ves lo que hace? Todo el día. Toda la vida.
flor (feliz): Toda la vida.
puku: ¡Loro!
amaru (molesto): Cállate tú también.
@ir saludo_bien

# ===============================================================
== saludo_bien
ariel (curioso): ¿Y si saludé bien...?
Lo preguntas medio en broma, medio no. Porque la verdad es que llevas veinte minutos con esa palabra en la boca y todavía no sabes si te salió o no.
Flor y Amaru se miran.
flor (nervioso): Eh.
amaru (neutral): No.
flor (molesto): ¡Amaru!
amaru (neutral): Preguntó.
Flor se muerde el labio, tratando de armar algo diplomático, y no le sale porque no es su naturaleza.
flor (seria): O sea. La palabra estaba bien. Allinllachu. Esa está bien, esa se dice. Pero lo dijiste asá.
ariel (neutral): ¿Asá?
flor (burla): Asá. ...allinllachu...
Te imita: se encoge, mira al piso, y lo dice en un hilito de voz, temblando.
Amaru resopla por la nariz. Es lo más cerca de una carcajada que le has visto.
ariel (molesto): ¡No sonaba así!
flor (burla): Sonaba exactamente así. Sonaba como si estuvieras pidiendo permiso para existir.
ariel (nervioso): Es que estaba nervioso.
flor (feliz): ¡Ya sé! ¡Por eso es bonito! Pero mira, allinllachu es una pregunta. Es "¿estás bien?". Tienes que decirlo como pregunta, no como disculpa.
Se endereza, levanta la barbilla, y lo suelta al aire con toda la voz:
flor (feliz): ¡Allinllachu!
Suena completamente distinto. Suena a alguien saludando a un vecino desde la otra vereda.
ariel (sorpresa): Ah.
flor (feliz): Ah. Y se contesta allinmi. Que es "estoy bien". Y ahí ya conversas.
amaru (neutral): O allinllam. También.
flor (burla): O allinllam.
Le hace un gesto de "gracias, profesor" con la mano, y él la ignora heroicamente.
Flor se pone frente a ti, separa un poco los pies, como quien va a hacer algo importante.
flor (seria): Ya. De nuevo. Pero fuerte. Como si tuvieras derecho.
Espera. Puku espera. Amaru mira a otro lado pero no se ha movido ni un centímetro.
ariel (feliz): ¡Allilanchu...!
Te sale así, con la ele donde va la ele doble, pero fuerte, con la barbilla arriba y una sonrisa chiquita que no puedes controlar.
Y ya que agarraste vuelo, te arriesgas con algo que viste en la lista y no repasaste bien:
ariel (feliz): Allin... punchay.
flor (sorpresa): ¡AY! ¡Dijo allin p'unchay!
amaru (neutral): Está mal.
flor (feliz): ¡Está bonito!
amaru (feliz): Está las dos cosas.
Esta vez sí se le escapa media sonrisa, un ratito, antes de esconderla.
flor (seria): A ver. Primero: alli-lla-nchu, no allilanchu. Doble ele. Como en "llave", pero más larga. La lengua acá arriba.
ariel (neutral): Allillanchu.
flor (feliz): ¡Mejor! Segundo: lo dijiste fuerte. Eso ya. Eso estuvo perfecto. Sonabas como persona y no como fantasma.
@aprender allillanchu allin_punchay
ariel (neutral): ¿Y lo otro?
amaru (neutral): Allin p'unchay sí existe. Es "buen día". Se usa. Pero es más... de radio.
ariel (curioso): ¿De radio?
amaru (neutral): De radio. De locutor. De cartel. Nadie te saluda así en la calle. Acá dices allillanchu nomás. O rimaykullayki si es alguien mayor y quieres quedar bien.
flor (feliz): O buenos días. Que también decimos, ah. Todo el rato. No es que andemos hablando quechua puro como en el museo.
ariel (nervioso): Yo pensé que sí.
Los dos se ríen. Flor abiertamente. Amaru por la nariz.
flor (feliz): Mezclamos. Todo el mundo mezcla. Mi mamá te dice ya pues, mamita, apúrate, ñañay, todo en la misma frase y ni se da cuenta.
Y ahí, sin querer, se te forma un nudo chiquito en la garganta. Porque tu mamá también hace eso a veces. Muy de vez en cuando, cuando está distraída, se le escapa una palabra suelta en medio del español y después se calla, como si se le hubiera caído algo.
Flor te está mirando. Se le borra un poco la risa.
flor (seria): ¿Qué?
ariel (triste): Nada.
Una pausa. El sol blanquísimo, el frío, la carretilla apoyada en la pared.
ariel (neutral): ¿Y cómo digo gracias?
Flor no insiste con lo de antes. Lo deja pasar, pero se le queda un pedacito de atención puesta en ti, como quien guarda algo para después.
flor (feliz): Sulpayki. Ese es fácil. Sul-pay-ki.
ariel (neutral): Sulpayki.
flor (burla): Bien. Eso te salió bien de una. Sospechoso.
ariel (neutral): Estaba en mi lista.
flor (sorpresa): ¿Tienes lista? ¡A ver! ¡Muéstrame!
amaru (neutral): Espera. También se dice añay. O diospagarasunki.
Por primera vez da un paso hacia ustedes en vez de hacia atrás.
flor (burla): Ese es larguísimo.
amaru (neutral): Pero es el que dice la abuela.
flor (feliz): Porque la abuela tiene ochenta años. Tú di sulpayki. Si le dices diospagarasunki a alguien de nuestra edad se van a voltear a mirarte.
amaru (neutral): Es del español igual. "Dios se lo pague". Se metió y se quedó.
flor (burla): Ay, ya empezó con la historia.
amaru (seria): Es verdad.
flor (feliz): Es verdad, pero ya empezó.
@aprender anay diospagarasunki
Amaru se calla, pero no rojo esta vez. Más bien con la cara de quien tenía tres datos más preparados y se los está tragando.
Y tú, que estabas escuchando todo eso, haces la prueba. Los miras a los dos y dices, con la mejor pronunciación que puedes reunir:
ariel (feliz): Sulpayki.
flor (feliz): Ay. De nada, pues.
Se lleva la mano al pecho, dramática.
amaru (rojo): Imamanta.
ariel (curioso): ¿Eso qué es?
amaru (neutral): Es "de nada". Literal es como "¿de qué?". O sea, ni agradezcas.
ariel (neutral): Como cuando alguien dice "no fue nada".
Amaru levanta la vista. Te mira. Asiente una sola vez, corto.
amaru (neutral): Eso.
@aprender imamanta
@sfx vibrar.wav
Y en ese momento, en algún lugar del bolsillo de tu casaca, empieza a vibrar el celular.

# ===============================================================
== whatsapp_mama_1
Sacas el celular. Cuatro llamadas perdidas.
Cuatro. En veinte minutos. Y ningún mensaje antes de la primera, porque tu mamá pertenece a esa generación que marca primero y escribe después. El teléfono estaba en No Molestar, como siempre. También como siempre, eso a ella le parece una decisión personal en su contra.
@mensaje mama | Ariel
@mensaje mama | Ariel contesta
@mensaje mama | Ariel
@mensaje mama | voy a demorar wawa se cayo el sistema
@mensaje mama | ya te yapee para que comas algo NO CALLEJERO
@mensaje mama | y aprovecha compra las cosas para marcar el terreno
@mensaje mama | cuerda estacas cinta y pintura
@mensaje mama | pintura roja o blanca
@mensaje mama | hay ferretería cerca del mercado
@mensaje mama | contesta
@mensaje mama | 🙏🙏
@chat mama leer
flor (curioso): ¿Todo bien?
Estira el cuello con una falta de disimulo impresionante.
ariel (neutral): Sí. Se va a demorar. Me mandó a comprar cosas. Cuerda, estacas, cinta y pintura. Para marcar un terreno.
Amaru asiente como si eso fuera lo más normal del mundo, que probablemente lo es.
amaru (neutral): Ferretería. Hay una yendo al mercado.
ariel (nervioso): Es que no tengo señal para el mapa.
Muestras la pantalla, con el puntito azul gordo abarcando media ciudad.
Flor ya se está subiendo el cierre de la casaca.
flor (feliz): Te acompañamos.
ariel (nervioso): No, no, no te preocupen...
flor (feliz): Te acompañamos. Igual tengo que comprar pilas.
Ya está caminando.
amaru (neutral): No tienes que comprar pilas.
flor (burla): Voy a tener que comprar pilas en algún momento de mi vida.
Amaru se queda un segundo parado, calculando si esto le conviene. Después mira hacia la puerta de la casa, después a ustedes dos, y suspira como alguien a quien le acaban de arruinar una tarde de estar solo en su cuarto.
Pero viene.

# ===============================================================
== camino_ferreteria
@fondo calle_subida
@musica caminata.mp3
Suben por la calle empedrada. Flor camina rápido y hablando; Amaru va medio paso atrás con las manos en los bolsillos.
flor (feliz): Ya. Si vas a comprar cosas, tienes que saber números. Es lo más útil de todo.
ariel (neutral): Ya.
flor (feliz): Huk, iskay, kimsa, tawa, pichqa. Uno, dos, tres, cuatro, cinco.
ariel (neutral): Huk, iskay, kimsa, tawa, pichqa.
flor (sorpresa): ¡Uy! ¿Otra vez tenías eso en tu lista?
ariel (neutral): No, ese lo acabo de escuchar.
flor (feliz): Se acuerda rápido.
amaru (neutral): Ajá.
flor (seria): Pichqa con la q de garganta. No pikcha. Pichqa.
ariel (neutral): Pichqa.
flor (feliz): Mejor.
@aprender huk iskay kimsa tawa pichqa
Doblan donde está la pared azul. Sale un pasaje con reja verde, exactamente como ella describió.
flor (feliz): Ahora colores. Pintura roja, ¿no? Rojo es puka.
ariel (neutral): Puka.
flor (seria): Blanco es yuraq. Con la q otra vez, al final, atrás.
ariel (neutral): Yuraq.
flor (feliz): Y negro es yana. Ese es fácil, ese lo sabe todo el mundo. ¿Sabías que Ayacucho tiene un cerro que se llama...
amaru (molesto): No empieces con el cerro.
flor (burla): Ya no digo nada.
@aprender puka yuraq yana
Pasan al lado de una señora sentada en la vereda con un balde de habas. Flor la saluda con un movimiento de cabeza y la señora contesta con otro.
flor (feliz): Y para comprar. Lo más importante: hayk'ataq? ¿Cuánto es?
ariel (neutral): Hayk'ataq.
flor (feliz): O completo: hayk'ataq kanki? pero nadie dice completo. Hayk'ataq nomás, señalando.
@aprender haykataq
ariel (curioso): ¿Y "por favor"?
Flor abre la boca. La cierra. Mira a Amaru.
flor (feliz): A ver, profesor. Ese explícalo tú que yo lo explico mal.
amaru (neutral): No hay un "por favor" así, como en español. Se dice ama hina kaspa. Que es como... "no siendo así". Como "no seas malo". Pero es formal, es de pedir un favor en serio.
ariel (curioso): ¿Y para la tienda?
amaru (feliz): Para la tienda dices por favor nomás. En español. Nadie te va a decir ama hina kaspa por una cinta métrica.
ariel (neutral): Ah.
amaru (neutral): Pero sulpayki sí. Eso sí se dice todo el rato.
ariel (neutral): Sulpayki.
flor (feliz): Ese ya lo tienes. Ese ya es tuyo.
@aprender ama_hina
Salen del pasaje. De pronto hay más gente, más ruido, un mototaxi que pasa demasiado cerca, olor a pan.
@fondo calle_mercado
flor (feliz): Ah, y dos cosas más. Si alguien te habla en quechua y no cachas nada: manam hamut'anichu. No entiendo.
ariel (neutral): Manam... hamut'anichu.
flor (feliz): O más fácil: manam yachanichu. No sé.
ariel (curioso): ¿Y si entiendo un poquito?
flor (burla): As-asllata rimani. Hablo un poquito. Que en tu caso es mentira, pero mentira bonita.
amaru (neutral): Ahorita ya no tanto.
Los dos voltean a mirarlo. Él mira el piso inmediatamente.
amaru (rojo): O sea. Ya sabe como diez palabras. Pisillata. Más o menos.
ariel (neutral): Pisillata.
@aprender manam_hamutanichu manam_yachanichu asasllata pisillata
flor (feliz): Y si te preguntan de dónde eres, es maymantataq kanki? Y tú contestas Limamantam kani. Soy de Lima.
Y ahí te quedas callado medio segundo.
Porque podrías decir eso. O podrías decir otra cosa.
ariel (neutral): Limamantam kani.
@aprender maymantataq limamantam
Flor asiente, satisfecha. Amaru no dice nada, pero te está mirando de reojo, y algo en cómo te quedaste callado antes de contestar no se le pasó por alto.
amaru (neutral): Ahí es.
Señala con la barbilla. Al final de la cuadra hay una ferretería con la puerta abierta, sacos de cemento apilados afuera y un letrero pintado a mano: FERRETERÍA "EL PROGRESO" — Todo para su construcción.
@fondo ferreteria_afuera
flor (feliz): Ya. Adentro está el señor Hilario. Es medio sordo, pero de mentira. Escucha perfecto cuando quiere. Si le hablas en quechua te va a bajar el precio.
ariel (sorpresa): ¿En serio?
flor (burla): No. Bueno. A veces.
amaru (neutral): Una vez le bajó a mi mamá.
flor (feliz): A mi mamá le baja porque es mi mamá.
amaru (neutral): Igual cuenta.
amaru (seria): Nuestra mamá.
flor (burla): Es lo mismo.
amaru (seria): No es lo mismo. Dijiste "mi mamá" como si fuera tuya nomás.
flor (molesto): ¡Es que en ese momento estaba siendo mi mamá! ¡Yo estaba ahí!
amaru (neutral): Yo también estaba ahí.
flor (burla): Estabas afuera.
amaru (neutral): Estaba en la puerta.
Están parados a media cuadra de la ferretería y todavía tienes unos segundos antes de entrar. ¿Qué preguntas?

* ¿Qué cerro? -> preg_cerro
* ¿Siempre han vivido acá? -> preg_vivido
* ¿Cuántos años tienen? -> preg_edad
* ¿Cómo se dice 67? -> preg_67

# ---------------------------------------------------------------
== preg_cerro
@var pregunta = cerro
ariel (curioso): ¿Qué cerro?
Los dos se callan de golpe.
Flor voltea muy despacio. Se le está formando una sonrisa enorme, y a Amaru se le está formando exactamente lo contrario.
amaru (molesto): No.
flor (feliz): Preguntó.
amaru (molesto): Preguntó por preguntar.
flor (risa): ¡Preguntó! ¡Testigo! ¡Puku es testigo!
amaru (neutral): Puku está a cuatro cuadras.
flor (feliz): Puku escucha todo.
Flor se te planta al frente, caminando de espaldas para no dejar de mirarte.
flor (feliz): Ya. El cerro. Se llama Acuchimay.
ariel (neutral): Ah.
flor (feliz): Y arriba hay un Cristo gigante, blanco, con los brazos abiertos, y desde ahí se ve toda la ciudad. Toda. De noche es lo más bonito que vas a ver en tu vida. Y hay un mirador y venden anticuchos y hay unos columpios.
ariel (feliz): Suena bien.
flor (risa): ¡Y hay una llama!
amaru (molesto): No hay una llama.
flor (burla): Había una llama.
amaru (seria): Hace tres años.
flor (burla): Había. Y tú le tenías miedo.
amaru (rojo): Yo no le tenía miedo.
flor (risa): Le escupió.
amaru (rojo): A todo el mundo le escupe. Es una llama.
flor (burla): Se puso a llorar.
amaru (rojo): Tenía catorce años. Y no lloré.
flor (burla): Se le salieron lágrimas.
amaru (rojo): Eso es distinto.
flor (feliz): ¿Ves? Por eso no quiere que hable del cerro.
Y Amaru, que ya está rojo otra vez pero que evidentemente ha decidido que si va a caer, cae peleando, dice:
amaru (seria): El nombre viene de acuchi, que es... una manera de decir de dónde sale el agua, y may, que es "dónde". Más o menos. Hay varias versiones. Eso era lo que iba a decir. Antes. Cuando me cortaste.
Silencio.
flor (triste): Ay. Ese dato sí estaba bonito.
amaru (neutral): Ya sé.
flor (triste): Perdón.
amaru (neutral): Ya fue.
@aprender acuchimay
@ir insultos

# ---------------------------------------------------------------
== preg_vivido
@var pregunta = vivido
ariel (curioso): ¿Siempre han vivido acá?
Se callan. Flor se voltea, y por primera vez desde que la conoces se toma un segundo antes de contestar.
flor (seria): Sí y no. Yo nací acá. Él nació acá. Pero mi papá se fue a Lima como cinco años, cuando éramos chiquitos, y estuvimos allá un tiempo. En San Juan de Lurigancho.
amaru (neutral): Cuatro años.
flor (seria): Cuatro años. Yo casi no me acuerdo. Él sí.
amaru (neutral): Yo tampoco me acuerdo mucho.
flor (feliz): Te acuerdas del colegio.
amaru (neutral): Del colegio sí.
Flor patea una piedrita chiquita y la sigue con la mirada.
flor (seria): Y después volvimos, porque mi mamá no aguantaba. Decía que allá no se veía el cielo. Que es medio verdad, ¿no?
ariel (neutral): Es verdad. En invierno es como... un techo gris. Todo el día.
flor (feliz): ¡Eso! ¡Ella decía eso! Decía "parece que le han puesto tapa a la ciudad".
Caminan un poco en silencio. Un perro los mira pasar desde una puerta.
flor (seria): Y ahora yo me voy a ir otra vez. Entré a la PUCP. Comunicaciones. Todavía no empiezan las clases, empiezo en marzo. Así que ahorita estoy acá, pero ya no por mucho.
ariel (feliz): Ah, chévere. Felicitaciones.
flor (feliz): Sulpayki.
Te guiña un ojo. Y después señala a su hermano con el pulgar.
flor (feliz): Este está en sabático. En academia. Va a postular.
ariel (curioso): ¿A qué?
amaru (neutral): Todavía no sé. Ingeniería. Algo de eso.
flor (feliz): Electrónica.
amaru (seria): No he decidido.
flor (feliz): Electrónica. En mi casa él arregla todo. Todo. La tele, la impresora, los parlantes. Mi papá le dice "Amaru, los parlantes" cada vez que hay fiesta y él tiene que ir a salvar la fiesta.
amaru (neutral): No los salvo, solo los conecto bien.
flor (burla): Nadie más sabe conectarlos bien. Eso es salvar la fiesta.
amaru (neutral): Es un cable. Es siempre el mismo cable. Está flojo. Lo aprieto y ya.
flor (burla): Y ya.
Y tú, mirándolo, dices sin pensarlo mucho:
ariel (neutral): Yo también estoy en sabático.
Amaru levanta la cabeza. Rápido, esta vez.
amaru (sorpresa): ¿En serio?
ariel (nervioso): Sí. Estoy... estoy postulando a Estados Unidos. Para pregrado. Es un proceso largo.
flor (sorpresa): ¿A Estados Unidos?
ariel (nervioso): Estoy postulando. No es que ya entré.
flor (feliz): ¡Pero estás postulando!
Pero Amaru sí escuchó. Y te está mirando distinto ahora. No impresionado exactamente. Más bien como si estuviera reordenando algo.
amaru (seria): ¿Y el quechua para qué?
Ahí está.
ariel (nervioso): Para... Hay becas. Que valoran eso. Si tienes lengua originaria, si tienes vínculo con la comunidad, cuenta.
Se te va apagando la voz al final de la frase, porque escuchada así, en voz alta, esa razón suena bastante fea.
Flor no dice nada. Amaru tampoco.
@var amaru_sabe_becas = 1
@ir insultos

# ---------------------------------------------------------------
== preg_edad
@var pregunta = edad
ariel (curioso): ¿Cuántos años tienen?
Flor deja la discusión inmediatamente, porque cualquier tema nuevo le interesa más que el anterior.
flor (feliz): Yo diecinueve. Él dieciocho. Bueno, casi. Cumple en octubre.
amaru (seria): En noviembre.
flor (feliz): En octubre.
amaru (seria): Noviembre.
flor (burla): Ay, es que como te compran el pastel en octubre siempre...
amaru (neutral): Porque en noviembre no hay plata. Eso no cambia el mes.
Flor se ríe y no lo contradice, lo cual significa que él tiene razón.
ariel (neutral): Yo tengo dieciocho.
flor (feliz): ¡Ah, igual que él! Bueno. Casi. Tú todavía tienes diecisiete y medio.
amaru (seria): Tengo dieciocho en noviembre.
flor (burla): Eso es lo que estoy diciendo.
Flor se voltea hacia ti otra vez y le cambia la cara, porque acaba de ver una oportunidad pedagógica.
flor (feliz): Ah, espera. Espera. Esto lo tienes que saber. Hayk'a watayuqtaq kanki? ¿Cuántos años tienes?
ariel (neutral): Hayk'a... watayuqtaq kanki.
amaru (neutral): Wata es año. Ahí está la palabra. Watayuq es "el que tiene años".
ariel (neutral): Ah, ya. ¿Y cómo contesto?
flor (burla): Chunka pusaqniyuq watayuqmi kani.
Lo dice muy rápido, con toda la intención de que no lo agarres.
ariel (sorpresa): ...Qué.
flor (risa): ¡AY! ¡Su cara!
amaru (neutral): A ver, despacio. Es por partes. Chunka es diez.
Da un paso más cerca, lo cual es notable.
ariel (neutral): Chunka.
amaru (neutral): Y pusaq es ocho. Diez más ocho es dieciocho: chunka pusaqniyuq. Literal "diez con ocho".
ariel (neutral): Chunka pusaqniyuq.
amaru (neutral): Y le pegas watayuqmi kani. "Tengo años".
ariel (neutral): Chunka pusaqniyuq... watayuqmi kani.
flor (feliz): ¡Eso! Bien. Feo, pero bien.
ariel (neutral): Gracias.
flor (burla): Sulpayki.
ariel (neutral): Sulpayki.
flor (feliz): De nada. Dile el tuyo.
amaru (neutral): Chunka qanchisniyuq watayuqmi kani. Diecisiete. Por ahora.
flor (burla): Por ahora. Hasta octubre.
amaru (seria): Noviembre.
@aprender hayka_wata chunka_pusaq wata chunka pusaq qanchis
ariel (burla): ¿Y el pastel en cuál mes?
Flor grita de la risa. Amaru voltea a mirarte con una cara de traición absoluta.
amaru (molesto): Ah, ya. Ya te alineaste con ella.
ariel (feliz): Yo solo pregunté.
amaru (molesto): Ya te alineaste.
@ir insultos

# ---------------------------------------------------------------
== preg_67
@var pregunta = 67
ariel (neutral): ¿Cómo se dice 67?
Los dos se detienen.
flor (curioso): ¿Sesenta y siete?
ariel (neutral): Sí.
flor (curioso): ¿Por qué sesenta y siete?
ariel (neutral): Por nada.
Flor entrecierra los ojos. No te cree, pero tampoco tiene evidencia.
flor (seria): Ya, a ver. Sesenta es suqta chunka. Seis dieces. Y siete es qanchis. Entonces: suqta chunka qanchisniyuq.
ariel (neutral): Suqta chunka qanchisniyuq.
flor (feliz): Eso.
ariel (feliz): Suqta chunka qanchisniyuq.
Lo repites con una satisfacción que no puedes disimular del todo. Amaru te está mirando fijo.
amaru (seria): ¿Por qué sesenta y siete?
ariel (neutral): Por nada.
amaru (seria): Nadie pregunta sesenta y siete por nada.
ariel (neutral): Es un número normal.
amaru (seria): Es un número específico. Si querías practicar hubieras dicho veinte. O cien.
ariel (curioso): A ver, ¿cien cómo se dice?
amaru (seria): Pachak. ¿Por qué sesenta y siete?
ariel (nervioso): Es una cosa de internet.
flor (risa): ¡Ay, ya sé cuál! ¿Es la de los chibolos? ¿Los del colegio? Mi prima de doce lo dice todo el día. Todo el día. Le dices "pásame la sal" y dice seis siete.
amaru (neutral): No sé qué es eso.
flor (burla): Es que tú no ves nada.
amaru (seria): Veo cosas.
flor (burla): Ves videos de gente arreglando cosas.
amaru (seria): Eso es ver cosas.
flor (feliz): Ya. Ya entendí qué clase de persona eres. De las que aprenden el idioma para hacer bromas. Está bien. Yo también soy así.
amaru (seria): Yo no soy así.
flor (burla): Nadie dijo que fueras.
@aprender suqta qanchis chunka pachak sesentaysiete
Retoman la caminata. Flor sigue en modo maestra, contando con los dedos.
flor (feliz): Ya que estamos: el año. Estamos en dos mil veintiséis. Eso es iskay waranqa iskay chunka suqtayuq wata.
ariel (sorpresa): Ay.
flor (feliz): Larguísimo, ¿no? Nadie lo dice así en la calle, ah. Todo el mundo dice "dos mil veintiséis" en español. Pero si te lo preguntan en un examen es así. Waranqa es mil.
ariel (neutral): Waranqa.
flor (feliz): Iskay waranqa: dos mil. Iskay chunka: veinte. Suqtayuq: y seis.
ariel (neutral): Iskay waranqa iskay chunka suqtayuq.
flor (sorpresa): ¡Uy, salió! Salió al primer intento.
amaru (neutral): Salió.
Hay algo raro en cómo lo dice, como si le molestara un poquito y le gustara al mismo tiempo.
@aprender waranqa anio2026 wata
ariel (curioso): ¿Y los meses?
flor (seria): Ah, los meses son un tema. Porque los oficiales tienen nombre en quechua, pero nadie los usa. Nadie. Mi mamá dice "setiembre" y ya.
amaru (neutral): Pero existen.
flor (burla): Existen. Están en los libros.
amaru (neutral): Y en el calendario del municipio.
flor (burla): Nadie lee el calendario del municipio.
amaru (neutral): Septiembre es Qhapaq Sitwa Killa. Octubre es Uma Raymi Killa. Noviembre es Aya Marq'ay Killa. Killa es mes. También es luna.
ariel (curioso): ¿Mes y luna es la misma palabra?
amaru (neutral): Sí.
Te quedas con eso un segundo. Te parece bonito de una manera que no sabes explicar.
ariel (curioso): ¿Y qué significan?
amaru (neutral): Uma Raymi es como... fiesta de la cabeza, más o menos. Y Aya Marq'ay es cargar a los muertos. Por eso cae en noviembre. Día de los difuntos.
flor (burla): Y en ese mes cumple años alguien.
Amaru cierra los ojos.
flor (burla): Nació en el mes de cargar a los muertos. Explica mucho.
amaru (molesto): Explica nada.
flor (feliz): Explica el carácter.
Y ahí, por fin, Amaru se ríe. Corto, por la nariz, medio a su pesar, pero se ríe de verdad, y voltea la cara para que no lo veas.
@aprender killa meses
@ir insultos

# ===============================================================
== insultos
@fondo ferreteria_afuera
Llegan a la puerta de la ferretería.
flor (feliz): Ya luego te enseño los insultos.
Lo dice en el tono de quien promete un regalo. Amaru se detiene en seco en la puerta.
amaru (molesto): Ama.
Y después, más largo, algo rápido en quechua que suena claramente a reclamo, con una palabra repetida dos veces y un gesto de mano incluido.
Flor lo escucha con toda la paciencia del mundo y contesta con dos sílabas.
flor (burla): Chayqa.
amaru (molesto): No es chayqa.
flor (feliz): Es chayqa.
ariel (curioso): ¿Qué dijo?
flor (feliz): Dijo que no te enseñe groserías. Que después las vas a decir mal y en el momento equivocado y va a ser mi culpa.
amaru (seria): Va a ser tu culpa.
flor (burla): Y yo le dije "y qué".
amaru (seria): No dijiste "y qué".
flor (feliz): Dije algo parecido a "y qué".
@aprender chayqa
Amaru se pasa la mano por la cara.
amaru (seria): Le va a decir algo a una señora en el mercado. Va a pensar que está saludando. Y la señora lo va a corretear.
flor (molesto): ¡Eso no ha pasado nunca!
amaru (neutral): Le pasó a Chelito.
flor (burla): Chelito es otra cosa. Chelito es un caso aparte.
amaru (neutral): Le pasó igual.
flor (feliz): A ver, no son insultos-insultos. Son... cariñosos. Como cuando le dices a alguien "oye, tonto" pero con amor.
ariel (feliz): Esos sí me interesan.
flor (risa): ¡¿Ves?! ¡Le interesan!
amaru (seria): Claro que le van a interesar. A todo el mundo le interesan. Eso no significa nada.
flor (burla): Significa que hay demanda.
amaru (seria): Significa que la gente es así.
Flor levanta un dedo y baja la voz, conspirativa, aunque están en plena calle.
flor (feliz): Ya. Uno chiquito nomás. Uno de prueba.
Amaru mira al cielo.
flor (feliz): Upa. Es como "tonto", "sonso". Pero suave. Se lo dices a tu hermano y no pasa nada.
amaru (seria): Sí pasa.
flor (burla): No pasa nada.
amaru (seria): Cuando me lo dices sí pasa.
flor (burla): Porque tú eres sensible.
ariel (neutral): Upa.
Los dos voltean. Flor se lleva la mano al pecho, herida de muerte.
flor (sorpresa): ¿A mí?
ariel (nervioso): A nadie. Estaba practicando.
amaru (feliz): Estaba practicando. Aprende rápido.
Esta vez la sonrisa le dura un poquito más.
flor (risa): ¡Aprendió a insultar en cuatro segundos!
@aprender upa
Y desde adentro de la ferretería, sin levantar la vista del televisor chiquito, el señor de la chompa de rombos dice, en voz alta:
voz: ¿Van a entrar o van a hacer su reunión ahí en la puerta?
ariel (sorpresa): ¡Ay...!

# ===============================================================
== ferreteria
@fondo ferreteria_adentro
@musica off
Casi sueltas la botella de agua. Los tres entran de golpe, uno detrás del otro, como si los hubieran arreado.
Adentro huele a fierro y a aserrín. Hay un mostrador de madera larguísimo, estantes hasta el techo con cajas sin etiqueta, rollos de cable colgados, y un señor mayor con chompa de rombos sentado en un banquito, mirando un televisor chiquito puesto en una repisa alta.
Flor te da un codazo suave.
flor (seria): Ya. Allillanchu. Fuerte.
ariel (nervioso): Ah ya...
Te compones. Enderezas la espalda. Y lo sueltas:
ariel (feliz): Allilanchu.
El señor Hilario despega los ojos del televisor por primera vez.
Te mira. Te mira despacio, de arriba a abajo, con la cara de alguien que ha visto pasar mucha gente por esa puerta y que acaba de encontrar una categoría nueva.
hilario (neutral): Allillanmi. ¿Y tú de dónde saliste?
flor (feliz): Es de Lima.
hilario (neutral): Ah. Ya.
Y vuelve al televisor.
amaru (neutral): Doble ele. Alli-lla-nchu.
Lo dice bajito, sin mover mucho la boca.
ariel (molesto): Ya sé, ya sé.
amaru (feliz): Igual te contestó.
Y en eso tiene razón, y es lo único que importa.
El mostrador es de madera oscura, rayadísima, con una regla de metal atornillada al borde. Detrás hay estantes hasta el techo, cajones de madera con etiquetas escritas a mano que dicen cosas como AUTOROSCANTE 8x1 y VARIOS.
Sacas el celular. Lees la lista de tu mamá. Abres la boca.
Y no sale nada.
Porque de repente no sabes cuánta cuerda, ni de qué tipo, ni cuántas estacas, ni si la pintura es en lata o en spray, ni qué es "cinta" exactamente en el contexto de marcar un terreno. Y el señor está esperando. Y el televisor está sonando. Y hay un olor a fierro.
ariel (nervioso): ...Quería...
Flor y Amaru se miran.
flor (feliz): Ay, no. Ya. Muéstrame el mensaje.
Le pasas el celular. Ella lee en tres segundos.
flor (feliz): Ah, es para marcar terreno nomás. Fácil. Don Hilario, danos rafia, no la delgadita, la gruesa.
hilario (neutral): ¿Cuánto?
flor (nervioso): Eh...
amaru (neutral): Cincuenta metros. Para un terreno normal alcanza. Si sobra, sobra.
flor (feliz): Cincuenta metros.
El señor se levanta del banquito sin apuro.
ariel (neutral): ¿Y estacas?
amaru (neutral): Estacas no venden acá. Eso lo compras en la maderera. O las haces. Mi tío las hace con listones. Sale más barato.
ariel (neutral): Ah.
flor (feliz): Pero la pintura sí. Don Hilario, ¿tiene esmalte rojo? Chiquito, el más chiquito.
hilario (neutral): Un cuarto.
flor (feliz): Un cuarto. Rojo se ve mejor en la tierra. Blanco se ensucia.
ariel (neutral): Mi mamá dijo rojo o blanco.
flor (burla): Rojo entonces. Puka.
ariel (neutral): Puka.
El señor Hilario, de espaldas, buscando en un estante alto, dice sin voltear:
hilario (neutral): Pukata munanki?
Te congelas.
amaru (neutral): Te está preguntando si quieres el rojo.
ariel (nervioso): ¿Y qué digo?
amaru (neutral): Arí. Es "sí".
ariel (feliz): ¡Arí!
Lo dices más fuerte de lo necesario. El señor levanta la mano con el tarro, todavía de espaldas, en señal de que escuchó.
@aprender ari munani
Flor te da un codazo en las costillas y te mira con los ojos brillantísimos, sin decir nada, porque no hace falta.
Amaru mira el piso, pero se le ve media sonrisa.
amaru (neutral): Falta la brocha. Si vas a pintar necesitas brocha.
flor (feliz): ¡Cierto! Don Hilario, una brocha chiquita también.
Y ahí, mientras el señor va juntando las cosas sobre el mostrador, el rollo de rafia azul, el tarro de esmalte, una brocha de dos pulgadas, tú te acuerdas de la palabra más importante de todas.
Hayk'ataq.
¿La usas?

* Hayk'ataq? -> precio_quechua
* ¿Cuánto es? -> precio_espanol

# ---------------------------------------------------------------
== precio_quechua
@var uso_haykataq = 1
Respiras. Miras las cosas apiladas sobre el mostrador: el rollo de rafia azul, el tarro de esmalte rojo, la brocha.
Y lo dices.
ariel (neutral): Hayk'ataq?
El señor Hilario se detiene con la mano todavía sobre el tarro.
Levanta la cabeza. Y esta vez sí te mira de verdad, no como antes. Como quien reconsidera algo.
hilario (feliz): Hayk'ataq. Ya pues.
Suelta una risita corta por la nariz. Saca una calculadora vieja de debajo del mostrador, de esas grandes con los números medio borrados, y empieza a apretar teclas con el índice, despacio.
Flor te agarra del brazo y te lo aprieta, fuerte, sin voltear a mirarte. No dice nada. Solo te aprieta el brazo.
Amaru, del otro lado, está mirando la calculadora con una concentración muy exagerada para ser real.
hilario (neutral): Veintidós con cincuenta.
Y ahí te das cuenta de que aprendiste a preguntar el precio, pero no aprendiste a entender la respuesta. Menos mal que te la dio en español.
ariel (feliz): Ya. Sulpayki.
El señor mueve la cabeza, entre resignado y divertido, y empieza a meter todo en una bolsa negra.
hilario (neutral): ¿De dónde eres?
ariel (neutral): De Lima.
hilario (neutral): Mmm. ¿Y tu mamá?
Y ahí te quedas quieto un segundo, porque no esperabas esa pregunta, y porque la respuesta es la parte que no habías dicho en voz alta en todo el día.
ariel (neutral): De acá.
El señor Hilario asiente una sola vez, sin sorpresa, como quien acaba de confirmar algo que ya sospechaba.
hilario (feliz): Ya decía yo. Tienes cara de Ayacucho con acento de Lima.
Empuja la bolsa hacia ti por el mostrador. Flor voltea a mirarte tan rápido que casi se le sale el cuello.
flor (sorpresa): ¿QUÉ?
ariel (nervioso): Ay.
flor (sorpresa): ¿Cómo que tu mamá es de acá?
ariel (nervioso): Es que...
flor (risa): ¡Le dijiste Limamantam kani! ¡Te pregunté de dónde eras y dijiste Lima!
ariel (nervioso): ¡Es que soy de Lima!
flor (risa): ¡Eres de acá con acento!
Amaru, que no ha dicho nada, tiene una expresión rarísima en la cara. No sorpresa. Más bien como si acabara de encajarle una pieza que llevaba media hora dándole vueltas: lo del quechua, lo de la lista en el celular, lo del silencio raro cuando Flor mencionó a su mamá mezclando idiomas.
amaru (neutral): Por eso estabas aprendiendo.
Lo miras.
ariel (neutral): Sí.
@var hermanos_saben_mama = 1
hilario (neutral): Veintidós con cincuenta.
Ya sentado otra vez en su banquito, con los ojos de vuelta en el televisor chiquito.
@var precio = 22.50
@ir yape

# ---------------------------------------------------------------
== precio_espanol
@var uso_haykataq = 0
# PUENTE (añadido): si no usa la palabra, no hay descuento ni conversación.
ariel (neutral): ¿Cuánto es?
El señor Hilario ni levanta la vista. Aprieta la calculadora con el índice, despacio.
hilario (neutral): Veinticinco.
Flor suelta un suspiro chiquito, como quien vio pasar una oportunidad por la ventana. Amaru no dice nada, pero te mira de reojo.
amaru (neutral): Tenías la palabra.
ariel (nervioso): Ya sé.
flor (burla): La próxima.
@var precio = 25
@ir yape

# ===============================================================
== yape
Escaneas el QR pegado con cinta al mostrador, medio despintado. Pones el monto. Confirmas.
@sfx yape.wav
Y suena. Ese sonidito. "¡Yapeaste!", chillón, saliendo de un celular viejísimo que el señor Hilario tiene apoyado contra la caja registradora, con la pantalla rajada en una esquina.
hilario (neutral): Ya está.
ariel (neutral): Sulpayki.
hilario (neutral): Imamanta.
@fondo ferreteria_afuera
Sales con la bolsa negra colgando de la mano, más pesada de lo que se veía. Afuera el sol sigue blanquísimo y el aire sigue frío y las dos cosas siguen sin ponerse de acuerdo.
@sfx camara.wav
Le tomas foto a la bolsa y se la mandas a tu mamá.
@mensaje mama | yo | ya compré 📷
@mensaje mama | yo | no habían estacas, dicen que se compran en la maderera
Los tres puntitos aparecen y desaparecen como cuatro veces.
@mensaje mama | ya wawa gracias
@mensaje mama | sigo acá esto va para largo
@mensaje mama | el sistema no vuelve
@mensaje mama | ANDA A COMER algo caliente
@mensaje mama | no me estés esperando
@mensaje mama | pero comida de sitio ah no de la calle
@chat mama leer
ariel (neutral): Sigue en la notaría. Me mandó a comer.
Flor y Amaru se miran. Es como medio segundo de conversación silenciosa entre hermanos.
flor (feliz): Vente a la casa.
ariel (nervioso): No, no...
flor (feliz): Es acá nomás. Diez minutos.
ariel (nervioso): En serio no quiero molestar...
amaru (neutral): Mi mamá cocinó como para veinte personas. Siempre cocina para veinte personas. Somos cinco.
flor (feliz): Y hoy vino mi tía. Así que son treinta.
Y así, sin que quede muy claro en qué momento aceptaste, ya estás caminando de vuelta por el pasaje de la reja verde con una bolsa de ferretería en la mano.
@guardar
@capitulo cap02
`);
