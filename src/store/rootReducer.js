import { combineReducers } from 'redux';
import { reducer as cv } from './actions/cv';
import { reducer as position } from './actions/position';

const rootReducer = combineReducers({
	cv,
	position,
});

export default rootReducer;
