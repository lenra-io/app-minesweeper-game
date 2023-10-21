import {Api} from '@lenra/app';
import { Game } from '../classes/Game.js';
import { difficulties } from '../constants.js';

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
export async function createGame(_props, event, api) {
	const { type, difficulty } = event;
	const { width, height, mineCount } = difficulties[difficulty];
    const game = new Game("@me", width, height, mineCount);
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
