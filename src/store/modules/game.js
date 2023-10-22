import produce from 'immer';
import {
	GAME,
	CODES
} from '../../constants';
import {
	initBoard,
	expandOpenedCell,
	getNextCellCode,
	getFlagIncDec
} from '../../lib/minesweeper';

export const SET_BOARD_SIZE = 'game/SET_BOARD_SIZE';
export const UPDATE_BOARD_DATA = 'game/UPDATE_BOARD_DATA';
export const RESTART_GAME = 'game/RESTART_GAME';
export const UPDATE_ELAPSED_TIME = 'game/UPDATE_ELAPSED_TIME';
export const OPEN_CELL = 'game/OPEN_CELL';
export const ROTATE_CELL_FLAG = 'game/ROTATE_CELL_FLAG';

export const setBoardSize = (width, height) => ({ type: SET_BOARD_SIZE, width, height });
export const updateBoardData = (boardData) => ({ type: UPDATE_BOARD_DATA, boardData });
export const restartGame = () => ({ type: RESTART_GAME });
export const updateElapsedTime = () => ({ type: UPDATE_ELAPSED_TIME });
export const openCell = (x, y) => ({ type: OPEN_CELL, x, y });
export const rotateCellFlag = (x, y) => ({ type: ROTATE_CELL_FLAG, x, y });

const initialState = {
	gameState: GAME.READY,
	enableTimer: false,
	elapsedTime: 0,
	width: null,
	height: null,
	boardData: null,
	openCellListener: null,
	flagCount: 0,
	openedCellCount: 0,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_BOARD_SIZE:
			return produce(state, draft => {
				draft.width = action.width;
				draft.height = action.height;
			});
		case UPDATE_BOARD_DATA:
			return produce(state, draft => {
				draft.boardData = action.boardData;
				console.log(action.boardData);
			});
		case RESTART_GAME:
			return produce(state, draft => {
				draft.gameState = GAME.READY;
				draft.enableTimer = false;
				draft.elapsedTime = 0;
				draft.boardData = initBoard(state.width, state.height, state.mineCount);
				draft.flagCount = 0;
				draft.openedCellCount = 0;
			});
		case UPDATE_ELAPSED_TIME:
			return produce(state, draft => {
				draft.elapsedTime++;
			});
		case OPEN_CELL:
			return produce(state, draft => {
				draft.gameState = GAME.RUN;

				// Start timer if click on cell
				if (!state.enableTimer) {
					draft.enableTimer = true;
				}
				if (draft.boardData[action.y][action.x] === CODES.NOTHING) {
					draft.boardData[action.y][action.x] = CODES.LOADING;
				}
			});
		case ROTATE_CELL_FLAG:
			return produce(state, draft => {
				const code = state.boardData[action.y][action.x];

				draft.boardData[action.y][action.x] = getNextCellCode(code);
				draft.flagCount += getFlagIncDec(code);
			});
		default:
			return state;
	}
}