import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxItem } from './CheckoboxItem';
import { WrapperCheckbox } from './styles';

const Checkbox = ({
	click,
	disabled,
	isChecked,
	hasPadding,
	label,
	testId,
}) => {
	return (
		<WrapperCheckbox hasPadding={hasPadding}>
			<div data-testid={`div-${testId}`}>
				<CheckboxItem
					disabled={disabled}
					isChecked={isChecked}
					label={label}
					onChange={() => (disabled ? null : click())}
					testId={testId}
					value={label}
				/>
			</div>
		</WrapperCheckbox>
	);
};

Checkbox.propTypes = {
	click: PropTypes.func,
	disabled: PropTypes.bool,
	flexDirection: PropTypes.string,
	hasPadding: PropTypes.bool,
	isChecked: PropTypes.bool,
	label: PropTypes.string.isRequired,
	testId: PropTypes.string,
};

Checkbox.defaultProps = {
	click: () => {},
	disabled: false,
	flexDirection: '',
	hasPadding: false,
	isChecked: false,
	testId: '',
};

export default Checkbox;
