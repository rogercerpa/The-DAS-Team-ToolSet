const { app, BrowserWindow } = require('electron');
require('electron-reload')(__dirname);

function createWindow() {
	const win = new BrowserWindow({
		width          : 800,
		height         : 600,
		webPreferences : {
			nodeIntegration : true
		}
	});
	win.loadFile('./index.html');
}

app.whenReady().then(createWindow);
app.on('window-on-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
	if (BrowserWindow.getAllWindow().length === 0) createWindow();
});
