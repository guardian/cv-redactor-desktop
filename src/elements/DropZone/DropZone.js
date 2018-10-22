import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvActions from 'store/actions/cv';
import { remote } from 'electron';
import { Button } from 'elements/Button/index';
import { HelpTextWrap } from 'elements/Section/HelpTextWrap/index';
import styles from './index.css';

class PreDropZone extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dragZoneActive: false,
		};
	}

	pushResumes(resumes) {
		resumes.forEach(resume => {
			this.props.cvActions.addCv(resume);
		});
	}

	onClick(ev) {
		ev.preventDefault();
		const files = remote.dialog.showOpenDialog({
			properties: ['openFile'],
			filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
		});
		this.pushResumes(files);
	}

	onDrop(ev) {
		ev.preventDefault();
		this.onDragZoneChange(false);
		this.pushResumes([...ev.dataTransfer.files].map(_ => _.path));
	}

	onDragZoneChange(state) {
		this.setState({
			dragZoneActive: state === true,
		});
	}

	render() {
		return (
			<div
				className={styles.wrap}
				onDrop={e => this.onDrop(e)}
				onClick={e => this.onClick(e)}
			>
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

export const DropZone = connect(
	state => ({}),
	dispatch => ({
		cvActions: bindActionCreators(cvActions, dispatch),
	})
)(PreDropZone);
