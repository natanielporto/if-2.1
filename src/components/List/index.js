import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ExclusiveCheckboxGroup from '../ExclusiveCheckboxGroup';
import TreeCheckbox from '../TreeCheckbox';
import { SEARCH_TYPE, NODE_LEVELS } from './constants';
import { ListWrapper, TreeWrapper } from './styles';

const List = ({ checkedOptions, setSelectedLevel, setCheckedOptions }) => {
	const [selectedSearchType, setSelectedSearchType] = useState(SEARCH_TYPE[0]);

	const [checkedData, setCheckedData] = useState(null);

	useEffect(() => {
		setSelectedLevel(NODE_LEVELS[selectedSearchType]);
	}, [selectedSearchType, setSelectedLevel]);

	return (
		<ListWrapper>
			<ExclusiveCheckboxGroup
				options={SEARCH_TYPE}
				selectedOption={selectedSearchType || SEARCH_TYPE[0]}
				setSelectedOption={(option) => {
					// Remove the already marked options
					setCheckedOptions([]);

					setSelectedSearchType(option);
				}}
			/>
			{checkedData && (
				<TreeWrapper data-testid="checkbox-tree-div">
					<TreeCheckbox
						checkedData={checkedData}
						checkedOptions={checkedOptions}
						maxLevel={NODE_LEVELS[selectedSearchType]}
						setCheckedOptions={setCheckedOptions}
					/>
				</TreeWrapper>
			)}
		</ListWrapper>
	);
};

List.propTypes = {
	setCheckedOptions: PropTypes.func.isRequired,
	setSelectedLevel: PropTypes.func.isRequired,
	checkedOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default List;
