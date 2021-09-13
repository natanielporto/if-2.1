import styled from 'styled-components';

export const HeaderWrapper = styled.div`
	background-color: white;
	-webkit-box-shadow: inset 0px 0px 15px 5px rgba(0, 0, 0, 0.15);
	-moz-box-shadow: inset 0px 0px 15px 5px rgba(0, 0, 0, 0.15);
	box-shadow: inset 0px 0px 15px 5px rgba(0, 0, 0, 0.15);
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 80px;
`;

export const LeftSideNav = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const RightSideNav = styled.div``;

export const Logo = styled.img`
	margin-right: 16px;
`;

export const Links = styled.ul`
	display: flex;
	justify-content: center;
	align-items: center;
	list-style-type: none;
	font-size: 16px;

	li {
		margin: 0 32px;
		cursor: pointer;
		button {
			background-color: transparent;
			border: none;
			cursor: pointer;
		}
	}
`;

export const Logout = styled.div`
	cursor: pointer;
	color: red;
`;
