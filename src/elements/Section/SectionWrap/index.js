import React from 'react';
import styles from './index.css';

export const SectionWrap = ({ children }) => (
	<section className={styles.root}>{children}</section>
);
