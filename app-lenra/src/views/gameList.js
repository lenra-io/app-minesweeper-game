import { Listener } from "@lenra/app";
import { Game } from "../classes/Game.js";

/**
 * 
 * @param {Game[]} games 
 * @param {*} _props 
 * @returns {import("@lenra/app").JsonViewResponse}
 */
export default function (games, _props, context) {
    return {
        games: games.map(game => ({
            id: game._id,
            state: game.state,
            type: game.type,
            difficulty: game.difficulty,
        })),
        onCreateGame: Listener("createGame")
            .props({ me: context.me })
    }
}
