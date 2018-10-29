import React from 'react';
import styles from './index.css';

export const Button = ({ children, onClick, type, secondary, className }) => {
	const cssClass = [
		secondary ? styles.secondary : styles.root,
		className ? className : null,
	]
		.filter(_ => _ !== null)
		.join(' ');
	return (
		<button className={cssClass} onClick={onClick} type={type}>
			{children}
		</button>
	);
};
