import React from 'react';
import { remote } from 'electron';
import styles from './MacTitleBar.css';

export const MacTitleBar = () => (
	<div
		style={{
			height: [remote.screen.getMenuBarHeight() || 30, 'px'].join(''),
		}}
		className={styles.root}
	/>
);
