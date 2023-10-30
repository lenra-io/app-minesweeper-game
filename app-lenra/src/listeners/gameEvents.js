import { Api } from '@lenra/app';
import { Game } from '../classes/Game.js';

/**
 * Create a new game
 * @param {*} props 
 * @param {*} event 
 * @param {Api} api 
 */
export async function createGame(_props, event, api) {
    const { difficulty } = event;
    const game = Game.create("@me", difficulty);
    await api.data.coll(Game).createDoc(game);
}
