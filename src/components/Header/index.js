import React from 'react';

import { BiSlider, BiBookReader } from 'react-icons/bi';
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
	const openLink = (link) => {
		return window.open(link, '_blank');
	};

	return (
		<HeaderWrapper>
			<LeftSideNav>
				<Logo alt="Logo Projeto" height="70" src={LogoNavBar} />
				<Links>
					<li>
						<button type="button" onClick={() => setShowSidebar(!showSidebar)}>
							Filtros &nbsp;
							<BiSlider size={24} />
						</button>
					</li>
					<li>
						<button
							type="button"
							onClick={() => setShowTableModal(!showTableModal)}
						>
							Tabela &nbsp;
							<GrTable size={24} />
						</button>
					</li>
					<li>
						<button
							type="button"
							onClick={() =>
								openLink(
									'https://docs.google.com/spreadsheets/d/16C3wI4w9RhWc6RNFihwTOCNVG8fNdhTi/edit?usp=sharing&ouid=108801184981324530479&rtpof=true&sd=true'
								)
							}
						>
							Cursos &nbsp;
							<BiBookReader size={28} />
						</button>
					</li>
					<li>
						<button
							type="button"
							onClick={() => setShowAboutUsModal(!showAboutUsModal)}
						>
							Sobre
						</button>
					</li>
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
