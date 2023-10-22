import { Listener } from "@lenra/app";
import { Game } from "../classes/Game.js";

/**
 * 
 * @param {Game[]} games 
 * @param {*} _props 
 * @returns {import("@lenra/app").JsonViewResponse}
 */
export default function (games, _props) {
    return {
        games: games.map(game => ({
            id: game._id,
            state: game.state,
        })),
        onCreateGame: Listener("createGame")
    }
}
