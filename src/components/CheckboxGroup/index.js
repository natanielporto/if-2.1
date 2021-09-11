import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox';
import { CheckboxGroupWrapper } from './styles';

const CheckboxGroup = ({ itemIds, onClick, startChecked }) => {
	const [checkboxes, setCheckboxes] = useState([]);

	useEffect(() => {
		setCheckboxes(itemIds.map((id) => ({ id, isChecked: startChecked })));
	}, [itemIds, startChecked]);

	const handleClick = (checkboxId) => {
		onClick(checkboxId);
		const updatedCheckboxes = checkboxes.map((checkbox) =>
			checkbox.id === checkboxId
				? { ...checkbox, isChecked: !checkbox.isChecked }
				: checkbox
		);

		setCheckboxes(updatedCheckboxes);
	};

	return (
		<CheckboxGroupWrapper data-testid="checkbox-group">
			{checkboxes.map((checkbox) => (
				<Checkbox
					click={() => handleClick(checkbox.id)}
					isChecked={checkbox.isChecked}
					key={checkbox.id}
					label={checkbox.id}
					testId={checkbox.id}
				/>
			))}
		</CheckboxGroupWrapper>
	);
};

CheckboxGroup.propTypes = {
	itemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
	onClick: PropTypes.func,
	startChecked: PropTypes.bool,
};

CheckboxGroup.defaultProps = {
	onClick: () => {},
	startChecked: false,
};

export default CheckboxGroup;
