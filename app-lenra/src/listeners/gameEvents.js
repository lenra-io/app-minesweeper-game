import {Api} from '@lenra/app';
import { Game } from '../classes/Game.js';
import { initBoard } from '../lib/minesweeper.js';
import { GAME, MIN_HEIGHT, MIN_MINES, MIN_WIDTH } from '../constants.js';

const initialState = {
	enableSettings: false,
	gameState: GAME.READY,
	enableTimer: false,
	elapsedTime: 0,
	boardData: initBoard(MIN_WIDTH, MIN_HEIGHT, MIN_MINES),
	width: MIN_WIDTH,
	height: MIN_HEIGHT,
	mineCount: MIN_MINES,
	flagCount: 0,
	openedCellCount: 0
};

/**
 * @typedef {Object} CellPosition
 * @property {number} x
 * @property {number} y
 */

/**
 * Create a new game
 * @param {*} props 
 * @param {*} event 
 * @param {Api} api 
 */
export async function createGame(_props, _event, api) {
    const game = new Game("@me", MIN_WIDTH, MIN_HEIGHT, MIN_MINES);
    await api.data.coll(Game).createDoc(game);
}

/**
 * Reveal a cell
 * @param {{game: string}} props
 * @param {{position: CellPosition}} event
 * @param {Api} api
 */
export async function revealCell(props, event, api) {

}

/**
 * Reveal a cell
 * @param {{game: string}} props
 * @param {{position: CellPosition}} event
 * @param {Api} api
 */
export async function incrementCellFlag(props, event, api) {
	
}
