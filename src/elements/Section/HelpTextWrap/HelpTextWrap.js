import React from 'react';
import styles from './HelpTextWrap.css';

export const HelpTextWrap = ({ children, title, big, className }) => (
	<aside className={[big ? styles.big : styles.root, className].join(' ')}>
		{title && <strong className={styles.title}>{title}</strong>}
		{children}
	</aside>
);
