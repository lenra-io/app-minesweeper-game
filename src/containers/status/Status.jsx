import React, { useEffect, useCallback } from 'react';
import { GAME } from '../../constants';
import { Status } from '../../components';

const showSettings = () => { throw new Error("Not implemented"); };
const restartGame = () => { throw new Error("Not implemented"); };
const updateElapsedTime = () => { throw new Error("Not implemented"); };

const StatusContainer = () => {
	const enableSettings = false;
	// const gameState = useSelector(rootState => rootState.control.gameState);
	// const enableTimer = useSelector(rootState => rootState.control.enableTimer);
	// const elapsedTime = useSelector(rootState => rootState.control.elapsedTime);
	// const mineCount = useSelector(rootState => rootState.control.mineCount);
	// const flagCount = useSelector(rootState => rootState.control.flagCount);
	const gameState = GAME.READY;
	const enableTimer = false;
	const elapsedTime = 0;
	const mineCount = 0;
	const flagCount = 0;

	useEffect(() => {
		let gameTimer;

		if (enableTimer) {
			gameTimer = setInterval(() => {
				updateElapsedTime();
			}, 1000);
		}

		return () => {
			clearInterval(gameTimer);
		};
	}, [enableTimer]);

	const getResultEmoji = useCallback((gameState) => {
		switch (gameState) {
			case GAME.WIN:
				return '😎';
			case GAME.LOSE:
				return '😢';
			default:
				return '😄';
		}
	}, [gameState]);

	const onClickRestart = useCallback(() => {
		restartGame();
	}, []);

	const onClickSettings = useCallback(() => {
		showSettings();
	}, []);

	return (
		<>
			{!enableSettings &&
			<Status
				leftMineCount={mineCount - flagCount}
				mineCount={mineCount}
				resultEmoji={getResultEmoji(gameState)}
				enableSettings={gameState !== GAME.RUN}
				elapsedTime={elapsedTime.toString().padStart(3, '0')}
				onClickRestart={onClickRestart}
				onClickSettings={onClickSettings}
			/>}
		</>
	);
};

export default StatusContainer;