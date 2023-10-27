import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GAME, CODES } from '../../constants';
import { openCell, rotateCellFlag } from '../../store/modules/game';
import { Cell } from '../../components';

const CellContainer = ({
	x,
	y
}) => {
	const dispatch = useDispatch();
	const gameState = useSelector(rootState => rootState.game.gameState);
	const cellCode = useSelector(rootState => rootState.game.boardData[y][x]);

	const getCellText = useCallback((code) => {
		switch (code) {
			case CODES.OPENED:
			case CODES.NOTHING:
				return '';
			case CODES.FLAG:
				return '🚩'
			case CODES.QUESTION:
				return '❔'
			case CODES.MINE:
				switch (gameState) {
					case GAME.WIN:
						return '💣';
					case GAME.LOSE:
						return '💥';
					default:
						return '';
				}
			case CODES.LOADING:
				return '...';
			default:
				return code;
		}
	}, [gameState]);

	const onClickCell = useCallback(() => {
		if (gameState === GAME.READY || gameState === GAME.RUN) {
			dispatch(openCell(x, y));
		}
	}, [gameState]);

	const onRightClickCell = useCallback((e) => {
		e.preventDefault();

		if (gameState === GAME.READY || gameState === GAME.RUN) {
			dispatch(rotateCellFlag(x, y))
		}
	}, [gameState]);

	return (
		<Cell
			cellCode={cellCode}
			cellText={getCellText(cellCode)}
			onClickCell={onClickCell}
			onRightClickCell={onRightClickCell}
		/>
	);
};

export default memo(CellContainer);