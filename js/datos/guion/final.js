// =====================================================================
// FINAL - Tupananchikkama. Lo comparten las dos rutas.
// Después de los créditos se puede volver a la elección y jugar la otra ruta.
// =====================================================================
GUION.registrar('final', String.raw`

[si ruta == flor] @var jugo_flor = 1
[si ruta == amaru] @var jugo_amaru = 1
@guardar
@tarjeta ✦ FINAL ✦ | Tupananchikkama
@fondo casa_patio_noche
Y tú la miras. Y ella tiene la taza entre las manos y la cara distinta que tiene desde que llegó a esta ciudad.
[si ruta == flor] Detrás de ella están Flor y Amaru todavía peleando por un cable, y la tía sirviendo algo que nadie pidió, y Puku gritando.
[si ruta == amaru] Detrás de ella están Flor y Amaru todavía persiguiéndose por el patio, y la tía sirviendo algo que nadie pidió, y Puku gritando.
ariel (neutral): Pisillata.
Tu mamá baja la taza.
Y se le pone una cara que no le habías visto nunca. No es la de reírse con ternura y cambiar de tema. Es otra.
mama (seria): ...Ay.
ariel (nervioso): ¿Estuvo mal?
mama (feliz): No. No, estuvo bien.
Se le llenan los ojos y se apura en secárselos con el dorso de la mano, molesta consigo misma.
amaru (neutral): Estuvo un poquito mal.
Lo dice desde el otro lado.
flor (molesto): ¡AMARU!
amaru (neutral): Estuvo bien de contenido.
flor (molesto): ¡ESTUVO PERFECTO!
amaru (neutral): El contenido estuvo perfecto.
Y tu mamá se ríe con la mano en la cara, y le dice algo a la mamá de Flor en quechua, rápido, y las dos se ríen más, y esta vez tú entiendes dos palabras enteras en medio de la frase.
Dos.
Y con eso basta para saber que están hablando de ti.

# ===============================================================
== los_tres
@fondo parque_noche
@cuadro los_tres
@tarjeta La noche siguiente.
flor: ¿Y esa cuál es?
amaru: Esa es la llama.
flor: Yo no veo ninguna llama.
amaru: Está ahí.
ariel: Yo tampoco veo la llama.
amaru: Ustedes dos son ciegos.
@cuadro off

# ===============================================================
== el_carro
@fondo carro_interior
Dos días después. La misma carretera de curvas, en sentido contrario.
Adelante, tu mamá hablando con el conductor. Tú, en el asiento de atrás, con la frente apoyada en la ventana.
Los cerros pasando. La luz blanquísima.
[si pidio_foto == 1] En la mano, el celular. En la pantalla, una foto completamente negra.
[si pidio_foto != 1 && tema_azotea == video] En la mano, el celular. En la pantalla, un video de treinta segundos: un mate girando frente a un cerro borroso.
[si pidio_foto != 1 && tema_azotea != video] En la mano, el celular. En la pantalla, el grupo, con la foto de Puku arriba.
Y en la esquina de arriba, una notificación.
@sfx vibrar.mp3
@mensaje grupo | flor | ya llegaron?
@mensaje grupo | flor | AVISA
@mensaje grupo | amaru | avisa
@mensaje grupo | flor | AY MIREN QUIÉN HABLA
@mensaje grupo | flor | el que contesta con dos palabras
@mensaje grupo | amaru | son dos palabras porque alcanzan
@mensaje grupo | flor | 😐
@mensaje grupo | flor | ariel ayuda
@mensaje grupo | flor | ARIEL
@chat grupo leer
Escribes despacio, con el pulgar, sin buscar nada en las notas.
@mensaje grupo | yo | tupananchikkama
@mensaje grupo | flor | 🥹
@mensaje grupo | flor | AY
@mensaje grupo | flor | AMARU MIRA
@mensaje grupo | amaru | lo vi
@mensaje grupo | amaru | lo escribió bien
@chat grupo leer
Sonríes contra el vidrio.
Afuera, los cerros.

# ===============================================================
== creditos
@fondo off
@tarjeta KILLA | un verano en quechua
@tarjeta A quienes prestaron su voz. | Sin ellas y ellos, este juego sería solo texto.
@tarjeta A quienes revisaron cada palabra | y dijeron con paciencia: acá no se dice así.
@tarjeta Al quechua chanka, | que no está en un museo, | que se mezcla, se adapta, insulta con cariño, | manda mensajes por WhatsApp | y grita cosas desde la cocina.
@tarjeta A las madres que dejaron de enseñarlo | por miedo a que sus hijos hablaran raro, | y a las que lo enseñaron igual.
@tarjeta A quien lo está aprendiendo tarde: | pisillata también cuenta.
@tarjeta Tupananchikkama. | - FIN -
@guardar
* Volver a la tarde y quedarte con el otro -> otra_ruta [si jugo_flor != 1 || jugo_amaru != 1]
* Terminar -> terminar

== otra_ruta
@var volver_a_elegir = 1
@capitulo cap03

== terminar
@fin
`);
