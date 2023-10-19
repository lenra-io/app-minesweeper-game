import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideSettings, setGame, restartGame } from '../../store/modules/game';
import { Settings } from '../../components';
import { connect } from '../../store/modules/lenra.js';

const AppContainer = () => {
	const dispatch = useDispatch();
	const connecting = useSelector(rootState => rootState.lenra.connecting);
	const connected = useSelector(rootState => rootState.lenra.connected);

	const onConnect = useCallback((e) => {
		dispatch(connect());
	}, []);

	if (!connecting && !connected) {
		return (
			<button onClick={onConnect}>Connect</button>
		);
	}
	else if (connecting) {
		return (
			<div>Loading...</div>
		);
	}

	return (
		<div>Connected</div>
	);
};

export default AppContainer;