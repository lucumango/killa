# Killa

Novela visual 2D en español sobre Ariel, un adolescente limeño que pasa un verano en Ayacucho y aprende quechua.

Desarrollada con **HTML, CSS y JavaScript puro**, sin frameworks ni instalaciones adicionales.

## Ejecutar

```bash
python3 servidor.py
```
Abrir http://localhost:8765.

Para validar el guion:
```bash
node validar.js
```

## Estructura

| Archivo | Contenido |
| --- | --- |
| `js/datos/guion/` | Diálogos, decisiones y eventos |
| `js/datos/config.js` | Configuración general |
| `js/datos/personajes.js` | Personajes y contactos |
| `js/datos/palabras.js` | Vocabulario quechua y audios |
| `js/datos/mapas.js` | Mapas y exploración |
| `js/datos/ia.js` | Chats e IA |
| `js/motor/` | Motor del juego |
| `assets/` | Imágenes y audio |

## Guion

Se edita directamente en `js/datos/guion/`, usando una sintaxis sencilla:

```text
flor (feliz): Allillanmi. ¿Y tú?
Ariel no entiende nada, pero asiente.

* Preguntarle qué dijo -> preguntar
* Asentir nomás -> asentir

== preguntar
@aprender allillanmi
@volver
```

Incluye diálogos, decisiones, variables y comandos para controlar escenas. Documentación completa en `LEEME.md`.

## Funcionalidades

- **Exploración:** movimiento libre e interacción con objetos.
- **Celular:** vocabulario quechua con audio, chats y Yape.
- **IA:** respuestas locales o mediante un servidor externo.
- **Guardado:** progreso del jugador.

## Controles

| Tecla | Acción |
| --- | --- |
| Enter / Espacio / Z | Avanzar diálogo |
| X / Ctrl | Completar texto |
| Flechas / WASD | Moverse |
| E | Interactuar |
| C | Abrir/cerrar celular |
| Esc | Volver o cerrar |

## Publicar

```bash
./empaquetar-web.sh
```

Genera `juego-web.zip` para **itch.io** (HTML, 960 × 600). La versión de escritorio con Electron se encuentra en `escritorio/`.
