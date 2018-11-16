import { ipcRenderer, remote, shell } from 'electron';
import { sendPdf, responsePdf, sendManifest } from 'events.js';
import { removeCv } from 'store/actions/cv';
import { join } from 'path';

const onDrop = resumes => {
	const target = remote.dialog.showOpenDialog({
		title: 'Select an output folder',
		message: 'Select an output folder',
		buttonLabel: 'Save here',
		properties: ['openDirectory', 'createDirectory', 'promptToCreate'],
	})[0];

	ipcRenderer.send('asynchronous-message', {
		type: sendManifest,
		payload: {
			path: target,
			manifest: resumes,
		},
	});

	resumes.forEach(({ name, path, redactedFileName }) => {
		ipcRenderer.send('asynchronous-message', {
			type: sendPdf,
			payload: {
				original: path,
				target: join(target, redactedFileName),
				name,
			},
		});
	});

	shell.openItem(target);
};

const listen = store => {
	ipcRenderer.on('asynchronous-reply', (event, arg) => {
		if (arg.type && arg.payload && arg.type === responsePdf) {
			store.dispatch(removeCv(arg.payload.path));
		}
	});
};

const requestPdf = () =>
	remote.dialog.showOpenDialog({
		properties: ['openFile', 'multiSelections'],
		filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
	}) || [];

export { onDrop, listen, requestPdf };
