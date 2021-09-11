import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ExclusiveCheckboxGroup from '../ExclusiveCheckboxGroup';
import TreeCheckbox from '../TreeCheckbox';
import { SEARCH_TYPE, NODE_LEVELS } from './constants';
import { ListWrapper, TreeWrapper } from './styles';

const List = ({
	checkedOptions,
	ifData,
	setSelectedLevel,
	setCheckedOptions,
}) => {
	const [selectedSearchType, setSelectedSearchType] = useState(SEARCH_TYPE[0]);
	const [searchTimeoutId, setSearchTimeoutId] = useState(null);
	const [checkedData, setCheckedData] = useState(null);

	useEffect(() => {
		setSelectedLevel(NODE_LEVELS[selectedSearchType]);
	}, [selectedSearchType, setSelectedLevel]);

	function markLeafNodesToShow(node, level, key) {
		if (level <= 0) {
			return node.name.toLowerCase().includes(key)
				? { ...node, mustShow: true }
				: node;
		}

		node.children = node.children.map((child) =>
			markLeafNodesToShow(child, level - 1, key)
		);

		return node;
	}

	function getTreeToShow(node, level) {
		if (level <= 0) {
			node.mustShow = node.mustShow || false;
			node.children = [];
			node.checked = false;
			return node;
		}

		node.mustShow = node.children
			.map((child) => getTreeToShow(child, level - 1))
			.some((child) => child.mustShow);

		node.children = node.children.filter((child) => child.mustShow);

		return node;
	}

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
	checkedOptions: PropTypes.array.isRequired,
	ifData: PropTypes.object.isRequired,
	setCheckedOptions: PropTypes.func.isRequired,
	setSelectedLevel: PropTypes.func.isRequired,
};

export default List;
