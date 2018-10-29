import React, { Component } from 'react';
import styles from './index.css';
import { Button } from '../Button/index';
import { ResumeWrap } from './ResumeWrap/index';
import { ListWrap } from '../Section/ListWrap/index';

export class ResumeWrapList extends Component {
	render() {
		return (
			<form onSubmit={e => this.props.onSubmit(e)} className={styles.root}>
				<div className={styles.content}>
					<ListWrap>
						{this.props.resumes.map(resume => (
							<ResumeWrap key={resume.path} path={resume.path} />
						))}
					</ListWrap>
				</div>
				<Button onClick={e => this.props.onAddAnother(e)}>Add another</Button>
				<Button type="submit">Redact</Button>
				<Button secondary onClick={e => this.props.onClear(e)}>
					Clear all
				</Button>
			</form>
		);
	}
}
