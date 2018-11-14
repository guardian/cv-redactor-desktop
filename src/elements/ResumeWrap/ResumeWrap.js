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
		const { name } = this.state;
		const { path, redactedFileName } = this.props;

		return (
			<div className={styles.root}>
				<div className={styles.fileRegion}>
					<InputWrap title="File">
						<h1
							title={`will become ${redactedFileName}`}
							className={styles.title}
						>
							{getFileName(path)}
						</h1>
					</InputWrap>
				</div>
				<div className={styles.editRegion}>
					<InputWrap title="Candidate name">
						<input
							type="text"
							value={name}
							name="candidate-name"
							required
							onChange={e => this.onChange(e)}
						/>
					</InputWrap>
				</div>
				<div className={styles.deleteRegion}>
					<button
						onClick={() => {
							this.props.removeCv(path);
						}}
						tabIndex={-1}
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
	state => ({
		position: state.position,
	}),
	dispatch => ({
		editCvName: bindActionCreators(editCvName, dispatch),
		removeCv: bindActionCreators(removeCv, dispatch),
	})
)(PreResumeWrap);
