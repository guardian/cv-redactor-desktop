import React from 'react';
import styles from './index.css';

export const DropZone = ({ children, title }) => (
	<button>
		<div className={styles.button}>
			<x-box>icon</x-box>
			<strong>Choose a Resume</strong>
			<span>or drag and drop it</span>
		</div>
	</button>
);
