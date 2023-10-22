// Game Settings
export const difficulties = {
	easy: {
		width: 9,
		height: 9,
		mineCount: 10
	},
	medium: {
		width: 16,
		height: 16,
		mineCount: 40
	},
	hard: {
		width: 30,
		height: 16,
		mineCount: 99
	}
};

export const types = {
	single: {
		players: 1
	},
	versus: {
		players: 2
	}
};

// Game States
export const GAME = {
	READY: 'ready',
	RUN: 'run',
	WIN: 'win',
	LOSE: 'lose'
};

// Cell States
export const CODES = {
	OPENED: 0,
	NOTHING: -1,
	FLAG: -2,
	QUESTION: -3,
	MINE: -4,
};