import React from 'react';
import styles from './Section.css';

export const Section = ({
	children,
	center,
	white,
	grows,
	dark,
	bleeds,
	className,
}) => (
	<section
		data-grows={grows ? 'grows' : null}
		className={[
			styles.root,
			className,
			center ? styles.center : '',
			!bleeds ? styles.withPadding : '',
			white ? styles.white : '',
			dark ? styles.dark : '',
		].join(' ')}
	>
		{children}
	</section>
);
