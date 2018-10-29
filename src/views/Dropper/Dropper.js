import React, { Component } from 'react';
import { HelpTextWrap } from 'elements/Section/HelpTextWrap/index';
import { Section } from 'elements/Section/Section';
import { SectionWrap } from 'elements/Section/SectionWrap/index.js';
import { HomeUploadButton } from 'elements/HomeUploadButton/HomeUploadButton';
import { DropTarget } from '../../elements/DropTarget/DropTarget';

export class Dropper extends Component {
	render() {
		return (
			<DropTarget>
				<SectionWrap>
					<Section center white grows>
						<HomeUploadButton />
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
