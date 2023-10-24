import { Data } from "@lenra/app";
import { initBoard } from "../lib/minesweeper.js";
import { GAME, difficulties } from "../constants.js";

export class Game extends Data {
    /**
     * 
     * @param {string[]} players The players ids
     * @param {string} type The game type
     * @param {string} difficulty The game difficulty
     * @param {number} width The board width
     * @param {number} height The board height
     * @param {number} mineCount The board mine count
     * @param {number[][]} cells The cells values of the board
     * @param {{x: number, y: number}[]} revealedCells The cells revealed positions
     * @param {{x: number, y: number, flag: number}[]} flagedCells The cells revealed positions
     */
    constructor(players, type, difficulty, state, width, height, mineCount, cells, revealedCells, flagedCells) {
        super();
        this.players = players;
        this.type = type;
        this.difficulty = difficulty;
        this.state = state;
        this.width = width;
        this.height = height;
        this.mineCount = mineCount;
        this.cells = cells;
        this.revealedCells = revealedCells;
        this.flagedCells = flagedCells;
    }
}