import styled from 'styled-components';

export const LoginWrapper = styled.div`
	width: 50%;
	height: 96vh;
	float: left;
	display: flex;
	align-items: center;
	justify-content: center;
	@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
	button {
		display: table;
		width: 180px;
		background-color: #107977;
		color: white;
		font-size: 18px;

		border: none;
		padding: 5px 0;
		border-radius: 5px;
		margin: 0 auto;
		cursor: pointer;
	}
	div.credentials {
		position: absolute;
		display: flex;
		flex-direction: column;
		bottom: 35%;
		right: 20%;
		width: 25%;
	}
	.text-credentials {
		margin-bottom: 60px;
		font-size: 20px;
	}
	img {
		width: 380px;
	}
	input {
		border: none;
		border-bottom: 1px solid grey;
		background-color: transparent;
		font-size: 20px;
	}
	.wrong-password {
		color: red;
	}
	input.wrong-password {
		background-color: transparent;
		border: none;
		border-bottom: 1px solid grey;
	}
	@media screen and (max-width: 1024px) {
		width: 100%;
		height: 48vh;
		img {
			width: 220px;
		}
		div.credentials {
			bottom: 0px;
			right: 0px;
			left: 0;
			top: 45%;
			width: 70%;
			margin: 0 auto;
		}
		.text-credentials {
			width: 100%;
			font-size: 16px;
		}
		input {
			width: 100%;
		}
		button {
			width: 230px;
		}
	}
`;
