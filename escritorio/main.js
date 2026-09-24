// Versión de escritorio (Electron). Ver LEEME.md → "Versión descargable".
const { app, BrowserWindow } = require('electron');
const path = require('path');
app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 960, height: 600, useContentSize: true, autoHideMenuBar: true, backgroundColor: '#000' });
  win.loadFile(path.join(__dirname, 'juego', 'index.html'));
});
app.on('window-all-closed', () => app.quit());
