import { Data } from "@lenra/app";

export class WaitingPlayer extends Data {
    /**
     * @param {string} user The user id
     * @param {string} type The game type
     * @param {string} difficulty The game difficulty
     */
    constructor(user, type, difficulty) {
        super();
        this.user = user;
        this.type = type;
        this.difficulty = difficulty;
    }
}