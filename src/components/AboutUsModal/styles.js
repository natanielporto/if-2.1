import styled from 'styled-components';

export const AboutWrapper = styled.div`
	padding: 15px 60px 0;

	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	table {
		border: 1px solid #ccc;
		width: 100%;
	}
	tr {
		text-align: center;
		font-size: 16px;
		border-bottom: 1px solid #666666;
	}
	tr:nth-child(odd) {
		background: #fff;
	}
	td {
		padding: 2px;
	}
	th {
		background: #006d68;
		color: white;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		min-width: 80px;
		min-height: 50px;
		padding: 10px 0;
		font-size: 18px;
	}

	h2 {
		color: green;
		font-size: 30px;
		margin-bottom: 10px;
	}

	span {
		font-weight: 300;
		line-height: 22px;
	}
`;

export const CloseButton = styled.button`
	border: none;
	background: white;
	position: absolute;
	top: 50px;
	right: 65px;
	font-size: 24px;
	color: green;
	cursor: 'pointer';
`;
