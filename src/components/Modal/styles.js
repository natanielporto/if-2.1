import styled from 'styled-components';

export const Layer = styled.div`
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	height: 118vh;
	justify-content: center;
	position: absolute;
	width: 100vw;
	z-index: 999;
`;

export const Content = styled.div`
	background-color: #fff;
	height: ${({ isAboutUs }) => (isAboutUs ? '60%' : '90%')};
	width: ${({ isAboutUs }) => (isAboutUs ? '60%' : '90%')};
	max-height: ${({ isAboutUs }) => (isAboutUs ? '500px' : '90%')};
	max-width: ${({ isAboutUs }) => (isAboutUs ? '750px' : '90%')};
	overflow-y: ${({ isAboutUs }) => (isAboutUs ? 'hidden' : 'scroll')};
	position: fixed;
	z-index: 99999;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;
