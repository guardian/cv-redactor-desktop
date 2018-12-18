import initialState from '../initialState';

const SET_HAS_SUBMITTED = 'SET_HAS_SUBMITTED';
const UNSET_HAS_SUBMITTED = 'UNSET_HAS_SUBMITTED';

const reducer = (state = initialState.hasSubmitted, action) => {
	switch (action.type) {
		case SET_HAS_SUBMITTED:
			return true;
		case UNSET_HAS_SUBMITTED:
			return false;
		default:
			return state;
	}
};

export const setHasSubmitted = () => ({ type: SET_HAS_SUBMITTED });
export const unsetHasSubmitted = () => ({ type: UNSET_HAS_SUBMITTED });

export { reducer };
