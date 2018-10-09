import React from 'react';
import styles from './index.css';

export const HelpTextWrap = ({ children, title }) => (
	<aside className={styles.root}>
		{title && <strong className={styles.title}>{title}</strong>}
		{children}
	</aside>
);
