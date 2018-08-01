// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, shell } = require('electron');
const { sendPdf, responsePdf } = require('./events.js');
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({ width: 800, height: 600 });

	// and load the index.html of the app.
	mainWindow.loadFile('index.html');

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function() {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});

const saveRedactedPdf = (path, contents) =>
	new Promise(yay => {
		fs.writeFile(path, contents, (error, data) => {
			if (error) throw error;
			yay(path);
		});
	});

const handleSinglePdf = (path, name) =>
	new Promise(yay => {
		fs.readFile(path, function(error, data) {
			if (error) throw error;
			/* data is the pdf */
			yay(Buffer.from(`candidate name: ${name}`, 'utf8'));
		});
	});

ipcMain.on('asynchronous-message', async (event, arg) => {
	if (arg.type === sendPdf && arg.payload.path && arg.payload.name) {
		const data = await handleSinglePdf(arg.payload.path, arg.payload.name);
		const redactedData = await saveRedactedPdf(
			arg.payload.path + 'redacted.txt',
			data
		);
		event.sender.send('asynchronous-reply', {
			type: responsePdf,
			payload: {
				data,
			},
		});
		shell.openItem(redactedData);
	} else {
		throw 'no, bad, wrong';
	}
});
