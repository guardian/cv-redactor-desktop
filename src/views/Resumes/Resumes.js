import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvActions from 'store/actions/cv';
import { Section } from 'elements/Section';
import { SectionWrap } from 'elements/Section/SectionWrap';
import { ListWrap } from 'elements/Section/ListWrap';
import { ResumeWrap } from 'elements/ResumeWrap/ResumeWrap';
import { Button } from 'elements/Button/index';
import { DropTarget } from 'elements/DropTarget/DropTarget';
import { requestPdf } from 'lib/ipcEvents';

class PreResumes extends Component {
	onSubmit(ev) {
		ev.preventDefault();
		if (this.props.resumes.length >= 1) {
			this.props.onDrop(this.props.resumes[0].path, this.props.resumes[0].name);
		}
	}

	onClear(ev) {
		ev.preventDefault();
		this.props.cvActions.clearCvs();
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
					<Section center white grows>
						<form onSubmit={e => this.onSubmit(e)}>
							<ListWrap>
								{resumes.map(resume => (
									<ResumeWrap key={resume.path} path={resume.path} />
								))}
							</ListWrap>

							<Button onClick={e => this.onAddAnother(e)}>Add another</Button>
							<Button type="submit">Redact</Button>
							<Button secondary onClick={e => this.onClear(e)}>
								Clear all
							</Button>
						</form>
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
