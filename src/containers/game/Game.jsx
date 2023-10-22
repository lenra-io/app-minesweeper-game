import React from 'react';
import StatusContainer from '../status/Status.jsx';
import BoardContainer from '../board/Board.jsx';
import { setGame } from '../../store/modules/app.js';
import { useDispatch } from 'react-redux';

const GameContainer = () => {
	const dispatch = useDispatch();

	function onBackToGameList() {
		console.log("onBackToGameList", setGame(null));
		dispatch(setGame(null));
	}

	return (
		<>
			<a href='#' onClick={onBackToGameList}>Back to game list</a>
			<StatusContainer />
			<BoardContainer />
		</>
	);
};

export default GameContainer;