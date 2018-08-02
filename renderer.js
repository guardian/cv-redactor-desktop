const { sendPdf, responsePdf } = require('./events.js');
const { ipcRenderer } = require('electron');
const { dialog } = require('electron').remote;

const overrideDefaults = require('./renderer/overrides');
overrideDefaults();

const $candidateName = document.querySelector('input[name=candidate-name]');

const $name = ipcRenderer.on('asynchronous-reply', (event, arg) => {
	console.log(arg);
	if (arg.type && arg.payload && arg.type === responsePdf) {
		document.querySelector('.results').innerHTML = JSON.stringify({
			...arg.payload,
			data: arg.payload.data.toString(),
		});
	}
});

const sendSinglePdf = (path, name) => {
	ipcRenderer.send('asynchronous-message', {
		type: sendPdf,
		payload: {
			path,
			name,
		},
	});
};

document.querySelector('.drop-target').addEventListener('drop', ev => {
	ev.preventDefault();
	if (ev.dataTransfer.files.length === 1) {
		sendSinglePdf(ev.dataTransfer.files[0].path, $candidateName.value);
	}
});

document.querySelector('#upload').addEventListener('click', ev => {
	ev.preventDefault();
	const files = dialog.showOpenDialog({
		properties: ['openFile'],
		filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
	});
	if (files.length === 1) {
		sendSinglePdf(files[0], $candidateName.value);
	}
});
