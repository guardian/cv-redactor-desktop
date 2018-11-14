import initialState from '../initialState';
import { getRedactedFileName } from 'lib/resume';

const CLEAR_CV = 'CLEAR_CV';
const ADD_CV = 'ADD_CV';
const EDIT_CV_NAME = 'EDIT_CV_NAME';
const REMOVE_CV = 'REMOVE_CV';
const UPDATE_CV_POSITION = 'UPDATE_CV_POSITION';

const reducer = (state = initialState.cv, action) => {
	switch (action.type) {
		case UPDATE_CV_POSITION:
			return state.map(resume =>
				Object.assign({}, resume, {
					redactedFileName: getRedactedFileName(resume.path, action.position),
				})
			);
		case CLEAR_CV:
			return initialState.cv;
		case ADD_CV:
			return [
				...state,
				{
					path: action.path,
					redactedFileName: getRedactedFileName(action.path, action.position),
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

export const addCv = path => (dispatch, getState) => {
	const { position } = getState();
	dispatch(
		Array.isArray(path)
			? path.map(p => ({ type: ADD_CV, path: p, position }))
			: { type: ADD_CV, path, position }
	);
};
export const removeCv = path => ({ type: REMOVE_CV, path: path });
export const editCvName = (path, name) => ({ type: EDIT_CV_NAME, path, name });
export const clearCvs = () => ({ type: CLEAR_CV });
export const updateCvPosition = position => ({
	type: UPDATE_CV_POSITION,
	position,
});
export { reducer };
