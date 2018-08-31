// src/index.js

import React from 'react';
import { render } from 'react-dom';

import './global.css';
import { Section } from './elements/Section/index.js';
import { InputWrap } from './elements/InputWrap/index.js';
import { DropZone } from './elements/DropZone/index';

const chromevers = process.versions.chrome;

// Create main App component
class App extends React.Component {
	render() {
		return (
			<div>
				<Section>
					<InputWrap title="Candidate name">
						<input type="text" value="" name="candidate-name" required />
					</InputWrap>
				</Section>
				<Section>
					<DropZone />
				</Section>
				<Section title="About this tool">
					<p>
						This super cool tool lets you anonymize resumes to unbias your
						hiring process.
					</p>
					<marquee>{chromevers}</marquee>
				</Section>
			</div>
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
