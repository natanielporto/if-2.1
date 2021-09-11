import React from 'react';
import PropTypes from 'prop-types';
import { Label, WhiteCheckSquare } from './checkBoxItemStyles';

export const CheckboxItem = (props) => {
	const { disabled, isChecked, label, onChange, testId } = props;

	return (
		<Label>
			<input
				checked={isChecked}
				data-testid={testId}
				disabled={disabled}
				onChange={onChange}
				type="checkbox"
				value={label}
			/>
			<WhiteCheckSquare check={isChecked} />
			{label}
		</Label>
	);
};

CheckboxItem.propTypes = {
	disabled: PropTypes.bool,
	isChecked: PropTypes.bool,
	label: PropTypes.string,
	onChange: PropTypes.func,
	testId: PropTypes.string,
};

CheckboxItem.defaultProps = {
	disabled: true,
	isChecked: false,
	label: '',
	onChange: () => {},
	testId: '',
};

export default CheckboxItem;
