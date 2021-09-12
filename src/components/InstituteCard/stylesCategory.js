import styled from 'styled-components';

export const CategoryWrapper = styled.div`
	display: flex;
	align-items: center;
	font-size: 14px;

	.letter {
		border-radius: 15px;
		font-size: ${(props) => props.letterFontSize}px;
		background-color: ${(props) => props.letterColor};
		color: transparent;
		width: 40px;
		height: 40px;
		margin-right: 10px;
	}
`;

export const Bottom = styled.div`
	font-size: 16px;
	font-weight: 300;
	line-height: 20px;

	span {
		display: ${({ fromMap }) => (fromMap ? '' : 'flex')};
		align-items: ${({ fromMap }) => (fromMap ? '' : 'flex-start')};
	}
`;

export const NumberAndPercentage = styled.div`
	display: flex;
	justify-content: space-around;

	span + span {
		font-weight: bold;
	}
`;
