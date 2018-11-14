import initialState from '../initialState';
import { updateCvPosition } from './cv';

const UPDATE_POSITION = 'UPDATE_POSITION';
const CLEAR_POSITION = 'CLEAR_POSITION';

const reducer = (state = initialState.position, action) => {
	switch (action.type) {
		case UPDATE_POSITION:
			return action.position;
		case CLEAR_POSITION:
			return initialState.position;
		default:
			return state;
	}
};

export const clearPosition = () => ({ type: CLEAR_POSITION });
export const updatePosition = position => [
	{ type: UPDATE_POSITION, position },
	updateCvPosition(position),
];

export { reducer };
