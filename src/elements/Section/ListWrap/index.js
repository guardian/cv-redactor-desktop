import React from 'react';
import styles from './index.css';

export const ListWrap = ({ children, className }) => (
	<section className={[styles.root, className || ''].join(' ')}>
		{children}
	</section>
);
