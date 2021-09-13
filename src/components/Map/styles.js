import styled from 'styled-components';
import { COLORS } from '../../utils/categoriesHelper';

const STATE_OPACITY = 0.8;
const STATE_OPACITY_HOVER = 1;

const CustomSvg = styled.svg`
	.sphere {
		fill: transparent;
	}

	.state {
		fill-opacity: ${STATE_OPACITY};
		transition: fill 750ms, fill-opacity 250ms;

		&:hover {
			fill-opacity: ${STATE_OPACITY_HOVER};
			cursor: pointer;
		}
	}

	.point {
		fill: white;
		stroke: ${COLORS.Points};
		stroke-width: 0.2px;
	}

	.point-zeroed {
		fill: ${COLORS['Points Inactivated']};
		stroke: white;
	}

	.boundary {
		fill: none;
		stroke: #000;
		stroke-width: 0.3px;
		stroke-linejoin: round;
		stroke-linecap: round;
	}
`;

export default CustomSvg;
