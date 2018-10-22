import React, { Component } from 'react';
import { HelpTextWrap } from 'elements/Section/HelpTextWrap/index';
import { Section } from 'elements/Section/index.js';
import { SectionWrap } from 'elements/Section/SectionWrap/index.js';

export class Dropper extends Component {
	render() {
		return (
			<SectionWrap>
				<Section center white grows>
					<DropZone />
				</Section>
				<Section>
					<HelpTextWrap title="About this tool">
						This tool lets you redact resumes to unbias your hiring process.
					</HelpTextWrap>
				</Section>
			</SectionWrap>
		);
	}
}
