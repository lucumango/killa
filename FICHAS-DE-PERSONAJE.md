# Fichas de personaje

Hazlas antes de los bustos: cada busto es "la ficha + una emoción". Si la ficha está firme, las 45 emociones salen copiando la base y cambiando cara y brazos.

## Qué lleva una ficha (una hoja por personaje)

1. **Datos**: nombre completo, edad, de dónde es, qué hace. Tres palabras de personalidad.
2. **Silueta**: figura de cuerpo entero rellena de negro. Si se reconoce a la persona sin detalles, está bien. Dibuja a los tres protagonistas en el mismo lienzo (*line-up*) para fijar alturas y proporciones entre ellos.
3. **Rasgos fijos** (lo que nunca cambia entre emociones): forma de cara, pelo, ropa, un accesorio. Máximo 5. Es lo que hace que Flor sea Flor en las 11 emociones.
4. **Paleta**: 5 a 7 colores con su código. Piel, pelo, ropa principal, ropa secundaria, un color de acento. Anótalos en la hoja y no los cambies.
5. **Tres vistas de la cabeza**: frente, 3/4, perfil. El busto del juego se dibuja en 3/4 mirando hacia la derecha (hacia el texto).
6. **Expresión base**: la cara en reposo. Para Flor es la sonrisa; para Amaru la boca recta mirando abajo. De acá salen las demás.
7. **Tics físicos**: 3 gestos que hace con el cuerpo. Se convierten directamente en poses de busto (abajo).
8. **Lo que NO hace**: una línea. Amaru no gesticula con los brazos abiertos. Flor no está quieta.
9. **Sprite de 40 px** al lado, con la misma paleta, para que el mapa y el busto sean la misma persona.

## Cómo hacerla (proceso)

- Lienzo de 2000 × 1200 px para la ficha (es un documento tuyo, no entra al juego).
- Empieza por el **line-up** de Ariel, Flor y Amaru con una línea de piso y una de cabeza. Del guion: Flor es "un poquito más baja"; Amaru y Ariel de la misma altura más o menos; Flor y Amaru tienen "el mismo pelo negrísimo y la misma forma de cara"; Ariel tiene "la misma cara" de su mamá Rosa y "cara de Ayacucho".
- Luego la cabeza en tres vistas y una tira de 4 expresiones rápidas (base, feliz, molesto, sorpresa) para probar si la cara aguanta emociones.
- Recién ahí el busto base para el juego: lienzo 440 × 520 (2×), cuerpo de la cintura para arriba, en 3/4. Guarda las **capas separadas**: cuerpo / brazos / cabeza / cara (ojos, cejas, boca) / rubor. Cada emoción es una combinación de capas, no un dibujo nuevo. Exporta a 220 × 260 PNG transparente con el nombre `id_emocion.png`.
- Para bustos, mantén el **cuerpo idéntico** en todas las emociones salvo las 2 o 3 poses con brazos (facepalm, brazos cruzados, brazos arriba). Si el cuerpo cambia en cada una, el personaje "salta" al cambiar de emoción.

Regla del encuadre del busto (220 × 260): la cabeza en el tercio superior, hombros a media altura, y las manos, si aparecen, entre el pecho y la barbilla. Brazos arriba: recórtalos en las muñecas o dibuja la figura un 10 % más chica en esa pose.

---

## ARIEL (jugador) — `ariel`

- 18 años, limeño, hijo único, sabático, postulando a EE. UU. Palabras: **observador, nervioso, con humor callado**.
- Rasgos fijos: casaca (la que "los hace pensar que es gringo"), celular en la mano, botella de agua del kiosko en varias escenas, cara redonda "de Ayacucho" con corte y ropa de Lima. Color de acento del juego: `#f2d16b`.
- Base: postura recta pero rígida, como quien no sabe dónde poner las manos. Ojos grandes: es el que mira.
- Tics: juntar los dedos índice (tu idea, va en `nervioso`), inclinarse hacia adelante cuando quiere saber algo, mano en el pecho cuando se asusta.
- NO hace: gestos grandes. Sus emociones son chicas; la cámara está en su cabeza.

| Archivo | Pose |
|---|---|
| `ariel_neutral` | recto, celular en una mano, boca cerrada, mirando al frente |
| `ariel_nervioso` | hombros encogidos, **dedos índice juntos** a la altura del pecho, mirada abajo, boca chiquita (el "hilito de voz") |
| `ariel_curioso` | **inclinado hacia adelante**, ojos bien abiertos, cejas arriba, una mano medio levantada (la cara que desarma a Amaru) |
| `ariel_feliz` | barbilla arriba, sonrisa chiquita "que no puede controlar", pecho abierto (el ¡Allilanchu! fuerte) |
| `ariel_sorpresa` | paso atrás, **mano en el pecho**, ojos redondos (el loro) |
| `ariel_burla` | **manos juntas como alumno modelo**, sonrisa apretada, cejas inocentes ("Sí, profesor") |
| `ariel_molesto` | ceño, brazos un poco abiertos con las palmas arriba ("¡Ah, ya!") |
| `ariel_triste` | mirada baja, boca cerrada, sin gesto: es el nudo en la garganta cuando Flor habla de la mamá mezclando idiomas. Contenido, no llorón |
| extra `ariel_verde` | mareado en el carro: frente contra el vidrio, ojos cerrados, verde en las mejillas |
| extra `ariel_celular` | mirando la pantalla con las dos manos, luz azul en la cara (para los WhatsApp) |

## FLOR — `flor` (Flor Miski María Quispe Ccori)

- 19, ayacuchana, entra a la PUCP en marzo. Palabras: **expansiva, maestra, chismosa con cariño**.
- Rasgos fijos: casaca rosada con el **cierre a medio subir** (siempre a la misma altura), pelo negrísimo, misma forma de cara que Amaru, "sonríe con toda la cara". Acento `#ff8fb1`.
- Base: el cuerpo nunca está derecho: cadera a un lado, cabeza ladeada. Ocupa espacio.
- Tics: agarrarte del brazo, dedo índice pedagógico, taparse la boca con las dos manos.
- NO hace: quedarse quieta ni mirar al piso (eso es de Amaru; solo lo hace en `molesto` a propósito, copiándolo).

| Archivo | Pose |
|---|---|
| `flor_feliz` (base) | sonrisa con ojos achinados, cabeza ladeada, una mano en la cadera |
| `flor_burla` | ceja arriba, sonrisa de lado, **dedo índice apuntándote** ("¡preguntó!") |
| `flor_seria` | modo maestra: pies separados, **dedo levantado**, cejas rectas, boca en "o" pronunciando |
| `flor_molesto` | **brazos cruzados y hundida**, puchero, mirando a un lado: es la postura exacta de Amaru (el guion lo señala) |
| `flor_risa` | **doblada hacia adelante**, ojos cerrados, una mano en la panza y la otra secándose un ojo |
| `flor_sorpresa` | **dos manos en la boca**, ojos gigantes ("¡AY! ¡Dijo allin p'unchay!") |
| `flor_curioso` | cuello estirado hacia adelante "con una falta de disimulo impresionante", cejas arriba |
| `flor_triste` | hombros caídos, se muerde el labio, manos juntas ("perdón") |
| `flor_nervioso` | mano en la nuca, sonrisa torcida |
| `flor_rojo` | rubor, cara volteada, manos escondidas en las mangas (cuando la tía la elogia) |
| extra `flor_gol` | **los dos brazos arriba** como si hubiera metido gol (tu idea; "¡PERO SE PUEDE!" y "¡GRACIAS, ARIEL DE LIMA!"). Recorta en las muñecas |
| extra `flor_agarra` | te agarra del brazo: brazo extendido hacia la derecha saliendo del cuadro |

## AMARU — `amaru` (Jorge Amaru Jesús Quispe Ccori)

- 17 (18 en noviembre), academia, va a postular a electrónica aunque diga que no. Palabras: **seco, preciso, tímido que se pone rojo**.
- Rasgos fijos: polera negra, **manos en los bolsillos** (es su rasgo número uno: en la mayoría de bustos las manos no se ven), pelo negrísimo, orejas visibles (para ponerlas rojas). Acento `#7fb3ff`.
- Base: hombros un poco encogidos, mirando al piso, boca recta. Se comunica con la cabeza y las cejas, no con los brazos.
- Tics: pasarse la mano por la nuca, ponerse rojo hasta las orejas, resoplar por la nariz.
- NO hace: sonreír con toda la boca (su sonrisa es "media, en una esquina, detrás de tres puertas"). No abre los brazos.

| Archivo | Pose |
|---|---|
| `amaru_neutral` (base) | manos en los bolsillos, mirando abajo a la izquierda, boca recta |
| `amaru_seria` | mira de frente por primera vez, **una mano fuera del bolsillo con gesto vago** ("el -qa es como…"), cejas rectas |
| `amaru_molesto` | ojos entrecerrados o en blanco, boca apretada, **manos más metidas** en los bolsillos, mentón levantado ("Cállate") |
| `amaru_rojo` | orejas y pómulos rojos, **cara volteada** lejos de ti, mano en la nuca |
| `amaru_feliz` | media sonrisa en una sola esquina, cabeza baja pero ojos hacia ti. Nada más cambia |
| `amaru_triste` | hundido, brazos cruzados, mirando al techo ("yaya") |
| `amaru_sorpresa` | cabeza levantada rápido, cejas arriba, boca entreabierta, manos saliendo de los bolsillos |
| extra `amaru_facepalm` | **las dos manos por la cara** (tu idea; "se pasa las dos manos por la cara y las deja ahí un momento") |
| extra `amaru_espaldas` | de espaldas, sin entrar a la casa: solo nuca y hombros, orejas rojas asomando |
| extra `amaru_risa` | echado para atrás, risa "oxidada" con la boca abierta: la única vez que se ríe fuerte (la pizza con piña). Guárdala para ese momento |

## Secundarios (un busto base y una o dos variaciones)

| Personaje | id | Ficha corta | Poses |
|---|---|---|---|
| Mamá (Rosa) | `mama` | Ayacuchana en Lima. Bolso, papeles contados con el pulgar, "modo trámite". Ariel tiene su cara: diséñalos juntos. Acento `#c9a2ff` | `seria`: papeles en la mano, mirando de reojo por encima del asiento. `feliz`: ojos brillantes mirando la iglesia. `burla`: "no te pierdas, ah", ya de espaldas girando la cabeza |
| Sra. Rufina | `senora` | Mamá de Flor y Amaru: "la misma cara de los dos, más el tiempo". Mandil, secándose las manos | `feliz`: secándose las manos, sonrisa. `neutral`: asomada desde la cocina. `sorpresa`: las dos manos extendidas (te toma la cara). `curioso`, `molesto`, `risa`: variaciones de cara |
| Tía | `tia` | Hermana de Rufina, más ancha, tenedor u olla en la mano siempre | `feliz` base con tenedor. `sorpresa`: parada, olla en alto ("¡ROSITA!"). `curioso`, `seria`: cara |
| Don Hilario | `hilario` | Mayor, chompa de rombos, banquito, tele chiquita, calculadora vieja | `neutral`: perfil mirando la tele, sin mirarte. `feliz`: levanta la cabeza con risita por la nariz, calculadora en la mano |
| Puku | `puku` | Loro verde manzana, alas más oscuras, rayitas amarillas junto a la cara, ojo redondo amarillo | `neutral`: cabeza ladeada mirándote con un ojo. extra `perfil`: se pone de perfil para la foto |

## Cómo usar las poses "extra"

El guion hoy usa solo las emociones de las tablas principales. Si dibujas una extra, dime en qué línea va y cambio el paréntesis en el guion (por ejemplo `amaru (facepalm):` en "¿Ves lo que hace? Todo el día."). O hazlo tú: es cambiar la palabra entre paréntesis en `js/datos/guion/cap01.js`.

## Orden

1. Line-up de los tres (una tarde).
2. Ficha de Flor y Amaru juntos, porque comparten cara: resuelve qué los diferencia (cejas, pelo, boca).
3. Ficha de Ariel junto a Rosa.
4. Bustos base neutrales de los tres + Puku.
5. Emociones por frecuencia (`LISTA-DE-ARTE.md`).
