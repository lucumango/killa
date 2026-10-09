# Killa

Novela visual 2D en español, sobre Ariel, un adolescente limeño que pasa
un verano en Ayacucho y aprende quechua sin querer. Hecha con HTML, CSS y
JavaScript puro: no hay framework, no hay build, no hay que instalar nada.

El guion es texto plano. Se escribe en `js/datos/guion/cap01.js` y el motor lo
interpreta en vivo, así que para cambiar una línea de diálogo basta abrir el
archivo con cualquier editor y recargar el navegador.

## Probarlo

```bash
python3 servidor.py
```

Y abrir <http://localhost:8765>. Es un `http.server` normal, pero con el caché
desactivado; si aun así el navegador se queda con la versión vieja, recargar con
Cmd+Shift+R.

Para revisar el guion sin abrir el navegador:

```bash
node validar.js
```

Avisa de etiquetas que no existen, palabras que no están en `palabras.js`,
personajes mal escritos y comandos desconocidos.

## Qué se edita

| Archivo | Qué hay dentro |
| --- | --- |
| `js/datos/guion/cap01.js`, `cap02.js` | el guion: diálogos, decisiones, saltos |
| `js/datos/config.js` | título, dedicatoria, créditos, teclas, velocidad del texto, Yape, IA |
| `js/datos/personajes.js` | personajes (nombre, color, voz) y contactos del chat |
| `js/datos/palabras.js` | las palabras en quechua y sus audios |
| `js/datos/mapas.js` | los mapas de exploración, sus choques y sus objetos |
| `js/datos/ia.js` | el prompt de la IA y las respuestas del modo sin internet |

`js/motor/` es el código del juego y no hace falta tocarlo. `assets/` guarda
imágenes y audio; mientras una imagen no exista, el juego dibuja un bloque de
color con el nombre del archivo que espera, así que se ve de inmediato qué falta
y dónde va.

## Cómo se escribe el guion

```
flor (feliz): Allillanmi. ¿Y tú?
Ariel no entiende nada, pero asiente.

* Preguntarle qué dijo -> preguntar
* Asentir nomás -> asentir

== preguntar
@aprender allillanmi
@volver
```

El nombre antes de los dos puntos es el personaje; entre paréntesis va la
emoción (el busto). Una línea sin nombre la dice el narrador. `== etiqueta`
marca un destino, `*` es una opción y `@` es un comando: `@fondo`, `@cuadro`,
`@musica`, `@sfx`, `@aprender`, `@var`, `@si`, `@ir`, `@mensaje`, `@yape`,
`@explorar`, `@guardar`. La lista completa, con ejemplos de cada uno, está en
`LEEME.md`.

## Exploración

Algunas escenas son de cámara libre: se camina con las flechas y se interactúa
con E. El mapa puede ser un dibujo (`imagen:` en `mapas.js`) y en ese caso la
grilla de letras solo define por dónde no se puede pasar; con
`verChoques: true` en `config.js` esas casillas se pintan de rojo para calzar el
dibujo con la grilla.

## Celular

Se abre con C. Tiene tres pestañas: las palabras aprendidas (con audio), los
chats y Yape, que lleva el saldo y los movimientos. El saldo vive en la variable
`yape` del guion, así que se puede condicionar con `@si yape >= 2.50 -> comprar`.

Los chats pueden responder de dos maneras: con reglas locales (lo que está
activo) o con un modelo, levantando el servidor de `servidor-ia/`. Ese servidor
guarda la clave del API fuera del juego y no se sube al repo.

## Publicar

```bash
./empaquetar-web.sh
```

Crea `juego-web.zip` para itch.io (proyecto de tipo HTML, viewport 960 x 600).
En `escritorio/` está lo necesario para hacer la versión descargable con
Electron.


## Controles

| Tecla | Qué hace |
| --- | --- |
| Enter / Espacio / Z | avanzar el texto, o saltar la animación |
| X / Ctrl | completar la línea de golpe |
| Flechas o WASD | moverse al explorar |
| E | interactuar |
| C | abrir y cerrar el celular |
| Esc | cerrar el celular, volver |
