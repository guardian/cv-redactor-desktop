import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvActions from 'store/actions/cv';
import { requestPdf } from 'lib/ipcEvents';

import { HelpTextWrap } from 'elements/Section/HelpTextWrap/HelpTextWrap';
import { Section } from 'elements/Section/Section';
import { SectionWrap } from 'elements/Section/SectionWrap/index.js';
import { HomeDndPrompt } from 'elements/HomeDndPrompt/HomeDndPrompt';
import { DropTarget } from '../../elements/DropTarget/DropTarget';
import { PositionField } from 'elements/PositionField/PositionField';

export class PreDropper extends Component {
	render() {
		return (
			<DropTarget>
				<SectionWrap>
					<Section>
						<PositionField />
					</Section>
					<Section center white grows>
						<HomeDndPrompt />
					</Section>
					<Section white>
						<HelpTextWrap title="About this tool">
							This tool lets you redact resumes to unbias your hiring process.
						</HelpTextWrap>
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
)(PreDropper);
