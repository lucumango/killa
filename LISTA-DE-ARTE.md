# Lista de arte y audio por dibujar

Todo lo de esta lista sale directo del guion y de los mapas: son los archivos que el motor busca. Mientras no existan, en pantalla aparece un bloque de color con el nombre del archivo que falta. El número entre paréntesis es cuántas veces aparece en el guion (= prioridad).

La pantalla del juego mide **960 × 600 px** y se escala entera a la ventana. Todo lo de abajo se mide en esos píxeles "de juego".

---

## 0. Decisión de estilo (mi recomendación)

Tus referencias (Undertale, OFF, DDLC) mezclan dos cosas: **pixel art** para lo que se mueve en el mapa, y **dibujo** para los retratos y escenas. Te propongo lo mismo, y es lo que menos te va a costar mantener:

| Capa | Estilo | Por qué |
|---|---|---|
| Sprites de exploración | **Pixel art**, 1 px = 1 px (tamaño exacto de abajo) | Están en una grilla de 40 px; a línea se verían borrosos y chiquitos. |
| Bustos (retratos que hablan) | **Dibujo a línea + color plano**, o pixel art a 2× | Es donde se ve la emoción. A línea puedes hacer muchas emociones rápido copiando la base y cambiando ojos/boca (estilo DDLC). |
| Fondos de escena | El mismo estilo que los bustos | Bustos a línea sobre fondos pixel se ven raros. Si haces bustos pixel, fondos pixel a 2× (480 × 300 escalado). |
| Cuadros (escenas ilustradas) | **Dibujo**, el más trabajado | Son tus momentos fuertes. No necesitan parecerse al resto; es a propósito que "rompen" el estilo. |
| Menú, tarjetas, caja de diálogo | Texto sobre negro (ya está) | Solo hace falta una fuente y opcionalmente un marco. |

Si eliges **pixel para todo**, deja `estiloPixel: true` en `config.js` (bordes duros al escalar). Si eliges **línea para bustos y fondos**, pon `estiloPixel: false` (suavizado; los sprites del mapa pierden un poco de nitidez pero se ven bien).

Reglas que sirven en los dos casos:

- **PNG con fondo transparente** para bustos y sprites. Fondos y cuadros pueden ser PNG o JPG.
- **Bustos y fondos (dibujo): exporta al doble (2×)**: 440 × 520 para un busto, 1920 × 1200 para un fondo. El juego los achica solo y en pantalla completa se ven nítidos. Dibuja aún más grande si quieres (880 × 1040) y exporta a 440 × 520. **Sprites (pixel): tamaño exacto** y sin reescalar con suavizado. Ya está configurado así: `estiloPixel: false` en `config.js` suaviza bustos y fondos, y el mapa siempre va en pixel.
- Paleta chica y compartida entre personajes para que Flor, Amaru y Ariel parezcan del mismo mundo: está en `arte/paleta/` (muestras en PNG, `killa.swatches` para Procreate, `killa.gpl` para Krita, GIMP y Aseprite). Flor es la tarde (coral `#ef9c86`), Amaru la noche (gris carbón `#636878`), Ariel la luna (amarillo `#e9cf86`). Los nombres en el diálogo usan versiones más claras para leerse sobre la caja negra: Ariel `#f2d16b`, Flor `#ffa58c`, Amaru `#aab3c6`, Mamá `#c9a2ff`, Puku `#5ad65a`.
- Recuerda el momento de cada escena: **sol blanquísimo + frío**, luz de contraste alto, sombras duras. Eso puede ser tu marca visual de Ayacucho frente a Lima gris.

---

## 1. Bustos (`assets/img/bustos/personaje_emocion.png`)

**Tamaño en pantalla: 220 × 260 px** (ancho × alto); **exporta el PNG a 440 × 520** (el doble, misma proporción), fondo transparente. Se apoya en la esquina inferior izquierda, encima de la caja de diálogo, y se recorta al alto: dibuja de la cintura/pecho para arriba con la cabeza en el tercio superior. Deja ~10 px de aire arriba.

Truco para no morir: dibuja **primero el `neutral` de cada personaje**. Si falta una emoción, el juego usa el neutral automáticamente. Luego vas agregando emociones por orden de frecuencia.

### Flor (11 emociones)
| Archivo | Veces | Nota |
|---|---|---|
| `flor_feliz.png` | 163 | la base de Flor: sonrisa con toda la cara |
| `flor_burla.png` | 101 | ceja arriba, sonrisa de lado |
| `flor_seria.png` | 86 | modo maestra; también la azotea cuando se pone seria |
| `flor_triste.png` | 55 | la azotea: "no quiero irme", los ojos brillantes |
| `flor_molesto.png` | 50 | brazos cruzados, puchero (cuando pierde la del maní) |
| `flor_risa.png` | 40 | carcajada, ojos cerrados, hombros |
| `flor_sorpresa.png` | 30 | manos en la boca |
| `flor_curioso.png` | 19 | |
| `flor_rojo.png` | 11 | cuando la tía la elogia; la confesión de "gringo" |
| `flor_nervioso.png` | 8 | "te tengo que confesar algo" |
| `flor_neutral.png` | 0 directo, pero es el respaldo | puedes reusar feliz |

### Amaru (7 emociones)
| Archivo | Veces | Nota |
|---|---|---|
| `amaru_neutral.png` | 363 | manos en los bolsillos, mirando el piso. Es casi toda su ruta: vale la pena que sea el mejor |
| `amaru_seria.png` | 94 | mirando de frente, corrigiendo |
| `amaru_rojo.png` | 86 | orejas rojas, mirando a otro lado (el Ring Pop, el hombro) |
| `amaru_molesto.png` | 48 | "cállate" |
| `amaru_feliz.png` | 22 | media sonrisa escondida "detrás de tres puertas" |
| `amaru_triste.png` | 16 | hundido, "nadie me ha preguntado" |
| `amaru_sorpresa.png` | 12 | |

### Ariel (8 emociones)
| Archivo | Veces |
|---|---|
| `ariel_neutral.png` | 235 |
| `ariel_curioso.png` | 137 |
| `ariel_nervioso.png` | 124 |
| `ariel_feliz.png` | 96 |
| `ariel_sorpresa.png` | 49 |
| `ariel_burla.png` | 29 |
| `ariel_triste.png` | 27 |
| `ariel_molesto.png` | 20 |

### Secundarios (con 1 o 2 bustos alcanza; el resto cae en neutral)
| Personaje | Archivos | Nota |
|---|---|---|
| Mamá (Rosa) | `mama_seria.png` (15), `mama_feliz.png` (12), `mama_burla.png` (3) | casi todo por teléfono; al final, en el patio con la taza |
| Sra. María (mamá de Flor y Amaru) | `senora_feliz.png` (11), `senora_neutral.png` (5), `senora_molesto.png` (4), `senora_curioso.png` (3), `senora_risa`, `senora_sorpresa` (1 c/u) | |
| Tía (Rufina) | `tia_feliz.png` (9), `tia_curioso.png` (3), `tia_sorpresa.png` (3), `tia_seria`, `tia_molesto` (1 c/u) | |
| Doña Nati | `nati_neutral.png` (15), `nati_seria.png` (6), `nati_feliz.png` (5), `nati_curioso.png` (4) | la del kiosko, madrina de Amaru. Lentes en la punta de la nariz, tejido en las manos |
| Tío | `tio_feliz.png` (4), `tio_neutral.png` (2) | polo y sandalias con medias |
| Yuli | `yuli_curioso.png` (3), `yuli_risa.png` (2), `yuli_seria.png` (2) | la prima de 8 años: "¡HABLA FEO!" |
| Don Hilario | `hilario_neutral.png` (12), `hilario_feliz.png` (2) | chompa de rombos, banquito |
| Puku | `puku_neutral.png` (16) | el loro habla siempre igual |
| Conductor | ninguno (no habla en el guion todavía) | |

`voz`, `celular`, `primo`, `feli` (don Feli), `compadre`, `chica`, `profe` y `ninos` no tienen busto a propósito: son voces de la calle.

**Total mínimo para que nada se vea en bloque: 13 neutrales.** Total completo: unos 60 bustos.

---

## 2. Fondos de escena (`assets/img/fondos/nombre.png`)

**Tamaño: 960 × 600 px.** Cámara fija. La caja de diálogo tapa los **170 px de abajo** y el busto tapa la **esquina inferior izquierda (250 × 430 px)**, así que lo importante va arriba y a la derecha. Pueden ser más sencillos que los cuadros: son escenografía.

| Archivo | Veces | Qué es |
|---|---|---|
| `carro_interior.png` | 1 | dentro del carro, cerros por la ventana, nuca de la mamá y el conductor |
| `ciudad_entrada.png` | 1 | entrando a Ayacucho: casas con varillas, mototaxi, iglesia rosada al fondo |
| `plaza.png` | 1 | plaza de armas: portales con arcos, pileta, palmeras en bola (se usa antes de explorar) |
| `calle_bajada.png` | 1 | callecita empedrada en bajada, pared azul añil, zapatillas colgadas |
| `calle_loro.png` | 2 | la calle vacía con la carretilla, geranios, ropa tendida y la jaula de Puku bajo el alero. **Es donde se conoce a los hermanos: escena larga, invierte acá** |
| `calle_subida.png` | 1 | pasaje con reja verde subiendo |
| `calle_mercado.png` | 1 | más gente, pan, mototaxi |
| `ferreteria_afuera.png` | 3 | letrero "FERRETERÍA EL PROGRESO", sacos de cemento |
| `ferreteria_adentro.png` | 1 | mostrador largo, estantes al techo, tele chiquita, don Hilario en su banquito |
| `casa_calle.png` | 2 | la puerta de la casa de los Quispe Ccori desde afuera |
| `casa_patio.png` | 2 | patio-sala: mesa con hule floreado, sillas de plástico de 3 colores, regleta con celulares, parlante, jaula |
| `casa_mesa.png` | 1 | la mesa de cerca, plato de puca picante, Inca Kola |
| `kiosko_barrio.png` | 1 | ventanita enrejada con doña Nati tejiendo, luz dorada |
| `calle_kiosko.png` | 2 | el pasaje a las cinco, luz dorada: los señores en cajones de cerveza, el cartel de CHUQLLU, la chica con la wawa, la ronda. Sirve de ida y de vuelta (extras en una capa aparte) |
| `casa_patio_tarde.png` | 5 | el patio con los dos parlantes grandes contra la pared y el enredo de cables. Puede ser `casa_patio` con otra luz + la capa de los parlantes |
| `calle_atardecer.png` | 3 | caminando a la casa del tío: paredes anaranjadas, después el cielo morado |
| `casa_tio.png` | 1 | la puerta verde descascarada y el patio lleno: cajas, triciclo sin ruedas, mesa de ping pong |
| `casa_calle_noche.png` | 1 | `casa_calle` de noche, con la casa llena y la música |
| `calle_oscura.png` | 1 | bajada sin postes, el cono de la linterna en el empedrado |
| `parque_noche.png` | 3 | el parque feo de cemento con el Mayu cruzando el cielo. **El fondo más lucido de la ruta de Amaru**; se reusa para "Los tres" |
| `casa_patio_noche.png` | 3 | el patio de noche con la fiesta: la mamá en la silla verde, primos, el parlante |
| `tienda_mates.png` | 1 | la sala-tienda con la vitrina de mates burilados y el alféizar con el cerro atrás |
| `azotea_tarde.png` | 1 | tanque negro, ropa tendida, varillas, y toda la ciudad anaranjada |
| `azotea_noche.png` | 1 | la misma azotea en morado y azul, las luces de la ladera prendiéndose, la uña de luna |

Son 25. Si quieres recortar: `calle_bajada` y `calle_mercado` pueden ser variaciones de `calle_subida`; `casa_mesa` puede ser un zoom de `casa_patio`; `casa_patio_tarde` y `casa_patio_noche` son `casa_patio` con otra paleta; `calle_oscura` es `calle_subida` de noche; `azotea_noche` es `azotea_tarde` con la otra paleta.

---

## 3. Cuadros / escenas ilustradas (`assets/img/cuadros/nombre.png`)

**Tamaño: 960 × 600 px.** Ocupan toda la pantalla, sin busto; solo la caja de diálogo abajo (170 px). Composición: lo importante en los 430 px de arriba.

| Archivo | Momento |
|---|---|
| `loro_encuentro.png` | Puku en la jaula de fierro bajo el alero, cabeza ladeada, ojo amarillo mirando al jugador. Ya está en el guion. |
| `los_tres.png` | "La noche siguiente": el parque feo de noche, los tres echados en fila mirando arriba, Flor en el medio. La linterna con el celofán rojo tirada a un lado, tiñendo todo. Amaru señalando algo. Flor a media carcajada. Ariel mirándolos a ellos en vez de al cielo. Arriba, el Mayu. Ya está en el guion (final). |

Momentos que **te sugiero** ilustrar también (solo hay que agregar `@cuadro nombre` en el guion donde quieras):

| Archivo sugerido | Momento |
|---|---|
| `hermanos_escalon.png` | Flor y Amaru en el escalón de la puerta, la primera vez que los ves |
| `allinllachu_fuerte.png` | Flor con la barbilla arriba gritando ¡Allinllachu! a la calle |
| `hilario_mira.png` | Don Hilario levantando la vista del televisor tras el haykataq |
| `patio_fiesta.png` | entrar al patio y que todos cambien al español |
| `mama_cara.png` | la señora María tomándote la cara con las dos manos |
| `notas_celular.png` | la libreta/las notas del celular llenas, de noche |

---

## 4. Sprites de exploración (`assets/img/sprites/nombre.png`)

**Grilla de 40 × 40 px.** Pixel art, tamaño exacto, fondo transparente. Vista desde arriba tipo Undertale/Earthbound (3/4, se ve la cara y el cuerpo). Por ahora **un solo frame quieto** por sprite: el motor todavía no anima el caminar. Si quieres animación (4 direcciones × 2–3 frames), avísame y lo agrego; dibuja entonces una tira horizontal.

| Archivo | Tamaño | Quién |
|---|---|---|
| `ariel.png` | 32 × 32 (se dibuja un poco más chico que la casilla) | el jugador |
| `flor.png` | 40 × 40 | en el patio |
| `amaru.png` | 40 × 40 | en el patio |
| `puku.png` | 40 × 40 | la jaula con el loro |
| `perro.png` | 40 × 40 | el perro panza arriba de la plaza |
| `heladero.png` | 40 × 40 | carrito con bocinita |

Objetos grandes de los mapas que hoy son rectángulos de color (opcional dibujarlos; si los haces, el tamaño es ancho × alto de casillas):

| Mapa | Objeto | Tamaño px |
|---|---|---|
| plaza | kiosko | 40 × 80 |
| plaza | catedral (fachada arriba) | 240 × 40 |
| plaza | pileta | 80 × 80 |
| plaza | señores en la banca | 80 × 40 |
| plaza | vitrina de artesanía | 40 × 80 |
| plaza | notaría | 40 × 40 |
| casa | regleta con celulares | 80 × 40 |
| casa | laptop, calendario, parlante | 40 × 40 c/u |
| casa | mesa de Amaru (cautín, multímetro) | 120 × 40 |
| casa | cocina (puerta) | 160 × 40 |

Para usarlos: en `mapas.js` agrega `sprite: 'assets/img/sprites/kiosko.png'` al objeto.

**Tiles del piso** (opcional): hoy cada letra del mapa es un cuadrado de color. Si quieres texturas (empedrado, tierra, adobe, agua), dime y hago que la leyenda acepte imágenes de 40 × 40.

---

## 5. Interfaz

| Qué | Tamaño | Nota |
|---|---|---|
| Fuente | .ttf o .otf | Una pixel (ej. "Determination Mono" no se puede usar comercialmente; busca "Pixel Operator", "m5x7", "Silkscreen", "Press Start 2P") o una monoespaciada normal. Se cambia en `estilo.css`, variable `--fuente`. |
| Cursor de selección | texto | Hoy es un ❤ rojo como Undertale. Cámbialo en `estilo.css` (`.seleccionado::before`). |
| Marco de la caja de diálogo | CSS | Hoy borde blanco de 4 px sobre negro. Si quieres marco dibujado, hazlo de 900 × 150 px con 9-slice y te lo conecto. |
| Pantalla de dedicatoria | texto | Puedes poner una imagen de fondo de 960 × 600 si quieres (`#pantalla-dedicatoria` en el CSS). |
| Menú | texto | Igual: fondo opcional 960 × 600 (`#pantalla-menu`). |
| Tarjetas de capítulo | texto sobre negro | "Capítulo 1 | La carretera", "Capítulo 2 | La casa", "PUNTO DE GUARDADO", "ELIGE RUTA", "FINAL" y los créditos. |
| Celular | CSS | Marco dibujado ya en CSS (380 × 560). Si quieres pantalla de bloqueo o fondo de chat, 360 × 480. |

Para itch.io: **portada 630 × 500 px** y opcionalmente un banner de 960 × 400 y 3–5 capturas.

---

## 6. Audio

### Música (`assets/audio/musica/`, .mp3 u .ogg, en loop)
| Archivo | Escena |
|---|---|
| `carretera.mp3` | el carro subiendo; mareo, quechua de fondo |
| `plaza.mp3` | la plaza, sol y frío, heladero |
| `caminata.mp3` | caminando con los hermanos hacia la ferretería (ligera, tema de Flor) |
| `huayno_lejos.mp3` | huayno con arpa oído desde media cuadra (filtrado, lejano) |
| `huayno_patio.mp3` | el mismo huayno adentro del patio, a todo volumen (puede ser la misma pista sin filtro) |
| `menu.mp3` (opcional) | se activa en `config.js` → `musicaMenu` |

La escena del loro y la ferretería van **sin música** a propósito (`@musica off`).

### Efectos (`assets/audio/sfx/`, .wav cortos)
| Archivo | Cuándo |
|---|---|
| `camara.wav` | foto a Puku, foto a la bolsa |
| `vibrar.wav` | llega WhatsApp de la mamá; las llamadas perdidas; el celular en la azotea |
| `yape.wav` | "¡Yapeaste!" |
| `mensaje.wav` (opcional) | cada mensaje de chat; se activa en `config.js` → `sfxMensaje` |
| `beep_flor.wav`, `beep_amaru.wav`… (opcional) | el beep al hablar. Hoy se genera solo por código con un tono distinto por personaje; si grabas uno, ponlo en `personajes.js` → `beep:` |

### Palabras (`assets/audio/palabras/id.mp3`)
Una grabación corta por palabra, 84 en total (todas menos *Acuchimay*). Los nombres de archivo exactos son el `id` de cada entrada en `js/datos/palabras.js` (ej. `sulpayki.mp3`, `allinllachu.mp3`, `chunka_pusaq.mp3`, `sesentaysiete.mp3`). Idealmente grabadas por un hablante de quechua ayacuchano; graba en un solo archivo largo y córtalo después.

---

## 7. Orden sugerido para empezar

1. Fuente + 10 bustos neutrales (así ya "se ve" el juego entero).
2. `calle_loro.png` (fondo) + `loro_encuentro.png` (cuadro) + `ariel.png` (sprite): la escena más importante queda completa.
3. Flor feliz/burla, Amaru seria/molesto, Ariel nervioso/curioso: cubren el 80 % de las líneas.
4. Fondos de la plaza, casa_patio, ferreteria_adentro.
5. El resto de emociones y fondos por la columna "Veces".
6. Audio al final; el juego funciona sin él.
