import { Listener } from "@lenra/app";
import { Game } from "../classes/Game.js";
import { currentUserGameState } from "../lib/minesweeper.js";

/**
 * 
 * @param {Game[]} games 
 * @param {*} _props 
 * @returns {import("@lenra/app").JsonViewResponse}
 */
export default function (games, _props, context) {
    const { me } = context;
    return {
        games: games.map(game => ({
            id: game._id,
            state: currentUserGameState(game, me),
            type: game.type,
            difficulty: game.difficulty,
        })),
        onCreateGame: Listener("createGame")
            .props({ me })
    }
}
