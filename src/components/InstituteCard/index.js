import React from 'react';
import PropTypes from 'prop-types';
import Category from './Category';
import { WrapperInstituteCard, FullCard, Title, Infos } from './styles';

const InstituteCard = ({
	height,
	width,
	name,
	imagesHeight,
	imagesWidth,
	categories,
	fromMap,
}) => {
	const total = categories.reduce((acc, { counter }) => acc + counter, 0);

	return (
		<WrapperInstituteCard
			cardHeight={height}
			cardWidth={width}
			data-testid="wrapper-institute-card"
			fromMap={fromMap}
		>
			<FullCard fromMap={fromMap}>
				<Infos>
					<Title data-testid="header-name">
						{name === 'Total' ? `${total} docentes` : `${name}`}
					</Title>
					<div className="images" data-testid="categories">
						{categories.map((category) => (
							<Category
								counter={category.counter}
								description={category.description}
								imagesHeight={imagesHeight}
								imagesWidth={imagesWidth}
								key={category.description}
								letterColor={category.color}
								testId={`category-${category.description}`}
								total={total}
							/>
						))}
					</div>
				</Infos>
			</FullCard>
		</WrapperInstituteCard>
	);
};

InstituteCard.propTypes = {
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			counter: PropTypes.number,
			description: PropTypes.string,
			name: PropTypes.string,
		})
	),
	fromMap: PropTypes.bool,
	height: PropTypes.number,
	imagesHeight: PropTypes.number,
	imagesWidth: PropTypes.number,
	name: PropTypes.string,
	width: PropTypes.string,
};

InstituteCard.defaultProps = {
	categories: [
		{
			counter: 0,
			description: '',
			name: '',
		},
	],
	fromMap: false,
	height: 220,
	imagesHeight: 50,
	imagesWidth: 50,
	name: 'Nome',
	width: '350px',
};

export default InstituteCard;
