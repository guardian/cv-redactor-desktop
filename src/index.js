// src/index.js

import React from 'react';
import { render } from 'react-dom';

// Create main App component
class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Hello, this is your first Electron app!</h1>

				<p>I hope you enjoy using this electron react app.</p>
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
