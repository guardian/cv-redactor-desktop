import React, { Component } from 'react';
import styles from './index.css';
import { remote } from 'electron';
import { Button } from '../Button/index';
import { HelpTextWrap } from '../Section/HelpTextWrap/index';
import { ResumeWrapList } from '../ResumeWrapList';

class Resume {
	constructor(fileName) {
		this.fileName = fileName;
		this.name = null;
	}
	setName(name) {
		this.name = name;
	}
}

export class DropZone extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resumes: [],
			dragZoneActive: false,
		};
	}

	pushResumes(resumes) {
		if (resumes.length >= 0) {
			this.setState({
				resumes: [...this.state.resumes, ...resumes.map(r => new Resume(r))],
			});
		}
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
		if (this.state.resumes.length >= 1) {
			this.props.onDrop(
				this.state.resumes[0].fileName,
				this.state.resumes[0].name
			);
		}
	}

	onClear(ev) {
		ev.preventDefault();
		this.setState({
			resumes: [],
		});
	}

	onDragZoneChange(state) {
		this.setState({
			dragZoneActive: state === true,
		});
	}

	render() {
		return this.state.resumes.length === 0 ? (
			<button
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
			</button>
		) : (
			<ResumeWrapList
				onSubmit={e => this.onSubmit(e)}
				onClear={e => this.onClear(e)}
				resumes={this.state.resumes}
			/>
		);
	}
}
