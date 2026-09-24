#!/bin/bash
# Crea juego-web.zip listo para subir a itch.io (proyecto tipo "HTML", marcar "This file will be played in the browser").
cd "$(dirname "$0")"
rm -f juego-web.zip
zip -r -q juego-web.zip index.html css js assets -x "*.DS_Store"
echo "Listo: juego-web.zip ($(du -h juego-web.zip | cut -f1)). Tamaño de pantalla para itch.io: 960 x 600."
