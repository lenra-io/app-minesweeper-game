import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/common/Button.js';
import { connect } from '../../store/middlewares/lenra.js';
import SettingsContainer from '../settings/Settings.jsx';
import StatusContainer from '../status/Status.jsx';
import BoardContainer from '../board/Board.jsx';

const AppContainer = () => {
	const dispatch = useDispatch();
	const connecting = useSelector(rootState => rootState.app.connecting);
	const connected = useSelector(rootState => rootState.app.connected);

	const onConnect = useCallback((e) => {
		dispatch(connect());
	}, []);

	if (!connecting && !connected) {
		return (
			<Button onClick={onConnect}>Connect</Button>
		);
	}
	else if (connecting) {
		return (
			<div>Loading...</div>
		);
	}
	return (
		<>
			<SettingsContainer />
			<StatusContainer />
			<BoardContainer />
		</>
	);
};

export default AppContainer;