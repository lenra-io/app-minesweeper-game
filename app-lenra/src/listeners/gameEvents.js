import { Api } from '@lenra/app';
import { Game } from '../classes/Game.js';
import { GAME, difficulties } from '../constants.js';
import { initBoard } from "../lib/minesweeper.js";

/**
 * Create a new game
 * @param {*} props 
 * @param {*} event 
 * @param {Api} api 
 */
export async function createGame(_props, event, api) {
    const { difficulty } = event;
    const { width, height, mineCount } = difficulties[difficulty];
    const game = new Game(
        "@me",
        difficulty,
        GAME.READY,
        width,
        height,
        mineCount,
        initBoard(width, height, mineCount),
        [],
        []
    );
    await api.data.coll(Game).createDoc(game);
}
