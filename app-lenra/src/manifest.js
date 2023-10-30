import { View } from "@lenra/app";
import { Game } from "./classes/Game.js";
import { GAME } from "./constants.js";

/**
 * @type {import("@lenra/app").Manifest["json"]}
 */
export const json = {
    routes: [
        {
            path: "/games",
            view: View("gameList").find(Game, {
                player: "@me",
                $or: [
                    { state: GAME.READY },
                    { state: GAME.RUN }
                ]
            })
        }
    ]
};
