import { Listener } from "@lenra/app";
import { Game } from "../classes/Game.js";

/**
 * 
 * @param {Game[]} param0 
 * @param {*} _props 
 * @returns {import("@lenra/app").JsonViewResponse}
 */
export default function ([game], _props) {
  return {
    width: game.width,
    height: game.height,
    revealedCells: game.revealedCells,
    onRevealCell: Listener("revealCell")
      .props({
        game: game._id
      }),
    onIncrementCellFlag: Listener("incrementCellFlag")
      .props({
        game: game._id
      })
  };
}
