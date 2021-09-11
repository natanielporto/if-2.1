/* eslint-disable max-lines */
import React, { useState, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AboutUsModal from './components/AboutUsModal';
import Map from './components/Map';
import Chart from './components/Chart';
import InstituteCard from './components/InstituteCard';
import Header from './components/Header';
import BottomInfoHelper from './components/BottomInfoHelper';
import Footer from './components/Footer';
import TableModal from './components/TableModal';
import { useGlobal } from './contexts/GlobalContext';
import SidebarFilter from './components/SidebarFilter';
import { CATEGORIES, COLORS } from './utils/categoriesHelper';
import {
	buildChartData,
	findValid,
	filterOnlyZeroed,
	filterOnlyIntegrated,
	mapIfDataToPoints,
} from './utils/mapAndDataHelper';
import { AppWrapper, MainStyleWrapper, ExampleTooltip } from './styles';

function App({ setIsAuthenticated }) {
	const [activeCodarea, setActiveCodarea] = useState(null);
	const [hoverPoint, setHoverPoint] = useState(null);
	const [showSidebar, setShowSidebar] = useState(false);
	const [selectedLevel, setSelectedLevel] = useState(null);
	const [onlyIntegrated, setOnlyIntegrated] = useState(false);
	const [onlyZeroed, setOnlyZeroed] = useState(false);
	const [checkedOptions, setCheckedOptions] = useState([]);
	const [localIfData, setLocalIfData] = useState([]);
	const [showTableModal, setShowTableModal] = useState(false);
	const [showAboutUsModal, setShowAboutUsModal] = useState(false);
	const [selectedSubjects, setSelectedSubjects] = useState(CATEGORIES);

	const { getIfData, ifData } = useGlobal();
	const tooltipRef = useRef();

	// Only load once, when entering
	useEffect(() => {
		getIfData();
	}, [getIfData]);

	useEffect(() => {
		setLocalIfData(ifData);
		mapIfDataToPoints(ifData);
	}, [ifData]);

	const handleDataOnly = (toFilter) => {
		// undo the filtering
		if (toFilter === 'integrated' && onlyIntegrated) {
			setLocalIfData(ifData);
			setOnlyIntegrated(false);
			return;
		}

		if (toFilter === 'zeroed' && onlyZeroed) {
			setLocalIfData(ifData);
			setOnlyZeroed(false);
			return;
		}

		// filter the data based on the selected option
		setOnlyIntegrated(false);
		setOnlyZeroed(false);
		const ifDataClone = JSON.parse(JSON.stringify(ifData));
		const MIN_LEVEL = 0;
		const MAX_LEVEL = 5;
		let filteredIfData = ifDataClone;

		if (checkedOptions.length !== 0) {
			filteredIfData = findValid(
				ifDataClone,
				checkedOptions,
				MIN_LEVEL,
				selectedLevel
			);
		}

		if (toFilter === 'integrated') {
			setOnlyIntegrated(!onlyIntegrated);
			filteredIfData =
				toFilter === 'integrated' &&
				filterOnlyIntegrated(filteredIfData, MIN_LEVEL, MAX_LEVEL);
		}

		if (toFilter === 'zeroed') {
			setOnlyZeroed(!onlyZeroed);
			filteredIfData =
				toFilter === 'zeroed' &&
				filterOnlyZeroed(filteredIfData, MIN_LEVEL, MAX_LEVEL);
		}

		// set the filtered data
		setLocalIfData(filteredIfData);
	};

	const onSelectSubject = (subject) => {
		if (selectedSubjects.includes(subject))
			return setSelectedSubjects(
				selectedSubjects.filter(
					(selectedSubject) => selectedSubject !== subject
				)
			);

		return setSelectedSubjects([...selectedSubjects, subject]);
	};

	const points = useMemo(() => mapIfDataToPoints(localIfData), [localIfData]);

	const chartData = useMemo(() => {
		return buildChartData(localIfData, selectedLevel, selectedSubjects);
	}, [localIfData, selectedLevel, selectedSubjects]);

	const baseInfoCardData = chartData.length
		? chartData.reduce((obj, current) => ({
				'Artes Visuais':
					parseInt(obj['Artes Visuais'], 10) +
					parseInt(current['Artes Visuais'], 10),
				Dança: parseInt(obj['Dança'], 10) + parseInt(current['Dança'], 10),
				Música: parseInt(obj['Música'], 10) + parseInt(current['Música'], 10),
				Teatro: parseInt(obj.Teatro, 10) + parseInt(current.Teatro, 10),
		  }))
		: null;

	const infoCardData = baseInfoCardData
		? CATEGORIES.map((type) => ({
				color: COLORS[type],
				counter: baseInfoCardData[type],
				description: type,
		  })).filter((category) => category.counter > 0)
		: [];

	return (
		<AppWrapper>
			{showTableModal ? (
				<TableModal ifData={ifData} setShowTableModal={setShowTableModal} />
			) : null}
			{showAboutUsModal ? (
				<AboutUsModal isAboutUs setShowAboutUsModal={setShowAboutUsModal} />
			) : null}
			<Header
				logout={() => setIsAuthenticated(false)}
				setShowAboutUsModal={setShowAboutUsModal}
				setShowSidebar={setShowSidebar}
				setShowTableModal={setShowTableModal}
				showSidebar={showSidebar}
			/>

			<section>
				<SidebarFilter
					checkedOptions={checkedOptions}
					handleDataOnly={handleDataOnly}
					ifData={ifData}
					onSelectSubject={onSelectSubject}
					onlyIntegrated={onlyIntegrated}
					onlyZeroed={onlyZeroed}
					setCheckedOptions={setCheckedOptions}
					setOnlyIntegrated={setOnlyIntegrated}
					setOnlyZeroed={setOnlyZeroed}
					setSelectedLevel={setSelectedLevel}
					setShowSidebar={setShowSidebar}
					showSidebar={showSidebar}
				/>
			</section>

			<MainStyleWrapper>
				<div className="map">
					<Map
						activeCodarea={activeCodarea}
						height={500}
						points={points}
						setActiveCodarea={setActiveCodarea}
						setHoverPoint={setHoverPoint}
						tooltipRef={tooltipRef}
						width={500}
					/>
					<ExampleTooltip ref={tooltipRef}>
						<InstituteCard
							categories={((hoverPoint && hoverPoint.categories) || []).sort(
								(catA, catB) =>
									CATEGORIES.indexOf(catA.description) -
									CATEGORIES.indexOf(catB.description)
							)}
							className="images"
							fromMap
							height={150}
							name={(hoverPoint && hoverPoint.id) || ''}
						/>
					</ExampleTooltip>
				</div>
				<div className="info">
					<InstituteCard
						categories={infoCardData}
						height={0}
						name={checkedOptions.length ? checkedOptions.join(' + ') : 'Total'}
						width="60%"
					/>
				</div>
				<div className="chart">
					{chartData.length && <Chart colors={COLORS} data={chartData} />}
				</div>
			</MainStyleWrapper>
			{/* display the bottom chart information in case it fits */}
			{chartData.length === 5 && <BottomInfoHelper data={chartData} />}
			<Footer />
		</AppWrapper>
	);
}

App.propTypes = {
	setIsAuthenticated: PropTypes.func.isRequired,
};

export default App;
