import React from 'react';
import { connect } from 'react-redux';
import { onDrop } from './lib/ipcEvents';

import { Resumes } from 'views/Resumes/Resumes';
import { Dropper } from 'views/Dropper/Dropper';
import { SetPosition } from 'views/SetPosition/SetPosition';

const PreApp = ({ cv, hasSubmitted }) =>
	cv.length > 0 ? (
		hasSubmitted ? (
			<SetPosition onDrop={onDrop} />
		) : (
			<Resumes />
		)
	) : (
		<Dropper />
	);

export const App = connect(state => ({
	cv: state.cv,
	hasSubmitted: state.hasSubmitted,
}))(PreApp);
