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
- **Dibuja al doble (2×) y exporta al tamaño final** si es línea: 440 × 520 para un busto, 1920 × 1200 para un fondo. Si es pixel, dibuja al tamaño exacto y NO reescales con suavizado.
- Paleta chica y compartida entre personajes para que Flor, Amaru y Ariel parezcan del mismo mundo: está en `arte/paleta/` (muestras en PNG, `killa.swatches` para Procreate, `killa.gpl` para Krita, GIMP y Aseprite). Flor es la tarde (coral `#ef9c86`), Amaru la noche (gris carbón `#636878`), Ariel la luna (amarillo `#e9cf86`). Los nombres en el diálogo usan versiones más claras para leerse sobre la caja negra: Ariel `#f2d16b`, Flor `#ffa58c`, Amaru `#aab3c6`, Mamá `#c9a2ff`, Puku `#5ad65a`.
- Recuerda el momento de cada escena: **sol blanquísimo + frío**, luz de contraste alto, sombras duras. Eso puede ser tu marca visual de Ayacucho frente a Lima gris.

---

## 1. Bustos (`assets/img/bustos/personaje_emocion.png`)

**Tamaño: 220 × 260 px** (ancho × alto), fondo transparente. Se apoya en la esquina inferior izquierda, encima de la caja de diálogo, y se recorta al alto: dibuja de la cintura/pecho para arriba con la cabeza en el tercio superior. Deja ~10 px de aire arriba.

Truco para no morir: dibuja **primero el `neutral` de cada personaje**. Si falta una emoción, el juego usa el neutral automáticamente. Luego vas agregando emociones por orden de frecuencia.

### Flor (12 emociones)
| Archivo | Veces | Nota |
|---|---|---|
| `flor_feliz.png` | 112 | la base de Flor: sonrisa con toda la cara |
| `flor_burla.png` | 70 | ceja arriba, sonrisa de lado |
| `flor_seria.png` | 26 | modo maestra |
| `flor_molesto.png` | 24 | brazos cruzados, puchero (cuando pierde la del maní) |
| `flor_risa.png` | 24 | carcajada, ojos cerrados, hombros |
| `flor_sorpresa.png` | 16 | manos en la boca |
| `flor_curioso.png` | 5 | |
| `flor_triste.png` | 3 | "perdón" a Amaru |
| `flor_nervioso.png` | 2 | |
| `flor_rojo.png` | 2 | cuando la tía la elogia |
| `flor_neutral.png` | 0 directo, pero es el respaldo | puedes reusar feliz |

### Amaru (7 emociones)
| Archivo | Veces | Nota |
|---|---|---|
| `amaru_neutral.png` | 88 | manos en los bolsillos, mirando el piso |
| `amaru_seria.png` | 45 | mirando de frente, corrigiendo |
| `amaru_molesto.png` | 33 | "cállate" |
| `amaru_rojo.png` | 17 | orejas rojas, mirando a otro lado |
| `amaru_feliz.png` | 14 | media sonrisa escondida "detrás de tres puertas" |
| `amaru_triste.png` | 3 | hundido en la silla, "yaya" |
| `amaru_sorpresa.png` | 2 | |

### Ariel (8 emociones)
| Archivo | Veces |
|---|---|
| `ariel_neutral.png` | 82 |
| `ariel_nervioso.png` | 38 |
| `ariel_curioso.png` | 28 |
| `ariel_feliz.png` | 19 |
| `ariel_sorpresa.png` | 8 |
| `ariel_burla.png` | 6 |
| `ariel_molesto.png` | 4 |
| `ariel_triste.png` | 1 |

### Secundarios (con 1 o 2 bustos alcanza; el resto cae en neutral)
| Personaje | Archivos | Veces |
|---|---|---|
| Mamá (Rosa) | `mama_seria.png` (4), `mama_feliz.png` (2), `mama_burla.png` (1) | |
| Sra. Rufina (mamá de Flor y Amaru) | `senora_feliz.png` (8), `senora_neutral.png` (5), `senora_curioso.png` (3), `senora_molesto`, `senora_risa`, `senora_sorpresa` (1 c/u) | |
| Tía | `tia_feliz.png` (9), `tia_curioso.png` (3), `tia_sorpresa.png` (3), `tia_seria.png` (1) | |
| Don Hilario | `hilario_neutral.png` (12), `hilario_feliz.png` (2) | chompa de rombos, banquito |
| Puku | `puku_neutral.png` (11) | el loro habla siempre igual |
| Conductor | ninguno (no habla en el guion todavía) | |

`voz` y `celular` no tienen busto a propósito.

**Total mínimo para que nada se vea en bloque: 10 neutrales.** Total completo: 45 bustos.

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
| `kiosko_barrio.png` | 1 | ventanita enrejada con la señora tejiendo |
| `calle_casa_noche.png` | 1 | volviendo del kiosko, atardecer/noche |

Son 14. Si quieres recortar: `calle_bajada` y `calle_mercado` pueden ser variaciones de `calle_subida`; `casa_mesa` puede ser un zoom de `casa_patio`.

---

## 3. Cuadros / escenas ilustradas (`assets/img/cuadros/nombre.png`)

**Tamaño: 960 × 600 px.** Ocupan toda la pantalla, sin busto; solo la caja de diálogo abajo (170 px). Composición: lo importante en los 430 px de arriba.

| Archivo | Momento |
|---|---|
| `loro_encuentro.png` | Puku en la jaula de fierro bajo el alero, cabeza ladeada, ojo amarillo mirando al jugador. Ya está en el guion. |

Momentos que **te sugiero** ilustrar también (solo hay que agregar `@cuadro nombre` en el guion donde quieras):

| Archivo sugerido | Momento |
|---|---|
| `hermanos_escalon.png` | Flor y Amaru en el escalón de la puerta, la primera vez que los ves |
| `allillanchu_fuerte.png` | Flor con la barbilla arriba gritando ¡Allinllachu! a la calle |
| `hilario_mira.png` | Don Hilario levantando la vista del televisor tras el hayk'ataq |
| `patio_fiesta.png` | entrar al patio y que todos cambien al español |
| `mama_cara.png` | la señora Rufina tomándote la cara con las dos manos |
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
| Tarjetas de capítulo | texto sobre negro | "Capítulo 1 | La carretera", "Capítulo 2 | La casa", "PUNTO DE GUARDADO", "CONTINUARÁ". |
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
| `vibrar.wav` | llega WhatsApp de la mamá |
| `yape.wav` | "¡Yapeaste!" |
| `mensaje.wav` (opcional) | cada mensaje de chat; se activa en `config.js` → `sfxMensaje` |
| `beep_flor.wav`, `beep_amaru.wav`… (opcional) | el beep al hablar. Hoy se genera solo por código con un tono distinto por personaje; si grabas uno, ponlo en `personajes.js` → `beep:` |

### Palabras (`assets/audio/palabras/id.mp3`)
Una grabación corta por palabra, 53 en total. Los nombres de archivo exactos son el `id` de cada entrada en `js/datos/palabras.js` (ej. `sulpayki.mp3`, `allillanchu.mp3`, `chunka_pusaq.mp3`, `sesentaysiete.mp3`). Idealmente grabadas por un hablante de quechua ayacuchano; graba en un solo archivo largo y córtalo después.

---

## 7. Orden sugerido para empezar

1. Fuente + 10 bustos neutrales (así ya "se ve" el juego entero).
2. `calle_loro.png` (fondo) + `loro_encuentro.png` (cuadro) + `ariel.png` (sprite): la escena más importante queda completa.
3. Flor feliz/burla, Amaru seria/molesto, Ariel nervioso/curioso: cubren el 80 % de las líneas.
4. Fondos de la plaza, casa_patio, ferreteria_adentro.
5. El resto de emociones y fondos por la columna "Veces".
6. Audio al final; el juego funciona sin él.
