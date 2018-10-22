import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvActions from 'store/actions/cv';
import styles from './index.css';
import { remote } from 'electron';
import { Button } from 'elements/Button/index';
import { HelpTextWrap } from 'elements/Section/HelpTextWrap/index';
import { Section } from 'elements/Section/index.js';
import { SectionWrap } from 'elements/Section/SectionWrap/index.js';
import { ResumeWrapList } from 'elements/ResumeWrapList';

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
			<SectionWrap>
				<Section center white grows>
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
				</Section>
				<Section>
					<HelpTextWrap title="About this tool">
						This tool lets you redact resumes to unbias your hiring process.
					</HelpTextWrap>
				</Section>
			</SectionWrap>
		);
	}
}

export const DropZone = connect(
	state => ({}),
	dispatch => ({
		cvActions: bindActionCreators(cvActions, dispatch),
	})
)(PreDropZone);
