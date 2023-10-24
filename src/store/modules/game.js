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
import { SET_GAME } from './app.js';

export const UPDATE_ATTRIBUTES = 'game/UPDATE_ATTRIBUTES';
export const UPDATE_BOARD_DATA = 'game/UPDATE_BOARD_DATA';
export const UPDATE_STATUS = 'game/UPDATE_STATUS';
export const RESTART_GAME = 'game/RESTART_GAME';
export const UPDATE_ELAPSED_TIME = 'game/UPDATE_ELAPSED_TIME';
export const OPEN_CELL = 'game/OPEN_CELL';
export const ROTATE_CELL_FLAG = 'game/ROTATE_CELL_FLAG';

export const updateAttributes = (width, height, mineCount) => ({ type: UPDATE_ATTRIBUTES, width, height, mineCount });
export const updateBoardData = (boardData) => ({ type: UPDATE_BOARD_DATA, boardData });
export const updateStatus = (state, remainingFlags) => ({ type: UPDATE_STATUS, state, remainingFlags });
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
	mineCount: null,
	remainingFlags: null,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case UPDATE_ATTRIBUTES:
			return produce(state, draft => {
				draft.width = action.width;
				draft.height = action.height;
				draft.mineCount = action.mineCount;
			});
		case UPDATE_BOARD_DATA:
			return produce(state, draft => {
				draft.boardData = action.boardData;
				console.log(action.boardData);
			});
		case UPDATE_STATUS:
			return produce(state, draft => {
				draft.gameState = action.state;
				draft.remainingFlags = action.remainingFlags;
			});
		case SET_GAME:
			return initialState;
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
				draft.remainingFlags -= getFlagIncDec(code);
			});
		default:
			return state;
	}
}