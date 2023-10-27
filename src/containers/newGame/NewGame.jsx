import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { difficulties } from '../../constants';
import { NewGame } from '../../components';
import { createGame } from '../../store/modules/app.js';

const NewGameContainer = () => {
	const dispatch = useDispatch();

	const [difficulty, setDifficulty] = useState(difficulties[0]);
	const creating = useSelector(rootState => rootState.app.creatingGame);

	const onCreateGame = useCallback((e) => {
		e.preventDefault();
		dispatch(createGame(difficulty.value));
	}, [difficulty]);

	return (
		<NewGame
			difficulty={difficulty}
			creating={creating}
			setDifficulty={setDifficulty}
			onCreateGame={onCreateGame}
		/>
	);
};

export default NewGameContainer;