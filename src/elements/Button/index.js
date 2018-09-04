import React from 'react';
import styles from './index.css';

export const Button = ({ children, onClick, type }) => (
	<button className={styles.root} onClick={onClick} type={type}>
		{children}
	</button>
);
