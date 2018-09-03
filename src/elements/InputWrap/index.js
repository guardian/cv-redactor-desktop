import React from 'react';
import styles from './index.css';

export const InputWrap = ({ children, title }) => (
	<fieldset className={styles.root}>
		<label>{title}</label>
		{children}
	</fieldset>
);
