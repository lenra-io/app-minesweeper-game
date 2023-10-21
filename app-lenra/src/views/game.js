import { Listener } from "@lenra/app";
import { Game } from "../classes/Game.js";
import { CODES } from "../constants.js";

/**
 * 
 * @param {Game[]} param0 
 * @param {*} _props 
 * @returns {import("@lenra/app").JsonViewResponse}
 */
export default function ([game], _props) {
  const boardData = [];
  for (let i = 0; i < game.height; i++) {
		boardData.push(Array(game.width).fill(CODES.NOTHING));
	}
  game.revealedCells.forEach(({x, y}) => {
    boardData[y][x] = game.cells[y][x];
  });
  console.log(boardData);
  return {
    width: game.width,
    height: game.height,
    boardData,
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
