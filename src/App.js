import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onDrop } from './lib/ipcEvents';
import { Dropper } from 'views/Dropper/Dropper';
import { Resumes } from 'views/Resumes/Resumes';

class PreApp extends Component {
	render() {
		const { resumes } = this.props;
		return resumes.length === 0 ? <Dropper /> : <Resumes onDrop={onDrop} />;
	}
}

export const App = connect(state => ({
	resumes: state.cv,
}))(PreApp);
