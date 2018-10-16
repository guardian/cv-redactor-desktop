import { combineReducers } from 'redux';
import { reducer as cv } from './actions/cv';

const rootReducer = combineReducers({
	cv,
});

export default rootReducer;
