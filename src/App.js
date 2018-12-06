import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { onDrop } from './lib/ipcEvents';
import { MacTitleBar } from 'elements/Section/MacTitleBar/MacTitleBar';
import { Resumes } from 'views/Resumes/Resumes';
import { remote } from 'electron';

class PreApp extends Component {
	render() {
		return (
			<div className="flex">
				<div className="flex-fill">
					<Resumes onDrop={onDrop} />
				</div>
			</div>
		);
	}
}

export const App = connect(state => ({
	resumes: state.cv,
}))(PreApp);
