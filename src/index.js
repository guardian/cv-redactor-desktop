import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'store/configureStore';
import { listen, onDrop } from 'lib/ipcEvents';
import overrideDefaults from 'lib/rendererOverrides';
import { App } from 'App';
import './global.css';

overrideDefaults();
listen(store);

class Root extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
}

let root = document.createElement('div');

root.id = 'root';
document.body.appendChild(root);

render(<Root />, document.querySelector('x-app'));
