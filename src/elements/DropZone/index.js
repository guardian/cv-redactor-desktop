import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvActions from '../../store/actions/cv';
import styles from './index.css';
import { remote } from 'electron';
import { Button } from '../Button/index';
import { HelpTextWrap } from '../Section/HelpTextWrap/index';
import { ResumeWrapList } from '../ResumeWrapList';

class PreDropZone extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resumes: [],
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

	onSubmit(ev) {
		ev.preventDefault();
		if (this.props.resumes.length >= 1) {
			this.props.onDrop(
				this.props.resumes[0].fileName,
				this.props.resumes[0].name
			);
		}
	}

	onClear(ev) {
		ev.preventDefault();
		this.props.cvActions.clearCvs();
	}

	onDragZoneChange(state) {
		this.setState({
			dragZoneActive: state === true,
		});
	}

	render() {
		const { resumes } = this.props;
		return resumes.length === 0 ? (
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
		) : (
			<ResumeWrapList
				onSubmit={e => this.onSubmit(e)}
				onClear={e => this.onClear(e)}
				resumes={resumes}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		resumes: state.cv,
	};
}

export const DropZone = connect(
	state => ({
		resumes: state.cv,
	}),
	dispatch => ({
		cvActions: bindActionCreators(cvActions, dispatch),
	})
)(PreDropZone);
