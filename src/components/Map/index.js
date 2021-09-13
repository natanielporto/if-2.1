import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as topojson from 'topojson-client';
import * as d3 from 'd3';
import BrazilGeometry from '../../data/geometries/Brasil.topo.json';
import { minMax } from '../../utils/math';
import { STATE_DEFAULT_COLOR } from '../../utils/categoriesHelper';
import CustomSvg from './styles';

const Map = ({
	height,
	width,
	points,
	statesToDraw,
	zoomDuration,
	activeCodarea,
	setActiveCodarea,
	setHoverPoint,
	tooltipRef,
}) => {
	const svgRef = useRef();

	useLayoutEffect(() => {
		function reset(svg) {
			svg.transition().duration(750).attr('transform', '');
		}

		function clicked(obj, path, svg) {
			const { codarea } = obj.properties;

			if (activeCodarea === codarea) {
				setActiveCodarea(null);
				d3.selectAll('.state').style('fill', () => STATE_DEFAULT_COLOR);
				return reset(svg);
			}

			setActiveCodarea(codarea);
			d3.selectAll('.state').style('fill', (state) => {
				return codarea === state.properties.codarea
					? state.properties.color
					: STATE_DEFAULT_COLOR;
			});

			const bounds = path.bounds(obj);
			const dx = bounds[1][0] - bounds[0][0];
			const dy = bounds[1][1] - bounds[0][1];
			const posX = (bounds[0][0] + bounds[1][0]) / 2;
			const posY = (bounds[0][1] + bounds[1][1]) / 2;
			const scale = 0.9 / Math.max(dx / width, dy / height);
			const translate = [width / 2 - scale * posX, height / 2 - scale * posY];

			svg
				.transition()
				.duration(zoomDuration)
				.attr('transform', `translate(${translate})scale(${scale})`);
		}

		// Start parsing data accordingly
		const brasil = BrazilGeometry.objects.Brasil;
		const geometries = {
			geometries: brasil.geometries.filter((geometry) => {
				return (
					!statesToDraw || statesToDraw.includes(geometry.properties.codarea)
				);
			}),
			type: brasil.type,
		};
		const { features } = topojson.feature(BrazilGeometry, geometries);

		// Compute the center position
		const [minX, maxX] = minMax(
			geometries.geometries.map((geometry) => geometry.properties.centroide[0])
		);
		const [minY, maxY] = minMax(
			geometries.geometries.map((geometry) => geometry.properties.centroide[1])
		);
		const avgX = (maxX + minX) / 2;
		const avgY = (maxY + minY) / 2;

		// Compute the projection, centering on the already computed center
		const projection = d3
			.geoMercator()
			.translate([width / 2, height / 2])
			.scale(650)
			.center([avgX, avgY]);

		const path = d3.geoPath().projection(projection);

		const svg = d3
			.select(svgRef.current)
			.attr('width', width)
			.attr('height', height);

		// Just rebind listeners and redraw points
		if (svg.html()) {
			const mapGroup = d3.select('#mapGroup');
			d3.selectAll('.state').on('click', (obj) =>
				clicked(obj, path, mapGroup, width, height)
			);

			const pointsSvgGroup = d3.select('#pointsSvgGroup');

			pointsSvgGroup.selectAll('circle').remove();

			pointsSvgGroup
				.selectAll('circle')
				.data(points)
				.enter()
				.append('circle')
				.attr('cx', ({ coords }) => {
					return projection(coords)[0];
				})
				.attr('cy', ({ coords }) => {
					return projection(coords)[1];
				})
				.attr('id', ({ id }) => id)
				.attr('r', '1.3px')
				.attr('class', (point) =>
					point.categories.every((category) => category.counter === 0)
						? 'point point-zeroed'
						: 'point'
				)
				.on('mouseenter', (point) => {
					setHoverPoint(point);

					const tooltip = d3.select(tooltipRef.current);

					tooltip
						.transition()
						.duration(200)
						.style('opacity', 1)
						.style('left', `${d3.event.pageX + 60}px`)
						.style('top', `${d3.event.pageY - 158}px`);
				})
				.on('mouseleave', () => {
					const tooltip = d3.select(tooltipRef.current);

					tooltip.transition().duration(200).style('opacity', 0);
				});

			return;
		}

		const mapGroup = svg.append('g').attr('id', 'mapGroup');

		const mapSvgGroup = mapGroup.append('g').attr('id', 'mapSvgGroup');

		mapSvgGroup
			.append('path')
			.datum({ type: 'Sphere' })
			.attr('class', 'sphere')
			.attr('d', path);

		for (const feature of features) {
			mapSvgGroup
				.append('path')
				.data([feature])
				.attr('d', path)
				.attr('class', 'state')
				.style('fill', STATE_DEFAULT_COLOR);
		}

		mapSvgGroup
			.append('path')
			.datum(
				topojson.mesh(
					BrazilGeometry,
					geometries,
					(meshA, meshB) => meshA !== meshB
				)
			)
			.attr('class', 'boundary')
			.attr('d', path);

		mapGroup.append('g').attr('id', 'pointsSvgGroup');
	}, [
		activeCodarea,
		height,
		points,
		setActiveCodarea,
		setHoverPoint,
		statesToDraw,
		tooltipRef,
		width,
		zoomDuration,
	]);

	return <CustomSvg ref={svgRef} />;
};

Map.propTypes = {
	activeCodarea: PropTypes.string,
	height: PropTypes.number.isRequired,
	points: PropTypes.shape([]),
	setActiveCodarea: PropTypes.func,
	setHoverPoint: PropTypes.func,
	statesToDraw: PropTypes.arrayOf(PropTypes.string),
	tooltipRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	]),
	width: PropTypes.number.isRequired,
	zoomDuration: PropTypes.number,
};

Map.defaultProps = {
	activeCodarea: null,
	points: [],
	setActiveCodarea: () => {},
	setHoverPoint: () => {},
	statesToDraw: null,
	tooltipRef: () => ({ current: <div /> }),
	zoomDuration: 750,
};

export default Map;
