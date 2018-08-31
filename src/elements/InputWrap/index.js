import React from 'react';
import styles from './index.css';

export const InputWrap = ({ children, title }) => (
	<fieldset className={styles.root}>
		<label>{title}</label>
		<input type="text" value="" name="candidate-name" required />
	</fieldset>
);
