import { basename } from 'path';
import React, { Component } from 'react';
import styles from './index.css';
import { InputWrap } from '../../InputWrap/index';
import { ListWrap } from '../../Section/ListWrap';

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
				<ListWrap>
					<h1>📂 {basename(fileName)}</h1>
					<InputWrap title="Candidate name">
						<input
							type="text"
							value={this.state.name}
							name="candidate-name"
							required
							onChange={e => this.onChange(e)}
						/>
					</InputWrap>
				</ListWrap>
			</div>
		);
	}
}
