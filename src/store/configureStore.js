import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import { loadState, saveState } from './localStorage';
import thunk from 'redux-thunk';
import multi from 'redux-multi';

const store = createStore(
	rootReducer,
	loadState(),
	composeWithDevTools(applyMiddleware(thunk, multi))
);

store.subscribe(() => {
	saveState(store.getState());
});

export { store };
