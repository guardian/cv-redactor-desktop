import React, { Component } from 'react';
import styles from './index.css';
import { remote } from 'electron';
import { Button } from '../Button/index';
import { InputWrap } from '../InputWrap/index';

export class ResumeWrap extends Component {
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
		this.props.onNameChange(ev.target.value);
	}

	render() {
		const { fileName } = this.props;

		return (
			<div>
				<h1>📂 {fileName}</h1>
				<InputWrap title="Candidate name">
					<input
						type="text"
						value={this.state.name}
						name="candidate-name"
						required
						onChange={e => this.onChange(e)}
					/>
				</InputWrap>
			</div>
		);
	}
}
