import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GAME } from '../../constants';
import { restartGame, updateElapsedTime } from '../../store/modules/game';
import { Status } from '../../components';

const StatusContainer = () => {
	const dispatch = useDispatch();
	const gameState = useSelector(rootState => rootState.game.gameState);
	const enableTimer = useSelector(rootState => rootState.game.enableTimer);
	const elapsedTime = useSelector(rootState => rootState.game.elapsedTime);
	const mineCount = useSelector(rootState => rootState.game.mineCount);
	const remainingFlags = useSelector(rootState => rootState.game.remainingFlags);
	const scores = useSelector(rootState => rootState.game.scores);
	const myTurn = useSelector(rootState => rootState.game.myTurn);

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
		<Status
			leftMineCount={remainingFlags}
			mineCount={mineCount}
			resultEmoji={getResultEmoji(gameState)}
			elapsedTime={elapsedTime.toString().padStart(3, '0')}
			scores={scores}
			myTurn={myTurn}
			onClickRestart={onClickRestart}
			onClickSettings={onClickSettings}
		/>
	);
};

export default StatusContainer;