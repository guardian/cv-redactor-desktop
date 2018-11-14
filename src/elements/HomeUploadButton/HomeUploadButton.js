import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvActions from 'store/actions/cv';
import { Button } from 'elements/Button/Button';
import { HelpTextWrap } from 'elements/Section/HelpTextWrap/index';

import styles from './HomeUploadButton.css';

export class HomeUploadButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dragZoneActive: false,
		};
	}

	onDragZoneChange(state) {
		this.setState({
			dragZoneActive: state === true,
		});
	}

	render() {
		return (
			<div className={styles.wrap}>
				<div
					data-drag-zone-active={this.state.dragZoneActive}
					className={styles.icon}
					onDragEnter={() => {
						this.onDragZoneChange(true);
					}}
					onDragLeave={() => {
						this.onDragZoneChange(false);
					}}
				/>
				<HelpTextWrap>Drag and drop CVs here</HelpTextWrap>
			</div>
		);
	}
}
