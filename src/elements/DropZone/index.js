import React, { Component } from 'react';
import styles from './index.css';
const { sendPdf, responsePdf } = require('./../../events.js');
const { ipcRenderer } = require('electron');
const { dialog } = require('electron').remote;

export class DropZone extends Component {
	onClick(ev) {
		ev.preventDefault();
		const files = dialog.showOpenDialog({
			properties: ['openFile'],
			filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
		});
		if (files.length === 1) {
			this.props.onDrop(files[0]);
		}
	}

	onDrop(ev) {
		ev.preventDefault();
		if (ev.dataTransfer.files.length === 1) {
			this.props.onDrop(ev.dataTransfer.files[0].path);
		}
	}

	render() {
		return (
			<button onDrop={e => this.onDrop(e)} onClick={e => this.onClick(e)}>
				<div className={styles.button}>
					<x-box>icon</x-box>
					<strong>Choose a Resume</strong>
					<span>or drag and drop it</span>
				</div>
			</button>
		);
	}
}
