import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvActions from 'store/actions/cv';

import styles from './DropTarget.css';

class PreDropTarget extends Component {
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

export const DropTarget = connect(
	state => ({}),
	dispatch => ({
		cvActions: bindActionCreators(cvActions, dispatch),
	})
)(PreDropTarget);
