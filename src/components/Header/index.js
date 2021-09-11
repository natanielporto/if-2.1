import React from 'react';

import { BiSlider } from 'react-icons/bi';
import { GrTable } from 'react-icons/gr';

import PropTypes from 'prop-types';
import {
	HeaderWrapper,
	LeftSideNav,
	RightSideNav,
	Logo,
	Links,
	Logout,
} from './styles';

import LogoNavBar from '../../assets/mapeamento-final.png';

const Header = ({
	logout,
	setShowSidebar,
	showSidebar,
	setShowTableModal,
	showTableModal,
	setShowAboutUsModal,
	showAboutUsModal,
}) => {
	return (
		<HeaderWrapper>
			<LeftSideNav>
				<Logo alt="Logo Projeto" height="70" src={LogoNavBar} />
				<Links>
					<li onClick={() => setShowSidebar(!showSidebar)}>
						Filtros &nbsp;
						<BiSlider size={24} />
					</li>
					<li onClick={() => setShowTableModal(!showTableModal)}>
						Tabela &nbsp;
						<GrTable size={24} />
					</li>
					<li onClick={() => setShowAboutUsModal(!showAboutUsModal)}>Sobre</li>
				</Links>
			</LeftSideNav>

			<RightSideNav>
				<Logout onClick={logout}>Sair</Logout>
			</RightSideNav>
		</HeaderWrapper>
	);
};

Header.propTypes = {
	logout: PropTypes.func,
	setShowAboutUsModal: PropTypes.func,
	setShowSidebar: PropTypes.func,
	setShowTableModal: PropTypes.func,
	showAboutUsModal: PropTypes.bool,
	showSidebar: PropTypes.bool,
	showTableModal: PropTypes.bool,
};

Header.defaultProps = {
	logout: () => {},
	setShowAboutUsModal: () => {},
	setShowSidebar: () => {},
	setShowTableModal: () => {},
	showAboutUsModal: false,
	showSidebar: false,
	showTableModal: false,
};

export default Header;
