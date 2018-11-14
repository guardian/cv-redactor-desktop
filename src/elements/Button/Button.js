import React from 'react';
import styles from './Button.css';

export const Button = ({
	children,
	onClick,
	type,
	secondary,
	inverted,
	className,
}) => {
	const cssClass = [
		inverted ? styles.inverted : secondary ? styles.secondary : styles.root,
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
