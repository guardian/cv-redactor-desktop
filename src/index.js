import { ipcRenderer } from 'electron';
import { sendPdf, responsePdf } from './events.js';
import overrideDefaults from './renderer/overrides';
import React from 'react';
import { render } from 'react-dom';
import './global.css';
import { Section } from './elements/Section/index.js';
import { SectionWrap } from './elements/Section/SectionWrap/index.js';
import { DropZone } from './elements/DropZone/index';

overrideDefaults();

ipcRenderer.on('asynchronous-reply', (event, arg) => {
	if (arg.type && arg.payload && arg.type === responsePdf) {
		console.log({
			payload: arg.payload,
			data: arg.payload.data.toString(),
		});
	}
});

const onDrop = (path, name) => {
	ipcRenderer.send('asynchronous-message', {
		type: sendPdf,
		payload: {
			path,
			name,
		},
	});
};

class App extends React.Component {
	render() {
		return (
			<SectionWrap>
				<Section center white grows>
					<DropZone onDrop={onDrop} />
				</Section>
				<Section title="About this tool">
					<p>
						This super cool tool lets you anonymize resumes to unbias your
						hiring process.
					</p>
				</Section>
			</SectionWrap>
		);
	}
}

// Create your own root div in the body element before rendering into it
let root = document.createElement('div');

// Add id 'root' and append the div to body element
root.id = 'root';
document.body.appendChild(root);

// Render the application into the DOM, the div inside index.html
render(<App />, document.querySelector('x-app'));
