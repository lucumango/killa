# Scripts de Twine

Con estos scripts se armó `narrativa/Killa.html` (la historia en Twine) y se generó `narrativa/Killa.txt`.

| Archivo | Qué hace |
|---|---|
| `p_kiosko.py`, `p_vuelta.py`, `p_amaru.py`, `p_parque.py`, `p_flor.py` | El texto de las escenas 3 y 4 en formato Harlowe, pasaje por pasaje. Es la versión anterior a las correcciones de Abner. |
| `build.py` | Junta esos pasajes con el Twine original (`Killa_2.html`) y arma `Killa.html`. |
| `corregir_twine.py`, `corregir_twine2.py` | Aplican la primera y la segunda revisión de Abner sobre `Killa.html`. |
| `export_txt.py` + `orden.txt` | Exportan toda la historia a texto plano, en orden de lectura. |
| `run.js` + `casos.json`, `casos2.json` | Juegan la historia en Chromium por varias rutas y avisan si algo se rompe. |

Para rearmar todo desde el Twine original:

```bash
cd narrativa/scripts
python3 build.py ruta/a/Killa_2.html ../Killa.html
python3 corregir_twine.py ../Killa.html
python3 corregir_twine2.py ../Killa.html
python3 export_txt.py ../Killa.html ../Killa.txt "$(cat orden.txt)"
node run.js casos.json
```

Si solo cambias algo en Twine, basta con volver a exportar el texto (la línea de `export_txt.py`).
