import { Api } from '@lenra/app';
import { Game, PlayerState } from '../classes/Game.js';
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
 * @param {{me: string}} props 
 * @param {*} event 
 * @param {Api} api 
 */
export async function createGame(props, event, api) {
    const { type, difficulty } = event;
    const { players } = types[type];
    const { width, height, mineCount } = difficulties[difficulty];
    const playerList = [props.me];
    const transaction = await api.data.startTransaction();
    if (players > 1) {
        // Search for waiting players
        const waitingPlayerColl = transaction.coll(WaitingPlayer);
        // Check if there is a matching waiting player for the current user
        if (await waitingPlayerColl.find({ user: playerList[0], type, difficulty }).then(players => players.length > 0)) return transaction.abort();
        const waitingPlayers = await waitingPlayerColl.find({ type, difficulty });
        // Check if there is enough waiting players
        if (players > waitingPlayers.length + 1) {
            // Create a new waiting player
            await waitingPlayerColl.createDoc(new WaitingPlayer(playerList[0], type, difficulty));
            return transaction.commit();
        }

        // Add the players
        while (playerList.length < players) {
            const waitingPlayer = waitingPlayers.pop();
            playerList.push(waitingPlayer.user);
            await waitingPlayerColl.deleteDoc(waitingPlayer);
        }
        // Random positions in playerList
        playerList.sort(() => Math.random() - 0.5);
    }
    const game = new Game(
        playerList,
        type,
        difficulty,
        GAME.READY,
        width,
        height,
        mineCount,
        initBoard(width, height, mineCount),
        playerList,
        playerList.map(player => new PlayerState(player, [], []))
    );
    await transaction.coll(Game).createDoc(game);
    await transaction.commit();
}

/**
 * Reveal a cell
 * @param {{me: string, game: string}} props
 * @param {{position: CellPosition}} event
 * @param {Api} api
 */
export async function revealCell(props, event, api) {
    const { game: gameId, me } = props;
    const { x, y } = event;
    const transaction = await api.data.startTransaction();
    const coll = transaction.coll(Game);
    const game = await coll.getDoc(gameId);
    const currentPlayer = game.nextPlayers.shift();
    const playerState = game.playerStates.find(({ user }) => user === me);
    const revealedCells = game.playerStates.flatMap(state => state.revealedCells);

    if (![GAME.READY, GAME.RUN].includes(game.state) ||
        currentPlayer !== me ||
        revealedCells.some(matchPoint(x, y)) ||
        playerState.flagedCells.some(matchPoint(x, y))) {
        return transaction.abort();
    }

    // TODO: manage removing flag when revealing a cell

    // check if cell is a mine
    if (game.cells[y][x] === CODES.MINE) {
        game.state = GAME.FINISHED;
        // reveal all mines
        game.cells.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === CODES.MINE) playerState.revealedCells.push({ x, y });
            });
        });
    }
    else {
        // check if game is over
        const newOpenedCells = openCell(revealedCells, game.cells, x, y);
        playerState.revealedCells.push(...newOpenedCells);
        if (revealedCells.length + newOpenedCells.length === game.width * game.height - game.mineCount) {
            game.state = GAME.FINISHED;
        }
    }
    // Make the current player the last one
    game.nextPlayers.push(currentPlayer);

    await coll.updateDoc(game);
    await transaction.commit();
}

/**
 * Reveal a cell
 * @param {{me: string, game: string}} props
 * @param {{position: CellPosition}} event
 * @param {Api} api
 */
export async function rotateCellFlag(props, event, api) {
    const { game: gameId, me } = props;
    const { x, y } = event;
    const transaction = await api.data.startTransaction();
    const coll = transaction.coll(Game);
    const game = await coll.getDoc(gameId);
    const playerState = game.playerStates.find(({ user }) => user === me);
    const revealedCells = game.playerStates.flatMap(state => state.revealedCells);

    if (![GAME.READY, GAME.RUN].includes(game.state) || revealedCells.some(matchPoint(x, y))) return transaction.abort();

    const flagedCellIndex = playerState.flagedCells.findIndex(({ x: cx, y: cy }) => cx === x && cy === y);
    if (flagedCellIndex !== -1) {
        const flagedCell = playerState.flagedCells[flagedCellIndex];
        if (flagedCell.flag === CODES.FLAG) {
            flagedCell.flag = CODES.QUESTION;
        }
        else {
            playerState.flagedCells.splice(flagedCellIndex, 1);
        }
    } else {
        playerState.flagedCells.push({ x, y, flag: CODES.FLAG });
    }
    await coll.updateDoc(game);
    await transaction.commit();
}

function matchPoint(x, y) {
    return ({ x: cx, y: cy }) => cx === x && cy === y;
}
