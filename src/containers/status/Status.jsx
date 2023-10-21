import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GAME } from '../../constants';
import { restartGame, updateElapsedTime } from '../../store/modules/game';
import { Status } from '../../components';

const StatusContainer = () => {
	const dispatch = useDispatch();
	const gameState = useSelector(rootState => rootState.game.gameState);
	const enableTimer = useSelector(rootState => rootState.game.enableTimer);
	const elapsedTime = useSelector(rootState => rootState.gameapsedTime);
	const mineCount = useSelector(rootState => rootState.gameneCount);
	const flagCount = useSelector(rootState => rootState.game.flagCount);

	useEffect(() => {
		let gameTimer;

		if (enableTimer) {
			gameTimer = setInterval(() => {
				dispatch(updateElapsedTime());
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
		dispatch(restartGame());
	}, []);

	const onClickSettings = useCallback(() => {
		dispatch(showSettings());
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