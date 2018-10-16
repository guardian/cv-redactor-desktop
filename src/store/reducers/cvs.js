import initialState from '../initialState';

export const cvs = (state = initialState.cvs, action) => {
	switch (action.type) {
		case 'ADD_CV':
			console.log('FETCH_STUFF Action');
			return [...state];
		case 'EDIT_CV':
			console.log('RECEIVE_STUFF Action');
			return [...state];
		default:
			return state;
	}
};
