import React from 'react';
import PropTypes from 'prop-types';
import { ListBody, PercentageSquares, HelperHeader } from './styles';

const BottomInfoHelper = ({ data }) => {
	const sortedData = data.map((item) => Object.entries(item));
	const sortedDataToShow = sortedData.map((el) => [el.pop(), ...el]).sort();

	return (
		<ListBody mainOne>
			{sortedDataToShow.map((el, index) => (
				<ListBody key={Math.random() * 10}>
					{el.map(([key, value]) =>
						key === 'key' ? (
							<HelperHeader key={Math.random() * 10}>{value}</HelperHeader>
						) : (
							<PercentageSquares key={Math.random() * 10} mainOne={index === 4}>
								<div>
									<span>{key}</span>
									<span>{value}</span>
								</div>
							</PercentageSquares>
						)
					)}
				</ListBody>
			))}
		</ListBody>
	);
};

BottomInfoHelper.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BottomInfoHelper;
