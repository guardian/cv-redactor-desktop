import React from 'react';
import styles from './index.css';

export const Section = ({ children, title }) => (
	<section className={styles.root}>
		{title && <strong>{title}</strong>}
		{children}
	</section>
);
