import React from 'react';
import { connect } from 'react-redux';
import { onDrop } from './lib/ipcEvents';

import { Resumes } from 'views/Resumes/Resumes';
import { Dropper } from 'views/Dropper/Dropper';

const PreApp = ({ resumes }) =>
	resumes.length > 0 ? <Resumes onDrop={onDrop} /> : <Dropper />;

export const App = connect(state => ({
	resumes: state.cv,
}))(PreApp);
