import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/_root';
import thunk from 'redux-thunk';

export const configureStore = () => {
	return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};
