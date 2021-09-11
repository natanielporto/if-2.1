import React from 'react';
import { FooterWrapper } from './styles';

const Footer = () => {
	return (
		<FooterWrapper
			onClick={() =>
				window.open(
					'mailto:carlagiamaral@gmail.com?subject=Contato%20via%20site%20IF%20Analitics&body=Obrigada%20pelo%20contato.%20Assim%20que%20poss%C3%ADvel%20responderei.%0d%0a%0d%0a%0d%0a%0d%0a--%0d%0a%0d%0aAtenciosamente%2C%0d%0a%0d%0aCarla%20Giane%20Fonseca%20do%20Amaral%0d%0aDoutora%20em%20Educa%C3%A7%C3%A3o%0d%0aProfessora%20de%20Artes%20Visuais%20IFSul%0d%0a%20Campus%20Sapucaia%20do%20Sul.'
				)
			}
		>
			<span>Contato:</span>
			<span>carlagiamaral@gmail.com</span>
		</FooterWrapper>
	);
};

export default Footer;
