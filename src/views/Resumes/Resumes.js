import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvActions from 'store/actions/cv';
import { Section } from 'elements/Section/index.js';
import { SectionWrap } from 'elements/Section/SectionWrap/index.js';
import { ResumeWrapList } from 'elements/ResumeWrapList';

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

	render() {
		const { resumes } = this.props;
		return (
			<SectionWrap>
				<Section center white grows>
					<ResumeWrapList
						onSubmit={e => this.onSubmit(e)}
						onClear={e => this.onClear(e)}
						resumes={resumes}
					/>
				</Section>
			</SectionWrap>
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
