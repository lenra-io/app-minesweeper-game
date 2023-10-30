import React from 'react';
import { CellContainer } from '../../containers';
import {
	Message,
	Wrapper
} from './BoardStyle';
import { GAME } from '../../constants.js';

const Board = ({
	width,
	height,
	state,
	onRightClickBoard
}) => {
	return (
		<Wrapper widthSize={width} onContextMenu={onRightClickBoard}>
			{state===GAME.WIN && <Message>You win!</Message>}
			{state===GAME.LOSE && <Message>You lose!</Message>}
			{Array(width * height).fill().map((v, i) => 
				<CellContainer key={i} x={i % width} y={Math.floor(i / width)} />
			)}
		</Wrapper>
	);
};

export default Board;