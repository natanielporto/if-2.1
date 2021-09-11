import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox';
import { CheckboxWrapper } from './styles';

const ExclusiveCheckboxGroup = ({
	options,
	selectedOption,
	setSelectedOption,
}) => {
	return (
		<CheckboxWrapper data-testid="exclusive-checkbox-div">
			{options.map((option) => (
				<Checkbox
					click={() => setSelectedOption(option)}
					isChecked={selectedOption === option}
					key={option}
					label={option}
				/>
			))}
		</CheckboxWrapper>
	);
};

ExclusiveCheckboxGroup.propTypes = {
	flexDirection: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
	selectedOption: PropTypes.string.isRequired,
	setSelectedOption: PropTypes.func.isRequired,
};

ExclusiveCheckboxGroup.defaultProps = {
	flexDirection: 'row',
};

export default ExclusiveCheckboxGroup;
