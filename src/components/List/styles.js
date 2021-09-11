import styled from 'styled-components';

export const ListWrapper = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	position: relative;
	input {
		position: absolute;
		width: 50%;
		height: 40px;
		left: 12%;
		top: 58%;
		border: 3px solid white;
		border-radius: 4px;
		background-color: rgb(62, 171, 191);
		color: white;
	}
`;

export const TreeWrapper = styled.div`
	max-height: 180px;
	width: 100%;

	overflow-y: auto;
	overflow-x: hidden;
	margin-top: 20px;
	margin-left: 15px;

	&::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		background-color: rgb(55, 58, 71);
	}

	&::-webkit-scrollbar {
		width: 12px;
		background-color: rgb(55, 58, 71);
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		background-color: #fff;
	}
`;
