import React from 'react';
import styles from './TableWrap.css';

export const TableWrap = ({ children, className }) => (
	<section className={[styles.root, className || ''].join(' ')}>
		{children}
	</section>
);
