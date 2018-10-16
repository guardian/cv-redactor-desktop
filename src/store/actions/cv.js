import initialState from '../initialState';
import { Resume } from '../../model/Resume';

const CLEAR_CV = 'CLEAR_CV';
const ADD_CV = 'ADD_CV';
const EDIT_CV_NAME = 'EDIT_CV_NAME';

const reducer = (state = initialState.cv, action) => {
	switch (action.type) {
		case CLEAR_CV:
			return initialState.cv;
		case ADD_CV:
			return [...state, new Resume(action.path)];
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
export const editCvName = (path, name) => ({ type: EDIT_CV_NAME, path, name });
export const clearCvs = () => ({ type: CLEAR_CV });

export { reducer };
