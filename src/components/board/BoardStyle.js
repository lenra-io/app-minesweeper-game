import styled from 'styled-components';
import { CELL_SIZE, CELL_MARGIN } from '../../constants';

export const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: 10px auto 0 auto;
	width: ${({ widthSize }) => widthSize * (CELL_SIZE + CELL_MARGIN * 2)}px;
`;

export const Message = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	justify-content: center;
	text-transform: uppercase;
	text-align: center;
	background-color: rgba(255, 255, 255, 0.3);
	color: black;
	font-size: 200%;
	font-weight: bold;
`;