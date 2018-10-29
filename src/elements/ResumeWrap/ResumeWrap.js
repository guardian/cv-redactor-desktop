import { basename } from 'path';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './ResumeWrap.css';
import { InputWrap } from 'elements/InputWrap/index';
import { ListWrap } from 'elements/Section/ListWrap';
import { Button } from 'elements/Button/index';
import { getRedactedFileName, getFileName } from 'lib/resume';
import { editCvName, removeCv } from 'store/actions/cv';

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
		this.props.editCvName(this.props.path, ev.target.value);
	}

	render() {
		const { fileName, name, redactedFileName } = this.state;
		const { path } = this.props;

		return (
			<div className={styles.root}>
				<ListWrap>
					<InputWrap title="File name">{fileName}</InputWrap>
					<InputWrap title="Candidate name">
						<input
							type="text"
							value={name}
							name="candidate-name"
							required
							onChange={e => this.onChange(e)}
						/>
					</InputWrap>
					<Button
						secondary
						onClick={() => {
							this.props.removeCv(path);
						}}
					>
						Remove from list
					</Button>
				</ListWrap>
			</div>
		);
	}
}

export const ResumeWrap = connect(
	state => ({}),
	dispatch => ({
		editCvName: bindActionCreators(editCvName, dispatch),
		removeCv: bindActionCreators(removeCv, dispatch),
	})
)(PreResumeWrap);
