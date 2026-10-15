#!/usr/bin/env python3
"""Servidor para probar el juego:  python3 servidor.py
Igual que `python3 -m http.server 8765`, pero le dice al navegador que NO
guarde nada en caché. Así cada vez que recargas ves de verdad tus cambios.
"""
import http.server, socketserver, sys

PUERTO = int(sys.argv[1]) if len(sys.argv) > 1 else 8765

class SinCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Expires', '0')
        super().end_headers()
    def log_message(self, *a):
        pass

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(('127.0.0.1', PUERTO), SinCache) as s:
    print(f'Killa en http://localhost:{PUERTO}   (Ctrl+C para parar)')
    s.serve_forever()
