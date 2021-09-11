import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layer, Content } from './styles';

const Modal = ({ children, setShouldShowModal, isAboutUs }) => {
	useEffect(() => {
		const onClickEsc = (evt) => {
			if (evt.keyCode === 27) {
				setShouldShowModal(false);
			}
		};

		document.addEventListener('keydown', onClickEsc, false);
	}, [setShouldShowModal]);

	return (
		<>
			<Layer onClick={() => setShouldShowModal(false)} />
			<Content isAboutUs={isAboutUs}>{children}</Content>
		</>
	);
};

Modal.propTypes = {
	children: PropTypes.node,
	isAboutUs: PropTypes.bool,
	setShouldShowModal: PropTypes.func,
};

Modal.defaultProps = {
	children: null,
	isAboutUs: false,
	setShouldShowModal: () => {},
};

export default Modal;
