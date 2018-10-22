import React, { Component } from 'react';
import styles from './index.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editCvName } from '../../store/actions/cv';
import { Button } from '../Button/index';
import { ResumeWrap } from './ResumeWrap/index';
import { ListWrap } from '../Section/ListWrap/index';

class PreResumeWrapList extends Component {
	render() {
		return (
			<form onSubmit={e => this.props.onSubmit(e)} className={styles.root}>
				<div className={styles.content}>
					<ListWrap>
						{this.props.resumes.map(resume => (
							<ResumeWrap
								key={resume.path}
								path={resume.path}
								onNameChange={name => this.props.editCvName(resume.path, name)}
							/>
						))}
						<Button type="submit">Redact</Button>
					</ListWrap>
				</div>
				<Button secondary onClick={e => this.props.onClear(e)}>
					Choose a different resume
				</Button>
			</form>
		);
	}
}

export const ResumeWrapList = connect(
	state => ({}),
	dispatch => ({
		editCvName: bindActionCreators(editCvName, dispatch),
	})
)(PreResumeWrapList);
