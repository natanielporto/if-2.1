import styled from 'styled-components';

export const ExampleTooltip = styled.div`
	position: absolute;
	text-align: center;
	padding: 2px;
	font-size: 12px;
	border: 0px;
	border-radius: 8px;
	pointer-events: none;
	opacity: 0;
	z-index: 1000;
`;

export const MainStyleWrapper = styled.div`
	position: relative;
	width: 100%;
	margin-top: 5px;
	display: grid;
	justify-items: stretch;
	grid-template:
		'map info' 150px
		'map chart' 400px / 35% 65%;

	.map {
		grid-area: map;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 105%;
		margin-left: 45px;
		margin-top: 40px;
	}

	.info {
		grid-area: info;
		width: 100%;

		display: flex;
		align-items: center;
		padding-left: 45px;
	}

	.bottom-helper {
		width: 100%;
		background: red;
	}
`;

export const AppWrapper = styled.div`
	height: 94%;
	width: 100vw;
	overflow-y: hidden;
	display: flex;
	flex-direction: column;
	justify-content: center;

	.map-modal {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-row-gap: 10px;
		grid-column-gap: 25px;
		margin-top: 8px;
	}
	
	.top-info-display {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 150%;
		margin-top: 8px;
	}
`;
