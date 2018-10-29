import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvActions from 'store/actions/cv';
import { Button } from 'elements/Button/index';
import { HelpTextWrap } from 'elements/Section/HelpTextWrap/index';
import { requestPdf } from 'lib/ipcEvents';

import styles from './HomeUploadButton.css';

class PreHomeUploadButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dragZoneActive: false,
		};
	}

	onClick(ev) {
		ev.preventDefault();
		this.props.cvActions.addCv(requestPdf());
	}

	onDragZoneChange(state) {
		this.setState({
			dragZoneActive: state === true,
		});
	}

	render() {
		return (
			<div className={styles.wrap} onClick={e => this.onClick(e)}>
				<div className={styles.button}>
					<div
						data-drag-zone-active={this.state.dragZoneActive}
						className={styles.icon}
						onDragEnter={() => {
							this.onDragZoneChange(true);
						}}
						onDragLeave={() => {
							this.onDragZoneChange(false);
						}}
					/>
					<Button>Choose a Resume</Button>
					<HelpTextWrap>or drag and drop it</HelpTextWrap>
				</div>
			</div>
		);
	}
}

export const HomeUploadButton = connect(
	state => ({}),
	dispatch => ({
		cvActions: bindActionCreators(cvActions, dispatch),
	})
)(PreHomeUploadButton);
