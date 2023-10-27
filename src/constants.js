// Game Settings
export const difficulties = [
	{
		name: "Easy",
		value: "easy"
	},
	{
		name: "Medium",
		value: "medium"
	},
	{
		name: "Hard",
		value: "hard"
	}
];

export const MIN_WIDTH = 9;
export const MAX_WIDTH = 20;
export const MIN_HEIGHT = 9;
export const MAX_HEIGHT = 20;
export const MIN_MINES = 10;

// Design Settings
export const CELL_SIZE = 42;
export const CELL_MARGIN = 2;

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
	LOADING: -5
};