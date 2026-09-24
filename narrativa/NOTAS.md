# Notas de escritura — Killa (escenas 3 y 4)

Notas para ti sobre `Killa.html`. No aparecen en la historia.

## Por decidir

- **El papá.** En *Vuelta*, Flor dice que el papá va a preguntar por los parlantes "mañana". En *Amaru 1*, la mamá grita "¡TU PAPÁ LLEGA A LAS SIETE!". En *Flor 1*, Amaru también dice que llega a las siete. Elegir uno.
- **"Hijita".** La mamá se lo dice a Ariel en los WhatsApp, en *Vuelta a casa* (ruta de Amaru), en *La llamada* y en *El patio* (ruta de Flor). ¿Es intencional o va "hijito"?
- **wawqiy.** Lo dice doña Nati en *Cierre Nati*. Normalmente es "hermano" dicho por un hombre; en boca de una señora suena raro. Además, Ariel lo anota "para preguntar después" y nadie se lo explica todavía.
- **El mes del examen.** En *Confesión*, Flor dice que fue a Lima "en agosto" para el examen. Confirmar (en la escena 2 dice que empieza clases en marzo).
- **qhilli / qilli.** En la escena 2 (*Tarde*, *Comida*) Flor enseña "qhilli", "phiña" y "mikhuy", y así están en las notas del celular. En *Qilli* (ruta de Flor) dice que acá es "qilli, piña, mikuy" y que con h es de Cusco. Si se cambia la escena 2 a la versión sin h, el "es como la pizza con piña" del maní se vuelve un chiste doble. El mensaje de Amaru "qilli. sin h. eso es cusqueño" funciona igual en los dos casos.
- **"No le veo cara de gringo".** En *Confesión*, Flor cita a Amaru diciéndolo en quechua. Revisar que no choque con la Ruta C de la escena 1.
- **Los parlantes.** En la ruta de Flor siguen sin arreglar ("el otro cable"); en la de Amaru quedan arreglados con el parlante del tío. Son dos cánones según la ruta.
- **El nombre del grupo.** En el final (*El carro*) usé "EL GRUPOOOOOO 🦜", como en la escena 2. El doc de la escena 4 decía "quechua para limeños 🦜".
- **Objetos del kiosko sin uso todavía:** cinta, plumón, pañuelos, cable, gaseosa, galletas, chocolate, mandarinas (para Puku) y libretita (buen gancho para un epílogo, Ariel anotando las palabras).
- **Líneas según el orden de las rutas.** La segunda ruta puede tener líneas extra con `(if: $rutasJugadas contains "amaru")[...]` o `"flor"`, por ejemplo Flor sabiendo que Ariel ya subió al parque feo con su hermano. No escribí ninguna.

## Astronomía

- **El planeta** (*Mayu*). En septiembre de 2026, a las 7–8 p. m. desde Ayacucho, Júpiter no se ve: sale de madrugada. El que se ve es Saturno, cerca de su oposición. Revisar en Stellarium. Si se cambia a Saturno, el dato del "escudo" también tiene que cambiar.
- **La luna.** En la ruta de Amaru "hoy no hay luna" (*Echados*); en la de Flor aparece una uña de luna finita que sigue al sol (*Killa*). Cuadran si es una luna de uno o dos días, que se pone temprano. Si fijas la fecha de la historia, que caiga justo después de luna nueva.
- **La llama (Yacana).** Sus ojos son Alfa y Beta Centauri, que en septiembre al anochecer están bajos al suroeste. Se puede decir que la llama "se está yendo".
- **El escudo de Júpiter.** Es una idea discutida; el texto ya la presenta como "hay gente que dice", que está bien.

## Quechua para revisar con Victoria

- k'anchay → ¿kanchay en chanka?
- qullur → ¿quyllur?
- ukhu pacha → ¿uku pacha?
- hayk'ataq: quedó escrito así en todas las escenas.
- Puka kashan / sumaq kashan (*Kaypi*): "-sha-" es cusqueño; en chanka sería "pukam kachkan", "sumaqmi kachkan".
- Sumaqmi kanki, sunquy, sunqullay y la escala de intensidad.
- millay, kaypi, chaypi, hanaq, uray, hanaqman, uraman.
- qilli, piña, mikuy como formas chankas.
- ima uraña, pichqa ura, tutamanta, chisi, hapiy, ama kuyuychu, qaway, haku, suyay, pisi, tupananchikkama.
- Machaqway y las constelaciones oscuras (Mayu, la llama y su cría, zorro, sapo).
- isqun (9) y achka (muchos), del conteo de doña Nati en *Cuenta Nati*.

## Mensajes al grupo (pasaje *Mensajes*)

Por riesgo; en la historia no se marca cuál es cuál.

- Se entienden: allillanchu, sulpayki, pilas, qhilli (a Amaru).
- Riesgosos: miski (a Flor), sutiymi, munani.
- No se entienden: punchay, insultos, imataq, hayk'ataq.
- El que no deberías mandar: amor (solo si compró el Ring Pop).
- Guardados para después: "ya volví, estoy afuera. suyay" (suyay se enseña con el cautín, en la ruta de Amaru) y "sumaq killa hoy no?" (sumaq se enseña recién en la ruta de Flor).

## Pendiente

- Ilustraciones: "Los tres" (con el rótulo "La noche siguiente") y "El carro" (la pantalla tiene tres versiones: foto negra, video del mate o el grupo).

## Cómo probar una ruta sin jugar todo

En Twine, en el pasaje *Amaru 1* o *Flor 1*, usa "Test from here". Para tener el Ring Pop, la linterna y el Frugele, crea un pasaje con la etiqueta `debug-startup` (solo corre en modo Test) con:

```
(set: $compras to (a: "pilas", "linterna", "frugele", "ringpop"))(set: $confesoBeca to true)
```

## Variables nuevas

| Variable | Qué guarda |
|---|---|
| `$plata` | Soles que le quedan a Ariel en el kiosko (empieza en 30; reemplaza a `$dinero`) |
| `$compras` | Lo que compró en el kiosko: "pilas", "linterna", "frugele", "ringpop", etc. |
| `$mensajeEnviado` | El mensaje que mandó al grupo ("" si ninguno) |
| `$ruta` | "amaru" o "flor" |
| `$temas`, `$temasUsados` | Cuántos y cuáles temas usó en el parque |
| `$dioRingPop`, `$pidioFoto`, `$durmioEnHombro` | Momentos de la ruta de Amaru |
| `$fondoElegido` | "mesa", "patio" o "ventana" |
| `$temaAzotea` | El tema elegido en la azotea |
| `$rutasJugadas` | Rutas terminadas, para ofrecer la otra |

Cambios en variables que ya existían: la que se usa es `$confesoBeca` (sin *s*); borré `$confesoBecas`, que nunca se activaba. `$respuestaMama` nunca se asignaba; en su lugar se revisa si el jugador pasó por el pasaje *Pisillata*.
