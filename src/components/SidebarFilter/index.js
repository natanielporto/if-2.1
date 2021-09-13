import React from 'react';
import PropTypes from 'prop-types';
import { FiSearch as Search } from 'react-icons/fi';
import Sidebar from '../Sidebar';
import CheckboxGroup from '../CheckboxGroup';
import List from '../List';
import Checkbox from '../Checkbox';
import { CATEGORIES } from '../../utils/categoriesHelper';

const SidebarFilter = ({
	onSelectSubject,
	onlyZeroed,
	onlyIntegrated,
	showSidebar,
	setShowSidebar,
	checkedOptions,
	ifData,
	setCheckedOptions,
	setSelectedLevel,
	handleDataOnly,
}) => {
	return (
		<Sidebar
			backgroundColor="#3EABBF"
			burgerIcon={<Search />}
			isOpen={showSidebar}
			onClose={() => setShowSidebar(false)}
			onOpen={() => setShowSidebar(true)}
			width="40%"
		>
			<h2>Linguagens</h2>
			<CheckboxGroup
				itemIds={CATEGORIES}
				onClick={onSelectSubject}
				startChecked
			/>

			<h2>Campus</h2>
			<List
				checkedOptions={checkedOptions}
				ifData={ifData}
				setCheckedOptions={setCheckedOptions}
				setSelectedLevel={setSelectedLevel}
			/>

			<h2>Filtros avançados</h2>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: 90,
					justifyContent: 'space-between',
				}}
			>
				<Checkbox
					click={() => handleDataOnly('integrated')}
					isChecked={onlyIntegrated}
					label="Apenas ensino integrado"
				/>
				<Checkbox
					click={() => handleDataOnly('zeroed')}
					isChecked={onlyZeroed}
					label="Apenas sem professores"
				/>
			</div>
		</Sidebar>
	);
};

SidebarFilter.propTypes = {
	checkedOptions: PropTypes.shape([]).isRequired,
	ifData: PropTypes.shape([]).isRequired,
	onSelectSubject: PropTypes.func.isRequired,
	onlyIntegrated: PropTypes.bool.isRequired,
	onlyZeroed: PropTypes.bool.isRequired,
	setCheckedOptions: PropTypes.func.isRequired,
	handleDataOnly: PropTypes.func.isRequired,
	setSelectedLevel: PropTypes.func.isRequired,
	setShowSidebar: PropTypes.func.isRequired,
	showSidebar: PropTypes.bool.isRequired,
};

export default SidebarFilter;
