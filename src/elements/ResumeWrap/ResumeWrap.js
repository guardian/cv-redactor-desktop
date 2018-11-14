import React, { Component, createRef } from 'react';
import { remote, shell } from 'electron';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './ResumeWrap.css';
import { InputWrap } from 'elements/InputWrap/index';
import { getFileName } from 'lib/resume';
import { editCvName, removeCv } from 'store/actions/cv';

class PreResumeWrap extends Component {
	constructor(props) {
		super(props);
		this.$ref = createRef();
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

	onKeyDown(ev) {
		if (ev.target === this.$ref.current) {
			if (ev.key === 'Backspace') {
				this.props.removeCv(this.props.path);
			}
		}
	}

	onContextMenu() {
		const { Menu, MenuItem } = remote;
		const menu = new Menu();
		menu.append(
			new MenuItem({
				label: 'Remove',
				click: () => {
					this.props.removeCv(this.props.path);
				},
			})
		);

		menu.popup({ window: remote.getCurrentWindow() });
	}

	render() {
		const { name } = this.state;
		const { path, redactedFileName } = this.props;

		return (
			<div
				className={styles.root}
				tabIndex={-1}
				ref={this.$ref}
				onKeyDown={ev => {
					this.onKeyDown(ev);
				}}
				onDoubleClick={() => {
					shell.openItem(path);
				}}
				onContextMenu={() => {
					this.onContextMenu();
				}}
			>
				<div className={styles.fileRegion}>
					<InputWrap>
						<strong
							title={`will become ${redactedFileName}`}
							className={styles.title}
						>
							{getFileName(path)}
						</strong>
					</InputWrap>
				</div>
				<div className={styles.editRegion}>
					<InputWrap>
						<input
							type="text"
							placeholder="Candidate name"
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
