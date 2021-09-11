import React from 'react';
import PropTypes from 'prop-types';
import { CategoryWrapper, Bottom, NumberAndPercentage } from './stylesCategory';

const Category = ({
	counter,
	description,
	letterColor,
	letterFontSize,
	percentagePlaces,
	testId,
	total,
	fromMap,
}) => {
	// We have this weird (total || 1) to account for the total being 0, so we just divide 0 by 1,
	// which will have a percentage that makes sense (0%)
	const percentage = ((counter / (total || 1)) * 100).toFixed(percentagePlaces);

	return (
		<CategoryWrapper
			data-testid={testId}
			letterColor={letterColor}
			letterFontSize={letterFontSize}
		>
			<span className="letter" data-testid={`${testId}-letter`}>
				{description === 'Artes Visuais' ? 'AV' : description.toUpperCase()[0]}
			</span>
			<Bottom>
				<span data-testid={`${testId}-description`} fromMap={fromMap}>
					{description}
				</span>
				<NumberAndPercentage>
					<span data-testid={`${testId}-counter`}>{counter} -&nbsp;</span>
					<span data-testid={`${testId}-counter-percentage`}>
						{percentage}%
					</span>
				</NumberAndPercentage>
			</Bottom>
		</CategoryWrapper>
	);
};

Category.propTypes = {
	counter: PropTypes.number.isRequired,
	description: PropTypes.string.isRequired,
	fromMap: PropTypes.bool,
	letterColor: PropTypes.string,
	letterFontSize: PropTypes.number,
	percentagePlaces: PropTypes.number,
	testId: PropTypes.string.isRequired,
	total: PropTypes.number.isRequired,
};

Category.defaultProps = {
	fromMap: false,
	letterColor: 'black',
	letterFontSize: 40,
	percentagePlaces: 2,
};

export default Category;
