import React, { Component } from 'react';
import styles from './index.css';
import { remote } from 'electron';
import { Button } from '../Button/index';
import { InputWrap } from '../InputWrap/index';

export class DropZone extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resumes: ['test'],
		};
	}

	pushResumes(resumes) {
		if (resumes.length >= 0) {
			this.setState({
				resumes: [...this.state.resumes, ...resumes],
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
		this.pushResumes(ev.dataTransfer.files.map(_ => _.path));
	}

	onSubmit(ev) {
		ev.preventDefault();
		if (this.state.resumes.length >= 1) {
			this.props.onDrop(this.state.resumes[0]);
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
			<button onDrop={e => this.onDrop(e)} onClick={e => this.onClick(e)}>
				<div className={styles.button}>
					<x-box>icon</x-box>
					<strong>Choose a Resume</strong>
					<span>or drag and drop it</span>
				</div>
			</button>
		) : (
			<div>
				{JSON.stringify(this.state.resumes)}
				<InputWrap title="Candidate name">
					<input type="text" value="" name="candidate-name" required onChan />
				</InputWrap>
				<Button onClick={e => this.onSubmit(e)}>Send</Button>
				<Button onClick={e => this.onClear(e)}>Clear</Button>
			</div>
		);
	}
}
