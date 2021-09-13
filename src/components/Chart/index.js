import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveBar as Bar } from '@nivo/bar';

const Chart = ({ colors, data }) => {
	const [variables, setVariables] = useState({});

	const newVariables = (length) => {
		if (length > 20)
			return setVariables({ width: 1950, thickRotation: 50, right: 50 });
		return setVariables({ width: 750, thickRotation: 0, right: 0 });
	};

	useEffect(() => {
		newVariables(data.length);
	}, [data.length]);

	const getColor = (bar) => colors[bar.id];

	const keys = Object.keys(data[0]).filter((key) => key !== 'key');

	const dataSortedbyName = data.slice(0);

	dataSortedbyName.sort((itemA, itemB) => {
		const aToLower = itemA.key.toLowerCase();
		const bToLower = itemB.key.toLowerCase();
		// eslint-disable-next-line no-nested-ternary
		return aToLower < bToLower ? -1 : aToLower > bToLower ? 1 : 0;
	});

	const axisLeft = {
		enable: true,
		tickPadding: 10,
		tickSize: 10,
	};

	const axisBottom = {
		enable: true,
		tickSize: 10,
		tickPadding: 10,
		tickRotation: variables.thickRotation,
	};

	return (
		<Bar
			overflow="auto"
			animate
			axisLeft={axisLeft}
			axisBottom={axisBottom}
			colors={getColor}
			data={dataSortedbyName}
			groupMode="grouped"
			height={400}
			id="12345"
			indexBy="key"
			keys={keys}
			labelTextColor="gray"
			layout="vertical"
			margin={{ bottom: 100, left: 140, right: variables.right, top: 20 }}
			sortBy={data.key}
			width={variables.width}
		/>
	);
};

Chart.propTypes = {
	colors: PropTypes.shape({}).isRequired,
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Chart;
