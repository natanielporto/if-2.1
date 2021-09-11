import styled from 'styled-components';

export const ListBody = styled.ul`
	display: ${({ mainOne }) => (mainOne ? 'flex' : 'right')};
	position: ${({ mainOne }) => mainOne && 'absolute'};
	right: ${({ mainOne }) => mainOne && '60px'};
	bottom: ${({ mainOne }) => mainOne && '6%'};
	width: ${({ mainOne }) => (mainOne ? '53%' : '20%')};
	padding: 0;
`;

export const PercentageSquares = styled.li`
	font-size: 14px;
	list-style: none;
	color: #999;

	margin-right: 15px;
	border-right: ${({ mainOne }) => (mainOne ? '' : '1px solid lightgray')};
	padding-right: 10px;

	div {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
`;

export const HelperHeader = styled.h5`
	color: gray;
	margin: 0;
	padding: 0;
`;
