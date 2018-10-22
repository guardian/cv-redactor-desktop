import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'store/configureStore';
import { listen, onDrop } from 'lib/ipc-events';
import overrideDefaults from 'lib/renderer-overrides';
import { App } from 'App';
import './global.css';

const store = configureStore();

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
