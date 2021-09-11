import styled from 'styled-components';

export const WrapperInstituteCard = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: '${(props) => props.cardHeight}px';
	width: ${({ fromMap }) => (fromMap === true ? '130%' : '65%')};
	border-radius: ${({ fromMap }) => (fromMap === true ? '15px' : '')};
	background-color: ${({ fromMap }) => fromMap === true && 'white'};
	line-height: 25px;

	${({ fromMap }) =>
		fromMap === true &&
		`
    box-shadow: 0 0  0 2px rgb(255,255,255),
                0.3em 0.3em 1em rgba(0,0,0,0.3);
`}
`;

export const FullCard = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	align-items: center;
	height: ${({ fromMap }) => (fromMap === true ? '200px' : '')};
	padding-bottom: ${({ fromMap }) => (fromMap === true ? '20px' : '')};
`;

export const Infos = styled.div`
	width: 80%;
`;

export const Title = styled.span`
	padding-top: 20px;
	font-size: 20px;
	display: flex;
	align-items: flex-start;
`;
