import { Listener } from "@lenra/app";
import { Game, PlayerState } from "../classes/Game.js";
import { CODES, types } from "../constants.js";
import { calculatePlayerStateScore, currentUserGameState } from "../lib/minesweeper.js";

/**
 * 
 * @param {Game[]} param0 
 * @param {*} _props 
 * @returns {import("@lenra/app").JsonViewResponse}
 */
export default function ([game], _props, context) {
  const { me } = context;
  const boardData = [];
  let flagCount = 0;
  const playerState = game.playerStates.find(({ user }) => user === me);
  const revealedCells = game.playerStates.flatMap(state => state.revealedCells);

  for (let i = 0; i < game.height; i++) {
    boardData.push(Array(game.width).fill(CODES.NOTHING));
  }
  revealedCells.forEach(({ x, y }) => {
    boardData[y][x] = game.cells[y][x];
  });
  playerState.flagedCells.forEach(({ x, y, flag }) => {
    if (boardData[y][x] !== CODES.NOTHING) return;
    boardData[y][x] = flag;
    if (flag === CODES.FLAG) flagCount++;
  });

  const result = {
    width: game.width,
    height: game.height,
    mineCount: game.mineCount,
    state: currentUserGameState(game, me),
    myTurn: game.nextPlayers[0] === me,
    boardData,
    remainingFlags: game.mineCount - flagCount,
    onRevealCell: Listener("revealCell")
      .props({
        me,
        game: game._id
      }),
    onRotateCellFlag: Listener("rotateCellFlag")
      .props({
        me,
        game: game._id
      })
  }

  if (game.type === "versus") {
    game.playerStates
      .sort((a, b) => {
        if (a.user === me) return -1;
        if (b.user === me) return 1;
        return a.user.localeCompare(b.user);
      });
    result.scores = game.playerStates
      .map(playerState => calculatePlayerStateScore(game.type, boardData, playerState));
  }

  return result;
}

