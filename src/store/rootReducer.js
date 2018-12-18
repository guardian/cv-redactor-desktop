import { combineReducers } from 'redux';
import { reducer as cv } from './actions/cv';
import { reducer as hasSubmitted } from './actions/hasSubmitted';
import { reducer as position } from './actions/position';

const rootReducer = combineReducers({
	cv,
	hasSubmitted,
	position,
});

export default rootReducer;
