import React, { Component } from 'react';
import styles from './index.css';
import { remote } from 'electron';
import { Button } from '../Button/index';
import { ResumeWrap } from '../ResumeWrap/index';
import { ListWrap } from '../Section/ListWrap/index';

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

	render() {
		return this.state.resumes.length === 0 ? (
			<button
				className={styles.wrap}
				onDrop={e => this.onDrop(e)}
				onClick={e => this.onClick(e)}
			>
				<div className={styles.button}>
					<div className={styles.icon} />
					<Button>Choose a Resume</Button>
					<span>or drag and drop it</span>
				</div>
			</button>
		) : (
			<form onSubmit={e => this.onSubmit(e)}>
				<ListWrap>
					{this.state.resumes.map(resume => (
						<ResumeWrap
							key={resume.fileName}
							fileName={resume.fileName}
							onNameChange={name => resume.setName(name)}
						/>
					))}
					<Button type="submit">Anonimyze</Button>
					<Button onClick={e => this.onClear(e)}>Clear</Button>
				</ListWrap>
			</form>
		);
	}
}
