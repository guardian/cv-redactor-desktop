import React from 'react';
import styles from './index.css';

export const Button = ({ children, onClick, type, secondary }) => {
	const className = secondary ? styles.secondary : styles.root;
	return (
		<button
			className={className}
			data-secondary={secondary}
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	);
};
