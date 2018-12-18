import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvActions from 'store/actions/cv';
import { setHasSubmitted } from 'store/actions/hasSubmitted';
import { requestPdf } from 'lib/ipcEvents';

import { Section } from 'elements/Section/Section';
import { SectionWrap } from 'elements/Section/SectionWrap';
import { TableWrap } from 'elements/Section/TableWrap/TableWrap';
import { ResumeWrap } from 'elements/ResumeWrap/ResumeWrap';
import { Button } from 'elements/Button/Button';
import { DropTarget } from 'elements/DropTarget/DropTarget';
import { PositionField } from 'elements/PositionField/PositionField';
import { HomeDndPrompt } from 'elements/HomeDndPrompt/HomeDndPrompt';

import styles from './Resumes.css';

class PreResumes extends Component {
	onSubmit(ev) {
		ev.preventDefault();
		this.props.setHasSubmitted();
		/*
		if (this.props.resumes.length >= 1) {
			this.props.onDrop(this.props.resumes);
			console.log(this.props.resumes);
		}
		*/
	}

	onAddAnother(ev) {
		ev.preventDefault();
		this.props.cvActions.addCv(requestPdf());
	}

	render() {
		const { resumes } = this.props;
		return (
			<DropTarget>
				<form onSubmit={e => this.onSubmit(e)} className={styles.root}>
					<SectionWrap>
						<Section grows>
							<div className={styles.cvTable}>
								<TableWrap>
									{resumes.map(resume => (
										<ResumeWrap
											key={resume.path}
											path={resume.path}
											redactedFileName={resume.redactedFileName}
										/>
									))}
								</TableWrap>
								<div className={styles.pad}>
									<HomeDndPrompt />
								</div>
							</div>
						</Section>
						<Section>
							<Button type="submit">Continue</Button>
						</Section>
					</SectionWrap>
				</form>
			</DropTarget>
		);
	}
}

export const Resumes = connect(
	state => ({
		resumes: state.cv,
	}),
	dispatch => ({
		cvActions: bindActionCreators(cvActions, dispatch),
		setHasSubmitted: bindActionCreators(setHasSubmitted, dispatch),
	})
)(PreResumes);
