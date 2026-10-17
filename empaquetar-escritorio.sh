#!/bin/bash
# Arma la version descargable (Windows, Linux y Mac) con Electron.
#   ./empaquetar-escritorio.sh
# La primera vez descarga Electron (~250 MB), asi que tarda. Despues es rapido.
# Los instaladores quedan en escritorio/salida/.
set -e
cd "$(dirname "$0")"

echo "1/3  Copiando el juego dentro de la app..."
rm -rf escritorio/juego
mkdir -p escritorio/juego
cp -R index.html css js assets escritorio/juego/
find escritorio/juego -name '.DS_Store' -delete

echo "2/3  Instalando Electron si hace falta..."
cd escritorio
[ -d node_modules ] || npm install

echo "3/3  Empaquetando..."
npx electron-builder --win portable --linux AppImage --x64 ${MAC:+--mac}

echo
echo "Listo. Mira en escritorio/salida/"
echo "  Windows: .exe portable (se abre con doble clic, no se instala)"
echo "  Linux:   .AppImage"
[ -n "$MAC" ] && echo "  Mac:     .dmg"
echo
echo "OJO: la version descargable usa el servidor publico (CONFIG.ia.urlPublica),"
echo "     asi que el chat y el envio de datos del estudio necesitan que Render este arriba."
