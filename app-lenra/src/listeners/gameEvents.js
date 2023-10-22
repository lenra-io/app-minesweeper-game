import { Api } from '@lenra/app';
import { Game } from '../classes/Game.js';
import { CODES, difficulties } from '../constants.js';
import { openCell } from '../lib/minesweeper.js';

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
    const { game: gameId } = props;
    const { x, y } = event;
    const transaction = await api.data.startTransaction();
    const coll = transaction.coll(Game);
    const game = await coll.getDoc(gameId);

    if (game.revealedCells.some(({ x: cx, y: cy }) => cx === x && cy === y)) return transaction.abort();

    // TODO: check if cell is flagged
    // TODO: check if cell is a mine
    // TODO: check if game is over

    await coll.updateMany({ _id: gameId }, { $push: { revealedCells: { $each: openCell(game.revealedCells, game.cells, x, y) } } });
    await transaction.commit();
}

/**
 * Reveal a cell
 * @param {{game: string}} props
 * @param {{position: CellPosition}} event
 * @param {Api} api
 */
export async function rotateCellFlag(props, event, api) {
    const { game: gameId } = props;
    const { x, y } = event;
    const transaction = await api.data.startTransaction();
    const coll = transaction.coll(Game);
    const game = await coll.getDoc(gameId);
    const flagedCellIndex = game.flagedCells.findIndex(({ x: cx, y: cy }) => cx === x && cy === y);
    if (flagedCellIndex !== -1) {
        const flagedCell = game.flagedCells[flagedCellIndex];
        if (flagedCell.flag === CODES.FLAG) {
            flagedCell.flag = CODES.QUESTION;
        }
        else {
            game.flagedCells.splice(flagedCellIndex, 1);
        }
    } else {
        game.flagedCells.push({ x, y, flag: CODES.FLAG });
    }
    await coll.updateDoc(game);
    await transaction.commit();
}
