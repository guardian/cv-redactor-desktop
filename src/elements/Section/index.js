import React from 'react';
import styles from './index.css';

export const Section = ({ children, title, center, white, grows }) => (
	<section
		data-grows={grows ? 'grows' : null}
		className={[
			styles.root,
			center ? styles.center : '',
			white ? styles.white : '',
		].join(' ')}
	>
		{title && <strong>{title}</strong>}
		{children}
	</section>
);
