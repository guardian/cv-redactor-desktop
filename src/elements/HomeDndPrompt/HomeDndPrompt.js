import React from 'react';
import { HelpTextWrap } from 'elements/Section/HelpTextWrap/HelpTextWrap';
import { Button } from 'elements/Button/Button';

import styles from './HomeDndPrompt.css';

export const HomeDndPrompt = ({ onBrowse, big }) => (
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
		<Button secondary={!big} type="button" onClick={onBrowse}>
			Browse files…
		</Button>
	</div>
);
