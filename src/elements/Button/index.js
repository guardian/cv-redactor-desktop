import React from 'react';
import styles from './index.css';

export const Button = ({ children, onClick }) => (
	<button className={styles.root} onClick={onClick}>
		{children}
	</button>
);
