import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvActions from 'store/actions/cv';

import styles from './DropTarget.css';

class PreDropTarget extends Component {
	onDrop(ev) {
		ev.preventDefault();
		[...ev.dataTransfer.files].map(_ => _.path).forEach(resume => {
			this.props.cvActions.addCv(resume);
		});
	}

	render() {
		return (
			<div className={styles.root} onDrop={e => this.onDrop(e)}>
				{this.props.children}
			</div>
		);
	}
}

export const DropTarget = connect(
	state => ({}),
	dispatch => ({
		cvActions: bindActionCreators(cvActions, dispatch),
	})
)(PreDropTarget);
