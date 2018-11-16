import React from 'react';
import { HelpTextWrap } from 'elements/Section/HelpTextWrap/HelpTextWrap';

import styles from './HomeDndPrompt.css';

export const HomeDndPrompt = () => (
	<div className={styles.wrap}>
		<div
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
