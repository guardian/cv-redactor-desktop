import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatePosition } from 'store/actions/position';
import { InputWrap } from 'elements/InputWrap/index';

class PrePositionField extends Component {
	onChangePosition(ev) {
		this.props.updatePosition(ev.target.value);
	}

	render() {
		const { position } = this.props;
		return (
			<InputWrap title="Position">
				<input
					type="text"
					value={position}
					name="position"
					required
					onChange={e => this.onChangePosition(e)}
				/>
			</InputWrap>
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
