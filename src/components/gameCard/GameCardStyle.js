import styled from 'styled-components';
import { CELL_SIZE, CELL_MARGIN } from '../../constants';

export const Wrapper = styled.li`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: 10px auto 0 auto;
	width: ${({ widthSize }) => widthSize * (CELL_SIZE + CELL_MARGIN * 2)}px;
`;