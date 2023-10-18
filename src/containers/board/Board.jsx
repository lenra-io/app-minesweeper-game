import React, { useCallback, useState } from 'react';
import { Board } from '../../components';
import { MIN_HEIGHT, MIN_WIDTH } from '../../../app-lenra/src/constants.js';

const BoardContainer = ({gameId}) => {

	const enableSettings = false;
	const width = MIN_WIDTH;
	const height = MIN_HEIGHT;

	const onRightClickBoard = useCallback((e) => {
		e.preventDefault();
	}, []);

	return (
		<>
			{!enableSettings &&
			<Board
				width={width}
				height={height}
				onRightClickBoard={onRightClickBoard}
			/>}
		</>
	);
};

export default BoardContainer;