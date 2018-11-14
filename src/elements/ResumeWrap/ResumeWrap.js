import { basename } from 'path';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './ResumeWrap.css';
import { InputWrap } from 'elements/InputWrap/index';
import { ListWrap } from 'elements/Section/ListWrap';
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
				<ListWrap className={styles.listRegion}>
					<InputWrap title="Original filename">
						<h1 className={styles.title}>{fileName}</h1>
					</InputWrap>
					<InputWrap title="Redacted filename">
						<h1 className={styles.title}>{redactedFileName}</h1>
					</InputWrap>
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
				<div className={styles.deleteRegion}>
					<button
						onClick={() => {
							this.props.removeCv(path);
						}}
						className={styles.delete}
						title="Remove"
						alt="Remove"
						type="button"
					>
						<span>Remove</span>
					</button>
				</div>
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
