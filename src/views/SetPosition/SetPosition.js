import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvActions from 'store/actions/cv';
import { setHasSubmitted, unsetHasSubmitted } from 'store/actions/hasSubmitted';
import { requestPdf } from 'lib/ipcEvents';

import { Section } from 'elements/Section/Section';
import { SectionWrap } from 'elements/Section/SectionWrap';

import { Button } from 'elements/Button/Button';
import { DropTarget } from 'elements/DropTarget/DropTarget';
import { PositionField } from 'elements/PositionField/PositionField';

class PreSetPosition extends Component {
	onSubmit(ev) {
		ev.preventDefault();
		if (this.props.resumes.length >= 1) {
			this.props.onDrop(this.props.resumes);
			this.props.cvActions.clearCvs();
			this.props.unsetHasSubmitted();
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
				<form onSubmit={e => this.onSubmit(e)} style={{ height: '100%' }}>
					<SectionWrap>
						<Section white grows center>
							<PositionField />
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

export const SetPosition = connect(
	state => ({
		resumes: state.cv,
	}),
	dispatch => ({
		cvActions: bindActionCreators(cvActions, dispatch),
		setHasSubmitted: bindActionCreators(setHasSubmitted, dispatch),
		unsetHasSubmitted: bindActionCreators(unsetHasSubmitted, dispatch),
	})
)(PreSetPosition);
