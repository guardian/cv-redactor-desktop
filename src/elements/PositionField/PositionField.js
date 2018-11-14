import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatePosition } from 'store/actions/position';
import { InputWrap } from 'elements/InputWrap/index';
import { HelpTextWrap } from 'elements/Section/HelpTextWrap/index';
import { ListWrap } from 'elements/Section/ListWrap';

class PrePositionField extends Component {
	onChangePosition(ev) {
		this.props.updatePosition(ev.target.value);
	}

	render() {
		const { position } = this.props;
		return (
			<ListWrap>
				<InputWrap title="Prefix">
					<input
						type="text"
						value={position}
						name="position"
						required
						onChange={e => this.onChangePosition(e)}
					/>
				</InputWrap>
				<HelpTextWrap>
					Redacted CV's will be named {position}
					.id.pdf
				</HelpTextWrap>
			</ListWrap>
		);
	}
}

export const PositionField = connect(
	state => ({
		position: state.position,
	}),
	dispatch => ({
		updatePosition: bindActionCreators(updatePosition, dispatch),
	})
)(PrePositionField);
