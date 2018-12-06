import React, { Component } from 'react';

import { HelpTextWrap } from 'elements/Section/HelpTextWrap/HelpTextWrap';
import { Section } from 'elements/Section/Section';
import { SectionWrap } from 'elements/Section/SectionWrap/index.js';
import { HomeDndPrompt } from 'elements/HomeDndPrompt/HomeDndPrompt';
import { DropTarget } from '../../elements/DropTarget/DropTarget';

export class Dropper extends Component {
	render() {
		return (
			<DropTarget>
				<SectionWrap>
					<Section center white grows>
						<HomeDndPrompt big />
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
