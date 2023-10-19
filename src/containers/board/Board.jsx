import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Board } from '../../components';

const BoardContainer = () => {
	const enableSettings = useSelector(rootState => rootState.game.enableSettings);
	const width = useSelector(rootState => rootState.game.width);
	const height = useSelector(rootState => rootState.game.height);

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