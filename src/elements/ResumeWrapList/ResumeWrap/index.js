import { basename } from 'path';
import React, { Component } from 'react';
import styles from './index.css';
import { InputWrap } from '../../InputWrap/index';
import { ListWrap } from '../../Section/ListWrap';
import { getRedactedFileName, getFileName } from '../../../lib/resume';
import { HelpTextWrap } from '../../Section/HelpTextWrap/index';

export class ResumeWrap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			fileName: getFileName(props.path),
			redactedFileName: getRedactedFileName(props.path),
		};
	}

	onChange(ev) {
		ev.preventDefault();
		this.setState({
			name: ev.target.value,
		});
		this.props.onNameChange(ev.target.value);
	}

	render() {
		const { fileName, name, redactedFileName } = this.state;

		return (
			<div>
				<ListWrap>
					<h1>📂 {fileName}</h1>
					<InputWrap title="Candidate name">
						<input
							type="text"
							value={name}
							name="candidate-name"
							required
							onChange={e => this.onChange(e)}
						/>
					</InputWrap>
				</ListWrap>
				<HelpTextWrap>
					A new file, {redactedFileName} will be saved alongside the original,
					blocking out the name you provided as well as emails and urls
				</HelpTextWrap>
			</div>
		);
	}
}
