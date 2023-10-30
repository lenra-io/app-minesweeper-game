import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Board } from '../../components';

const BoardContainer = () => {
	const gameState = useSelector(rootState => rootState.game.gameState);
	const width = useSelector(rootState => rootState.game.width);
	const height = useSelector(rootState => rootState.game.height);

	const onRightClickBoard = useCallback((e) => {
		e.preventDefault();
	}, []);

	if (width===null) {
		return (<p>Loading...</p>);
	}

	return (
		<Board
			width={width}
			height={height}
			state={gameState}
			onRightClickBoard={onRightClickBoard}
		/>
	);
};

export default BoardContainer;