import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvActions from 'store/actions/cv';
import { updatePosition } from 'store/actions/position';
import { Section } from 'elements/Section/Section';
import { SectionWrap } from 'elements/Section/SectionWrap';
import { TableWrap } from 'elements/Section/TableWrap/TableWrap';
import { ResumeWrap } from 'elements/ResumeWrap/ResumeWrap';
import { Button } from 'elements/Button/Button';
import { DropTarget } from 'elements/DropTarget/DropTarget';
import { requestPdf } from 'lib/ipcEvents';
import { InputWrap } from 'elements/InputWrap/index';

import styles from './Resumes.css';

class PreResumes extends Component {
	onSubmit(ev) {
		ev.preventDefault();
		if (this.props.resumes.length >= 1) {
			this.props.onDrop(this.props.resumes);
			console.log(this.props.resumes);
		}
	}

	onAddAnother(ev) {
		ev.preventDefault();
		this.props.cvActions.addCv(requestPdf());
	}

	onChangePosition(ev) {
		this.props.updatePosition(ev.target.value);
	}

	render() {
		const { resumes, position } = this.props;
		return (
			<DropTarget>
				<form onSubmit={e => this.onSubmit(e)} style={{ height: '100%' }}>
					<SectionWrap>
						<Section white>
							<InputWrap title="Position">
								<input
									type="text"
									value={position}
									name="position"
									required
									onChange={e => this.onChangePosition(e)}
								/>
							</InputWrap>
						</Section>
						<Section white grows>
							<TableWrap className={styles.cvTable}>
								{resumes.map(resume => (
									<ResumeWrap
										key={resume.path}
										path={resume.path}
										redactedFileName={resume.redactedFileName}
									/>
								))}
							</TableWrap>
							<div className={styles.addAnother}>
								<Button secondary onClick={e => this.onAddAnother(e)}>
									Add another
								</Button>
							</div>
						</Section>
						<Section>
							<Button type="submit">
								Redact {resumes.length} {resumes.length === 1 ? 'CV' : 'CVs'}
							</Button>
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
		position: state.position,
	}),
	dispatch => ({
		cvActions: bindActionCreators(cvActions, dispatch),
		updatePosition: bindActionCreators(updatePosition, dispatch),
	})
)(PreResumes);
