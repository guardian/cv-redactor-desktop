import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvActions from 'store/actions/cv';

import styles from './DropZone.css';

class PreDropZone extends Component {
	onDrop(ev) {
		ev.preventDefault();
		this.props.cvActions.addCv([...ev.dataTransfer.files].map(_ => _.path));
	}

	render() {
		return (
			<div className={styles.root} onDrop={e => this.onDrop(e)}>
				{this.props.children}
			</div>
		);
	}
}

export const DropZone = connect(
	state => ({}),
	dispatch => ({
		cvActions: bindActionCreators(cvActions, dispatch),
	})
)(PreDropZone);
