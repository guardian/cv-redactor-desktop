import { ipcRenderer, remote } from 'electron';
import { sendPdf, responsePdf } from 'events.js';
import { removeCv } from 'store/actions/cv';

const onDrop = (path, name) => {
	ipcRenderer.send('asynchronous-message', {
		type: sendPdf,
		payload: {
			path,
			name,
		},
	});
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
		properties: ['openFile'],
		filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
	}) || [];

export { onDrop, listen, requestPdf };
