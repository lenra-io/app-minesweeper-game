import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideSettings, setGame, restartGame } from '../../store/modules/game';
import { Settings } from '../../components';

const GameContainer = () => {
	const dispatch = useDispatch();
	const currentGameId = useSelector(rootState => rootState.app.currentGameId);

	return (
		<>
			{/* <SettingsContainer />
			<StatusContainer />
			<BoardContainer /> */}
		</>
	);
};

export default GameContainer;