# Quechua para limeños — motor de novela narrativa

Juego 2D tipo Undertale / DDLC / OFF hecho en HTML + JS puro. **No necesita instalar nada** para jugar ni para editar: abre los archivos con cualquier editor de texto.

```
quechua-novela/
├── index.html              ← la página del juego (no hace falta tocarla)
├── css/estilo.css          ← colores, fuente, tamaños de la caja de diálogo, etc.
├── js/datos/               ← ★ TODO LO QUE EDITAS ESTÁ ACÁ ★
│   ├── config.js           ← título, dedicatoria, instrucciones, créditos, teclas, velocidad del texto, IA
│   ├── personajes.js       ← personajes (nombre, color, beep) y contactos del chat
│   ├── palabras.js         ← la lista de palabras en quechua (y sus audios)
│   ├── mapas.js            ← los mapas de exploración (vista desde arriba)
│   ├── ia.js               ← el prompt de la IA y las respuestas del modo sin internet
│   └── guion/cap01.js, cap02.js  ← EL GUION
├── js/motor/               ← el código del juego (no hace falta tocarlo)
├── assets/img/fondos/      ← fondos de escena (cámara fija):  nombre.png
├── assets/img/cuadros/     ← ilustraciones grandes (el loro, etc.):  nombre.png
├── assets/img/bustos/      ← bustos de personajes:  flor_feliz.png, amaru_rojo.png ...
├── assets/img/sprites/     ← sprites para exploración:  ariel.png, flor.png, puku.png ...
├── assets/audio/musica/    ← pistas en loop (.mp3 / .ogg)
├── assets/audio/sfx/       ← efectos (.wav / .mp3)
├── assets/audio/palabras/  ← audio de cada palabra:  sulpayki.mp3 ...
├── servidor-ia/            ← servidor chiquito para la IA del chat (opcional)
├── escritorio/             ← para hacer versión descargable (Mac/Windows/Linux)
├── validar.js              ← `node validar.js` revisa que el guion no tenga errores
└── empaquetar-web.sh       ← crea el .zip para itch.io
```

Mientras no exista una imagen, el juego dibuja un **bloque de color con el nombre del archivo que espera** (por ejemplo `fondo: plaza (sin imagen)`). Así sabes exactamente qué archivo crear y dónde ponerlo. Cuando el archivo existe, se usa solo.

---

## 1. Probarlo en tu compu

El navegador bloquea algunas cosas si abres `index.html` con doble clic, así que sírvelo con un servidor local (tienes Python):

```bash
cd ~/quechua-novela
python3 -m http.server 8765
```

y abre <http://localhost:8765>. (El puerto 8000 lo tienes ocupado por otro programa.)

Para revisar el guion sin abrir el navegador:

```bash
node validar.js
```

Te dice si hay etiquetas que no existen, palabras que no están en `palabras.js`, personajes mal escritos, etc.

## 2. Subirlo a itch.io

```bash
./empaquetar-web.sh
```

Crea `juego-web.zip`. En itch.io: *Create new project* → *Kind of project: HTML* → sube el zip → marca **"This file will be played in the browser"** → *Viewport dimensions*: **960 × 600** → marca *Fullscreen button*. Listo.

## 3. Versión descargable (Mac / Windows / Linux)

Se hace con Electron, que envuelve la misma carpeta web en una app:

```bash
cd ~/quechua-novela/escritorio
npm install
mkdir -p juego && cp -r ../index.html ../css ../js ../assets juego/
npm start            # la abre para probar
npm run empaquetar   # genera los instaladores en escritorio/salida/
```

(Para Windows y Linux desde Mac, electron-builder puede pedir dependencias extra; si se queja, empaqueta solo `--mac` y para los otros usa la versión web.)

---

## 4. Cómo se escribe el guion

Los capítulos están en `js/datos/guion/`. Cada archivo es texto plano dentro de:

```js
GUION.registrar('cap01', String.raw`
  ... acá va el guion ...
`);
```

**Única regla rara:** no uses el acento grave `` ` `` dentro del texto (rompe el archivo).

### Diálogo y narración

```
Texto suelto = narración (caja en cursiva, sin nombre).
flor: Hola.                          ← habla Flor (busto flor_neutral.png)
flor (feliz): ¡Habla!                ← Flor con la emoción "feliz" (busto flor_feliz.png)
amaru (rojo): ...Sí.
puku: ¡Loro!
ariel (nervioso): ...Allinllachu...
```

- El nombre antes de los dos puntos es el **id** de `personajes.js` (en minúsculas).
- La emoción entre paréntesis es libre: `feliz`, `seria`, `burla`, `risa`, `rojo`, `molesto`, `triste`, `sorpresa`, `nervioso`, `curioso`, `neutral`… Cada una es un archivo `id_emocion.png` en `assets/img/bustos/`. Si no existe, se ve un bloque del color del personaje con el nombre de la emoción, para que sepas qué te falta dibujar.
- Cada línea es una caja de diálogo. Pon líneas cortas si quieres más "clic clic".
- `# lo que sea` es un comentario (no sale en el juego).

### Etiquetas, saltos y opciones

```
== nombre_de_etiqueta            ← un lugar al que se puede saltar
@ir nombre_de_etiqueta           ← salta ahí

* Vengo de viaje. -> resp_viaje   ← varias líneas con * seguidas = menú de opciones
* Me perdí. -> resp_perdi
* Yo... sí vivo acá. -> resp_vivo [si presentacion == viaje]   ← opción condicional (opcional)
```

### Variables y condiciones

```
@var presentacion = viaje        ← guarda un valor
@var puntos += 1
@si presentacion == viaje -> etiqueta        ← salta si se cumple
@si uso_haykataq != 1 -> sin_descuento
```

### Escena (cámara fija)

```
@fondo plaza                 ← assets/img/fondos/plaza.png   (off = negro)
@cuadro loro_encuentro       ← assets/img/cuadros/loro_encuentro.png, ilustración a pantalla completa; se esconde el busto
@cuadro off                  ← vuelve al fondo anterior
@busto flor feliz            ← fuerza un busto sin que hable (rara vez hace falta)
@busto off
@tarjeta Capítulo 1 | La carretera     ← pantalla negra con texto centrado (| = salto de línea). Espera tecla.
@esperar 800                 ← pausa en milisegundos
@limpiar                     ← esconde la caja y el busto
```

### Audio

```
@musica carretera.mp3        ← assets/audio/musica/carretera.mp3, en loop; cambia sola entre escenas
@musica off
@sfx yape.wav                ← assets/audio/sfx/yape.wav, una vez
```

### Palabras (celular)

```
@aprender sulpayki imamanta  ← desbloquea esas palabras (ids de palabras.js). Sale un aviso "📱 Nueva palabra".
```

### Chat / WhatsApp

```
@mensaje mama | voy a demorar hijita        ← llega un mensaje de "mama" (contacto de personajes.js)
@mensaje mama | yo | ya compré              ← un mensaje que manda Ariel
@mensaje grupo | flor | hola                ← en un grupo, quién lo manda
@chat mama leer              ← abre el celular en ese chat, solo lectura; el jugador cierra con Esc
@chat flor escribir          ← abre el chat y el jugador puede escribir (responde la IA o el modo local)
@celular                     ← abre el celular en la pestaña de palabras
```

### Guardado, capítulos, exploración, fin

```
@guardar                     ← punto de guardado (es lo que carga "Continuar partida")
@capitulo cap02              ← sigue en otro archivo de guion
@explorar plaza              ← entra al mapa "plaza" de mapas.js. Se sale cuando un objeto tiene `ir:`
@volver                      ← termina un sub-guion de exploración (vuelve al mapa)
@fin                         ← vuelve al menú
```

Ejemplo de exploración: el guion hace `@explorar plaza`. En `mapas.js`, el kiosko tiene `accion: 'plaza_kiosko'`. Cuando el jugador aprieta E frente al kiosko, corre el guion desde `== plaza_kiosko` hasta `@volver`, encima del mapa, y sigue explorando. Un objeto con `ir: 'perderse'` (o `pisar: true` para salidas) termina la exploración y salta a `== perderse`. Un `@ir` dentro de un sub-guion también termina la exploración.

---

## 5. Personajes (`js/datos/personajes.js`)

```js
flor: { nombre: 'Flor', color: '#ffa58c', tono: 520, onda: 'square' },
```

- `tono`: frecuencia del "beep" al hablar (más alto = más agudo). `onda`: `square`, `triangle`, `sine`, `sawtooth`.
- `beep: 'assets/audio/sfx/beep_flor.wav'` → usa tu propio sonido en vez del generado.
- `velocidad: 34` → milisegundos por letra solo para ese personaje (Amaru habla más lento).
- `sinBusto: true` → nunca muestra busto (voces, el celular).
- `bustos: { feliz: 'otra/ruta.png' }` → si no quieres seguir la convención `id_emocion.png`.

Los **contactos** del chat están abajo en el mismo archivo (`CONTACTOS`): `responde: true` = se le puede escribir; `miembros: [...]` = grupo; `oculto: true` = no aparece hasta que llegue un mensaje.

## 6. Palabras (`js/datos/palabras.js`)

```js
{ id: 'sulpayki', qu: 'sulpayki', es: 'gracias', categoria: 'cortesía', nota: 'opcional', audio: A('sulpayki') },
```

`A('sulpayki')` = `assets/audio/palabras/sulpayki.mp3`. Graba el audio, ponlo ahí con ese nombre y listo: en el celular la palabra se escucha al pasar el mouse o al hacer clic (`audioAlPasarMouse` en config.js). Si el archivo no existe, dice "(sin audio)". `audio: null` = sin audio a propósito.

## 7. Mapas (`js/datos/mapas.js`)

Cada mapa es un dibujo con letras: cada letra es una casilla de 40 px y la `leyenda` dice de qué color es y si es sólida. Los `objetos` y `personajes` son rectángulos (o sprites si el archivo existe) con `accion` (etiqueta del guion) o `ir` (salida). `spriteJugador` es el sprite de Ariel. Está comentado en el archivo.

## 8. El celular y la IA

- Tecla **C** (o Tab) abre el celular en cualquier momento del juego. Pestaña *Palabras* (las aprendidas, agrupadas) y *Chats*.
- En los chats con `responde: true` el jugador escribe. Hay dos modos:
  - **Modo local** (`ia.activa: false` en config.js, el que está ahora): reglas simples. Si el mensaje usa palabras aprendidas, contestan bien; si usa palabras que aún no aprendió, sospechan; si es puro español, contestan en español; si no se entiende nada, lo dejan **en visto** (✓✓). Textos en `RESPUESTAS_LOCALES` de `ia.js`.
  - **Modo IA** (`ia.activa: true`): el navegador arma el prompt (`IA.plantilla` en `ia.js`, con la personalidad de cada hermano, la lista de palabras aprendidas y la lista completa, tipo RAG) y lo manda a `servidor-ia/`, que tiene la clave del API y llama a Claude. El modelo devuelve JSON `{accion: "responder"|"visto", mensajes: [...], quien: [...]}` y el juego lo muestra con el "escribiendo…".

Para el modo IA:

```bash
cd ~/quechua-novela/servidor-ia
npm install
cp .env.example .env      # y pon tu ANTHROPIC_API_KEY
npm start                 # queda en http://localhost:8787/chat
```

Y en `config.js`: `ia: { activa: true, url: 'http://localhost:8787/chat' }`. Para que funcione desde itch.io el servidor tiene que estar en internet (Railway, Render, Fly, un VPS…): pones esa URL en `config.js` y tu dominio de itch en `ORIGENES` del `.env`. **Nunca pongas la clave del API en la carpeta del juego**: cualquiera que juegue podría verla.

## 9. Teclas (cámbialas en `config.js`)

| Tecla | Hace |
|---|---|
| Enter / Espacio / Z | avanzar texto (si está escribiendo, lo completa) |
| X / Ctrl | completar el texto de golpe |
| ↑ ↓ / W S | moverse en menús y opciones |
| Flechas / WASD | moverse al explorar |
| E | interactuar |
| C / Tab | celular |
| Esc | cerrar celular / volver del menú |

## 10. Cosas útiles

- **Velocidad del texto**: `velocidadTexto` en config.js. `beepAlHablar: false` apaga el beep.
- **Fuente pixel**: pon tu `.ttf` en `assets/` y en `estilo.css` agrega `@font-face` y cambia `--fuente`.
- **Tamaño de la caja de diálogo / posición del busto**: `.caja` y `.busto` en `estilo.css`.
- **Borrar la partida guardada** (para probar desde cero): en la consola del navegador `Guardado.borrar()`, o borra los datos del sitio.
- **Errores en el guion**: el juego avisa "⚠ Error en guion, línea N" y sigue; la consola del navegador (F12) dice qué pasó.
- Las líneas marcadas `# PUENTE` en el guion son frases que agregué para unir tus rutas alternativas; revísalas.
