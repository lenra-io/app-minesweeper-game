import { Data } from "@lenra/app";
import { initBoard } from "../lib/minesweeper.js";

export class Game extends Data {
    /**
     * 
     * @param {string} player The player user id
     * @param {number} width The board width
     * @param {number} height The board height
     * @param {number} mineCount The board mine count
     * @param {number[][]} cells The cells values of the board
     * @param {{x: number, y: number}[]} revealedCells The cells revealed positions
     * @param {{x: number, y: number, flag: number}[]} flagedCells The cells revealed positions
     */
    constructor(player, width, height, mineCount) {
        super();
        const creating = !!player;
        this.player = player;
        this.width = width;
        this.height = height;
        this.mineCount = mineCount;
        this.cells = creating ? initBoard(width, height, mineCount) : null;
        this.revealedCells = [];
        this.flagedCells = [];
    }
}