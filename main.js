const { app, BrowserWindow, ipcMain, shell } = require('electron');
const { getRedactedFileName } = require('./src/lib/resume.js');
const { sendPdf, responsePdf } = require('./src/events.js');
const {
	default: installExtension,
	REACT_DEVELOPER_TOOLS,
	REDUX_DEVTOOLS,
} = require('electron-devtools-installer');
const path = require('path');
const url = require('url');
const fs = require('fs');
const pdfParser = require('./src/lib/redact-pdf');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false;

if (
	process.defaultApp ||
	/[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
	/[\\/]electron[\\/]/.test(process.execPath)
) {
	dev = true;
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
	app.commandLine.appendSwitch('high-dpi-support', 'true');
	app.commandLine.appendSwitch('force-device-scale-factor', '1');
}

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		minWidth: 300,
		maxWidth: 500,
		minHeight: 500,
		maximizable: false,
		width: 350,
		height: 500,
		show: false,
	});

	// and load the index.html of the app.
	let indexPath;

	// Implementing Webpack
	if (dev && process.argv.indexOf('--noDevServer') === -1) {
		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:9292',
			pathname: 'index.html',
			slashes: true,
		});
	} else {
		indexPath = url.format({
			protocol: 'file:',
			pathname: path.join(__dirname, 'dist', 'index.html'),
			slashes: true,
		});
	}

	mainWindow.loadURL(indexPath);

	// Don't show until we are ready and loaded
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();

		// Open the DevTools automatically if developing
		if (dev) {
			mainWindow.webContents.openDevTools();
		}
	});

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
app.on('ready', () => {
	[REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach(extension => {
		installExtension(extension)
			.then(name => console.log(`Added Extension: ${name}`))
			.catch(err => console.log('An error occurred: ', err));
	});
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
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
		const redactedFileName = getRedactedFileName(arg.payload.path);
		pdfParser(arg.payload.path, redactedFileName, arg.payload.name.split(' '));

		event.sender.send('asynchronous-reply', {
			type: responsePdf,
			payload: {
				path: arg.payload.path,
			},
		});

		shell.openItem(redactedFileName);
	} else {
		console.log(arg);
		throw 'no, bad, wrong';
	}
});
