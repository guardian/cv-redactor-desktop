import { basename } from 'path';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './index.css';
import { InputWrap } from 'elements/InputWrap/index';
import { ListWrap } from 'elements/Section/ListWrap';
import { getRedactedFileName, getFileName } from 'lib/resume';
import { HelpTextWrap } from 'elements/Section/HelpTextWrap/index';
import { editCvName } from 'store/actions/cv';

class PreResumeWrap extends Component {
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
		this.props.editCvName(this.path, ev.target.value);
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

export const ResumeWrap = connect(
	state => ({}),
	dispatch => ({
		editCvName: bindActionCreators(editCvName, dispatch),
	})
)(PreResumeWrap);
