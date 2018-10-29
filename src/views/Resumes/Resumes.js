import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvActions from 'store/actions/cv';
import { Section } from 'elements/Section/Section';
import { SectionWrap } from 'elements/Section/SectionWrap';
import { TableWrap } from 'elements/Section/TableWrap/TableWrap';
import { ResumeWrap } from 'elements/ResumeWrap/ResumeWrap';
import { Button } from 'elements/Button/Button';
import { DropTarget } from 'elements/DropTarget/DropTarget';
import { requestPdf } from 'lib/ipcEvents';

import styles from './Resumes.css';

class PreResumes extends Component {
	onSubmit(ev) {
		ev.preventDefault();
		if (this.props.resumes.length >= 1) {
			this.props.onDrop(this.props.resumes[0].path, this.props.resumes[0].name);
		}
	}

	onAddAnother(ev) {
		ev.preventDefault();
		this.props.cvActions.addCv(requestPdf());
	}

	render() {
		const { resumes } = this.props;
		return (
			<DropTarget>
				<SectionWrap>
					<Section grows bleeds>
						<form onSubmit={e => this.onSubmit(e)}>
							<TableWrap className={styles.cvTable}>
								{resumes.map(resume => (
									<ResumeWrap key={resume.path} path={resume.path} />
								))}
							</TableWrap>
							<div className={styles.addAnother}>
								<Button secondary onClick={e => this.onAddAnother(e)}>
									Add another
								</Button>
							</div>
						</form>
					</Section>
					<Section>
						<Button type="submit">
							Redact {resumes.length} {resumes.length === 1 ? 'CV' : 'CVs'}
						</Button>
					</Section>
				</SectionWrap>
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
	})
)(PreResumes);
