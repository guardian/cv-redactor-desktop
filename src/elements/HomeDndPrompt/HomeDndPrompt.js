import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvActions from 'store/actions/cv';
import { requestPdf } from 'lib/ipcEvents';

import { HelpTextWrap } from 'elements/Section/HelpTextWrap/HelpTextWrap';
import { Button } from 'elements/Button/Button';

import styles from './HomeDndPrompt.css';

export const PreHomeDndPrompt = ({ cvActions, big }) => (
	<div className={big ? styles.wrap : styles.smallWrap}>
		<div
			className={styles.icon}
			onDragEnter={() => {
				this.onDragZoneChange(true);
			}}
			onDragLeave={() => {
				this.onDragZoneChange(false);
			}}
		/>
		<HelpTextWrap className={styles.help} big={big}>
			Drag and drop CVs here
		</HelpTextWrap>
		<HelpTextWrap className={styles.help}>or</HelpTextWrap>
		<Button
			secondary={!big}
			type="button"
			onClick={() => {
				cvActions.addCv(requestPdf());
			}}
		>
			Browse files…
		</Button>
	</div>
);

export const HomeDndPrompt = connect(
	state => ({
		resumes: state.cv,
	}),
	dispatch => ({
		cvActions: bindActionCreators(cvActions, dispatch),
	})
)(PreHomeDndPrompt);
