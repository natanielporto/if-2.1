import { COLORS } from './categoriesHelper';

export const mapIfDataToPoints = (ifData) => {
	try {
		const regions = ifData.children;
		const states = regions.map((region) => region.children).flat();
		const institutes = states.map((state) => state.children).flat();
		const cities = institutes.map((institute) => institute.children).flat();
		const campi = cities.map((city) => city.children).flat();

		const points = campi.map((campus) => ({
			categories: [
				{
					color: COLORS['Música'],
					counter: parseInt(campus.teachers.music, 10),
					description: 'Música',
				},
				{
					color: COLORS.Teatro,
					counter: parseInt(campus.teachers.theater, 10),
					description: 'Teatro',
				},
				{
					color: COLORS['Dança'],
					counter: parseInt(campus.teachers.dance, 10),
					description: 'Dança',
				},
				{
					color: COLORS['Artes Visuais'],
					counter: parseInt(campus.teachers.visualArts, 10),
					description: 'Artes Visuais',
				},
			],
			coords: [parseFloat(campus.longitude), parseFloat(campus.latitude)],
			id: campus.name,
		}));

		return points;
	} catch (error) {
		const VALID_ERROR_MESSAGE = `'map' of undefined`;
		if (!error.message.includes(VALID_ERROR_MESSAGE)) {
			console.error(error);
		}

		return [];
	}
};

export const buildChartData = (
	node,
	desiredLevel,
	selectedSubjects,
	currentLevel = 0
) => {
	const MAX_LEVEL = 5;
	try {
		if (currentLevel === MAX_LEVEL) {
			return {
				'Artes Visuais': selectedSubjects.includes('Artes Visuais')
					? node.teachers.visualArts
					: 0,
				Dança: selectedSubjects.includes('Dança') ? node.teachers.dance : 0,
				Música: selectedSubjects.includes('Música') ? node.teachers.music : 0,
				Teatro: selectedSubjects.includes('Teatro') ? node.teachers.theater : 0,
			};
		}

		if (currentLevel < desiredLevel) {
			return node.children
				.map((child) =>
					buildChartData(
						child,
						desiredLevel,
						selectedSubjects,
						currentLevel + 1
					)
				)
				.flat();
		}

		const childrenData = node.children.map((child) =>
			buildChartData(child, desiredLevel, selectedSubjects, currentLevel + 1)
		);

		const teachersData = childrenData.reduce((obj, current) => ({
			'Artes Visuais':
				parseInt(obj['Artes Visuais'], 10) +
				parseInt(current['Artes Visuais'], 10),
			Dança: parseInt(obj['Dança'], 10) + parseInt(current['Dança'], 10),
			Música: parseInt(obj['Música'], 10) + parseInt(current['Música'], 10),
			Teatro: parseInt(obj.Teatro, 10) + parseInt(current.Teatro, 10),
		}));

		return { ...teachersData, key: node.name };
	} catch (error) {
		const VALID_ERROR_MESSAGE = `'map' of undefined`;
		if (!error.message.includes(VALID_ERROR_MESSAGE)) {
			console.error(error);
		}

		return [];
	}
};

export const filterOnlyZeroed = (node, currentLevel, finalLevel) => {
	if (currentLevel < finalLevel) {
		const children = node.children
			.map((child) => filterOnlyZeroed(child, currentLevel + 1, finalLevel))
			.filter(
				(val) => val !== null && (!val.children || val.children.length !== 0)
			);
		return { ...node, children };
	}
	const qtdProfessores = Object.values(node.teachers);
	return qtdProfessores.every((quantidade) => quantidade === 0) ? node : null;
};

export const filterOnlyIntegrated = (node, currentLevel, finalLevel) => {
	if (currentLevel < finalLevel) {
		const children = node.children
			.map((child) => filterOnlyIntegrated(child, currentLevel + 1, finalLevel))
			.filter(
				(val) => val !== null && (!val.children || val.children.length !== 0)
			);
		return { ...node, children };
	}
	return node.integratedCourse ? node : null;
};

export const findValid = (node, wantedNames, currentLevel, desiredLevel) => {
	console.log('indValid', (node, wantedNames, currentLevel, desiredLevel));
	if (currentLevel < desiredLevel) {
		const children = node.children
			.map((child) =>
				findValid(child, wantedNames, currentLevel + 1, desiredLevel)
			)
			.filter(
				(val) => val !== null && (!val.children || val.children.length !== 0)
			);

		return { ...node, children };
	}

	if (currentLevel === desiredLevel && wantedNames.length) {
		return wantedNames.includes(node.name) ? node : null;
	}

	return node;
};
