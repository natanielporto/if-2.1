import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { useGlobal } from '../../contexts/GlobalContext';
import { COLORS } from '../../utils/categoriesHelper';
import { TableWrapper } from './styles';

const { DANCE_COLOR, MUSIC_COLOR, THEATER_COLOR, VISUAL_ARTS_COLOR } = COLORS;

const TableModal = ({ setShowTableModal }) => {
	const { rawIfData } = useGlobal();
	const [somaTotal, setSomaTotal] = useState(0);
	const HEADERS = [
		'',
		'Instituto',
		'Estado',
		'Região',
		'Campus',
		'Cidade',
		'AV',
		'M',
		'T',
		'D',
		'Total',
		'Integrado',
	];

	const languageColors = {
		AV: VISUAL_ARTS_COLOR,
		D: DANCE_COLOR,
		M: MUSIC_COLOR,
		T: THEATER_COLOR,
	};

	const integratedColors = {
		N: 'gray',
		S: 'green',
	};

	const getTdColor = (index, value) => {
		const isNumber = Number.isInteger(Number(value.trim()));
		if (isNumber) {
			return {
				backgroundColor: languageColors[HEADERS[index - 3]],
			};
		}

		if (index === 14) {
			return {
				backgroundColor: integratedColors[value.trim()],
			};
		}
	};

	useEffect(() => {
		if (rawIfData.length) {
			setSomaTotal(
				rawIfData
					.map((rawData) => Number(rawData.split(',')[13]) || 0)
					.reduce((soma, data) => soma + data)
			);
		}
	}, [rawIfData]);

	return (
		<Modal setShouldShowModal={setShowTableModal}>
			<TableWrapper>
				<table>
					<thead>
						<tr>
							{HEADERS.map((header) => (
								<th key={header}>{header}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rawIfData.length
							? rawIfData.map((rowData) => (
									<tr key={`${rowData}`}>
										{rowData.split(',').map((columData, index) =>
											index !== 7 && index !== 8 && index !== 0 ? (
												<td
													key={`${columData}-${Number(index)}`}
													style={getTdColor(index, columData)}
												>
													{columData.trim() || 0}
												</td>
											) : null
										)}
									</tr>
							  ))
							: null}
						<tr>
							{HEADERS.map((header) => {
								return header === 'Total' ? (
									<td>
										{' '}
										<strong> {somaTotal} </strong>{' '}
									</td>
								) : (
									<td />
								);
							})}
						</tr>
					</tbody>
				</table>
			</TableWrapper>
		</Modal>
	);
};

TableModal.propTypes = {
	ifData: PropTypes.object.isRequired,
	setShowTableModal: PropTypes.func.isRequired,
};

export default TableModal;
