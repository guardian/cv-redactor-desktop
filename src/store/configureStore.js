import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import multi from 'redux-multi';

export const configureStore = () => {
	return createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(thunk, multi))
	);
};
