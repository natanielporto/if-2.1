import React from 'react';
import PropTypes from 'prop-types';
import { slide as Menu } from 'react-burger-menu';
import styles from './styles';

const Sidebar = ({ children, isOpen, onOpen, onClose, width }) => {
	return (
		<Menu
			isOpen={isOpen}
			onClose={onClose}
			onOpen={onOpen}
			styles={styles}
			width={width}
		>
			{children}
		</Menu>
	);
};

Sidebar.propTypes = {
	burgerIcon: PropTypes.any,
	children: PropTypes.arrayOf(PropTypes.element),
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func,
	onOpen: PropTypes.func,
	width: PropTypes.string.isRequired,
};

Sidebar.defaultProps = {
	burgerIcon: undefined, // eslint-disable-line no-undefined
	children: null,
	onClose: () => {},
	onOpen: () => {},
};

export default Sidebar;
