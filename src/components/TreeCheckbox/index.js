import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox';
import { WrapperTreeCheckbox } from './styles';

const TreeCheckbox = ({
	checkedData,
	checkedOptions,
	level,
	maxLevel,
	setCheckedParent,
	setCheckedOptions,
}) => {
	const [isChecked, setIsChecked] = useState(false);

	const setChecked = (checked) => {
		checkedData.checked = checked;
		setIsChecked(checkedData.checked);

		const checkboxIsAlreadyChecked = checkedOptions.includes(checkedData.name);
		setCheckedOptions(
			checkboxIsAlreadyChecked
				? checkedOptions.filter((option) => option !== checkedData.name)
				: [...checkedOptions, checkedData.name]
		);

		setCheckedParent(checked);
	};

	const setCheckedAsParent = () => {
		checkedData.checked = checkedData.children.some((child) => child.checked);
		setIsChecked(checkedData.checked);
		setCheckedParent();
	};

	return (
		<WrapperTreeCheckbox>
			{checkedData.name !== 'root' ? (
				<Checkbox
					click={() => level === maxLevel && setChecked(!isChecked)}
					disabled={level !== maxLevel}
					isChecked={checkedOptions.includes(checkedData.name)}
					label={checkedData.name}
					testId={`checkbox-${checkedData.name}`}
				/>
			) : null}
			{checkedData.children.map((child) => (
				<TreeCheckbox
					checkedData={child}
					checkedOptions={checkedOptions}
					key={child.name}
					level={level + 1}
					maxLevel={maxLevel}
					setCheckedOptions={setCheckedOptions}
					setCheckedParent={setCheckedAsParent}
				/>
			))}
		</WrapperTreeCheckbox>
	);
};

TreeCheckbox.propTypes = {
	checkedData: PropTypes.object.isRequired,
	checkedOptions: PropTypes.array.isRequired,
	level: PropTypes.number,
	maxLevel: PropTypes.number.isRequired,
	setCheckedOptions: PropTypes.func.isRequired,
	setCheckedParent: PropTypes.func,
};

TreeCheckbox.defaultProps = {
	level: 0,
	setCheckedParent: () => {},
};

export default TreeCheckbox;
