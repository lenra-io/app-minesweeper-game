import { Api } from '@lenra/app';
import { Game } from '../classes/Game.js';
import { CODES, GAME, difficulties, types } from '../constants.js';
import { initBoard, openCell } from '../lib/minesweeper.js';
import { WaitingPlayer } from '../classes/WaitingPlayer.js';

/**
 * @typedef {Object} CellPosition
 * @property {number} x
 * @property {number} y
 */

/**
 * Create a new game
 * @param {*} props 
 * @param {*} event 
 * @param {Api} api 
 */
export async function createGame(_props, event, api) {
    const { type, difficulty } = event;
    const { players } = types[type];
    const { width, height, mineCount } = difficulties[difficulty];
    const playerList = ["@me"];
    // TODO: handle transaction
    // const transaction = await api.data.startTransaction();
    if (players > 1) {
        // Search for waiting players
        const waitingPlayerColl = api.data.coll(WaitingPlayer);
        // Check if there is a matching waiting player for the current user
        if (await waitingPlayerColl.find({ user: "@me", type, difficulty }).then(players => players.length > 0)) return;
            // return transaction.abort();
        const waitingPlayers = await waitingPlayerColl.find({ type, difficulty });
        // Check if there is enough waiting players
        if (players>waitingPlayers.length + 1) return;
            // return transaction.abort();

        // Add the players
        while (playerList.length < players) {
            const waitingPlayer = waitingPlayers.pop();
            playerList.push(waitingPlayer.user);
            await waitingPlayerColl.deleteDoc(waitingPlayer);
        }
        // await transaction.commit();
    }
    console.log("create game", playerList);
    const game = new Game(
        playerList,
        type,
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

/**
 * Reveal a cell
 * @param {{game: string}} props
 * @param {{position: CellPosition}} event
 * @param {Api} api
 */
export async function revealCell(props, event, api) {
    const { game: gameId } = props;
    const { x, y } = event;
    const transaction = await api.data.startTransaction();
    const coll = transaction.coll(Game);
    const game = await coll.getDoc(gameId);

    if (game.revealedCells.some(matchPoint(x, y)) || game.flagedCells.some(matchPoint(x, y))) return transaction.abort();

    // check if cell is a mine
    if (game.cells[y][x] === CODES.MINE) {
        game.state = GAME.LOSE;
        // reveal all mines
        game.cells.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === CODES.MINE) game.revealedCells.push({ x, y });
            });
        });
    }
    else {
        // check if game is over
        const newOpenedCells = openCell(game.revealedCells, game.cells, x, y);
        game.revealedCells.push(...newOpenedCells);
        if (game.revealedCells.length === game.width * game.height - game.mineCount) {
            game.state = GAME.WIN;
        }
    }

    await coll.updateDoc(game);
    await transaction.commit();
}

/**
 * Reveal a cell
 * @param {{game: string}} props
 * @param {{position: CellPosition}} event
 * @param {Api} api
 */
export async function rotateCellFlag(props, event, api) {
    const { game: gameId } = props;
    const { x, y } = event;
    const transaction = await api.data.startTransaction();
    const coll = transaction.coll(Game);
    const game = await coll.getDoc(gameId);
    const flagedCellIndex = game.flagedCells.findIndex(({ x: cx, y: cy }) => cx === x && cy === y);
    if (flagedCellIndex !== -1) {
        const flagedCell = game.flagedCells[flagedCellIndex];
        if (flagedCell.flag === CODES.FLAG) {
            flagedCell.flag = CODES.QUESTION;
        }
        else {
            game.flagedCells.splice(flagedCellIndex, 1);
        }
    } else {
        game.flagedCells.push({ x, y, flag: CODES.FLAG });
    }
    await coll.updateDoc(game);
    await transaction.commit();
}

function matchPoint(x, y) {
    return ({ x: cx, y: cy }) => cx === x && cy === y;
}
