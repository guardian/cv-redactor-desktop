import React from 'react';
import styles from './index.css';

export const InputWrap = ({ children, title }) => (
	<label className={styles.root}>
		<strong className={styles.label}>{title}</strong>
		<div className={styles.content}>{children}</div>
	</label>
);
