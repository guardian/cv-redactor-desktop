import initialState from '../initialState';

const CLEAR_CV = 'CLEAR_CV';
const ADD_CV = 'ADD_CV';
const EDIT_CV_NAME = 'EDIT_CV_NAME';
const REMOVE_CV = 'REMOVE_CV';

const reducer = (state = initialState.cv, action) => {
	switch (action.type) {
		case CLEAR_CV:
			return initialState.cv;
		case ADD_CV:
			return [
				...state,
				{
					path: action.path,
				},
			];
		case REMOVE_CV:
			return state.filter(item => item.path !== action.path);
		case EDIT_CV_NAME:
			return state.map(
				item =>
					item.path === action.path
						? Object.assign({}, item, { name: action.name })
						: item
			);
		default:
			return state;
	}
};

export const addCv = path => ({ type: ADD_CV, path: path });
export const removeCv = path => ({ type: REMOVE_CV, path: path });
export const editCvName = (path, name) => ({ type: EDIT_CV_NAME, path, name });
export const clearCvs = () => ({ type: CLEAR_CV });

export { reducer };
