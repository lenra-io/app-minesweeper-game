import { View } from "@lenra/app";
import { Game } from "./classes/Game.js";

/**
 * @type {import("@lenra/app").Manifest["json"]}
 */
export const json = {
    routes: [
        {
            path: "/games",
            view: View("games").find(Game, {
                player: "@me"
            })
        },
        {
            path: "/games/:id/board",
            view: View("board").find(Game, {
                _id: "@route.id",
                player: "@me"
            })
        }
    ]
};
