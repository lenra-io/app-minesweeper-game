import { CODES } from '../constants';

const arroundPoint = [
	{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
	{ x: -1, y: 0 }, { x: 1, y: 0 },
	{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }
];

export const initBoard = (width, height, mineCount) => {
	const candidates = Array(width * height).fill().map((v, i) => i);
	const shuffle = [];
	const boardData = [];

	while (candidates.length > width * height - mineCount) {
		const chosen = candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0];
		shuffle.push(chosen);
	}

	for (let i = 0; i < height; i++) {
		const rowData = Array(width).fill(0);
		boardData.push(rowData);
	}

	for (let i = 0; i < shuffle.length; i++) {
		const x = shuffle[i] % width;
		const y = Math.floor(shuffle[i] / width);
		boardData[y][x] = CODES.MINE;
		arroundPoint.forEach(({ x: dx, y: dy }) => {
			const newX = x + dx;
			const newY = y + dy;
			if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
				if (boardData[newY][newX] !== CODES.MINE) {
					boardData[newY][newX] += 1;
				}
			}
		});
	}

	return boardData;
};

export function openCell(revealedCells, boardData, x, y) {
	const newOpenedCells = [{ x, y }];
	const openedCells = [...revealedCells, ...newOpenedCells];
	const cellsToExpand = [];
	if (boardData[y][x] === 0) {
		cellsToExpand.push({ x, y });
	}

	while (cellsToExpand.length > 0) {
		const { x, y } = cellsToExpand.shift();
		openedCells.push({ x, y });
		arroundPoint.forEach(({ x: dx, y: dy }) => {
			const newX = x + dx;
			const newY = y + dy;
			const position = { x: newX, y: newY };
			if (newX >= 0 && newX < boardData[0].length && newY >= 0 && newY < boardData.length) {
				if (!openedCells.some(v => v.x === newX && v.y === newY)) {
					openedCells.push(position);
					newOpenedCells.push(position);
					if (boardData[newY][newX] === 0) {
						cellsToExpand.push(position);
					}
				}
			}
		});
	}

	return newOpenedCells;
};

export const getNextCellCode = (code) => {
	switch (code) {
		case CODES.NOTHING:
			return CODES.FLAG;
		case CODES.MINE:
			return CODES.MINE_FLAG;
		case CODES.FLAG:
			return CODES.QUESTION;
		case CODES.MINE_FLAG:
			return CODES.MINE_QUESTION;
		case CODES.QUESTION:
			return CODES.NOTHING;
		case CODES.MINE_QUESTION:
			return CODES.MINE;
		default:
			return code;
	}
};

export const getFlagIncDec = (code) => {
	switch (code) {
		case CODES.NOTHING:
		case CODES.MINE:
			return 1;
		case CODES.FLAG:
		case CODES.MINE_FLAG:
			return -1;
		default:
			return 0;
	}
};

export const expandOpenedCell = (boardData, x, y) => {
	let openedCellCount = 0;

	// Define function to get mine count
	const getMineCount = (x, y) => {
		let aroundCode = [];
		let mineCount = 0;

		aroundCode = boardData[y - 1] ? aroundCode.concat(boardData[y - 1][x - 1], boardData[y - 1][x], boardData[y - 1][x + 1]) : aroundCode;
		aroundCode = aroundCode.concat(boardData[y][x - 1], boardData[y][x + 1]);
		aroundCode = boardData[y + 1] ? aroundCode.concat(boardData[y + 1][x - 1], boardData[y + 1][x], boardData[y + 1][x + 1]) : aroundCode;

		mineCount = aroundCode.filter(v => [
			CODES.MINE,
			CODES.MINE_FLAG,
			CODES.MINE_QUESTION
		].includes(v)).length;

		return mineCount;
	};

	// Using DFS algorithm to expand
	const dfsSearch = (x, y) => {
		if (boardData[y][x] !== CODES.NOTHING) {
			return;
		}

		boardData[y][x] = getMineCount(x, y);
		openedCellCount++;

		let aroundPoint = [];
		aroundPoint = boardData[y - 1] ? aroundPoint.concat({ x: x - 1, y: y - 1 }, { x, y: y - 1 }, { x: x + 1, y: y - 1 }) : aroundPoint;
		aroundPoint = aroundPoint.concat({ x: x - 1, y }, { x: x + 1, y });
		aroundPoint = boardData[y + 1] ? aroundPoint.concat({ x: x - 1, y: y + 1 }, { x, y: y + 1 }, { x: x + 1, y: y + 1 }) : aroundPoint;

		if (boardData[y][x] === 0) {
			aroundPoint.forEach((v) => {
				dfsSearch(v.x, v.y);
			});
		}
	};

	dfsSearch(x, y);
	return { boardData, openedCellCount };
};