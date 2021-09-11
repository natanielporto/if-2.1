import styled from 'styled-components';

export const Label = styled.label`
	display: flex;
`;

export const WhiteCheckSquare = styled.div`
	border: 3px solid;
	border-radius: 4px;
	display: inline-block;
	width: 35px;
	height: 35px;
	margin-right: 10px;
	z-index: 1;
	background-color: ${({ check }) => (check ? '#fff' : 'transparent')};
`;
