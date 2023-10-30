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
