import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { types, difficulties } from '../../constants';
import { NewGame } from '../../components';
import { createGame } from '../../store/modules/app.js';

const NewGameContainer = () => {
	const dispatch = useDispatch();

	const [type, setType] = useState(types[0]);
	const [difficulty, setDifficulty] = useState(difficulties[0]);
	const creating = useSelector(rootState => rootState.app.creatingGame);

	const onCreateGame = useCallback((e) => {
		e.preventDefault();
		dispatch(createGame(type.value, difficulty.value));
	}, [type, difficulty]);

	return (
		<NewGame
			type={type}
			difficulty={difficulty}
			creating={creating}
			setType={setType}
			setDifficulty={setDifficulty}
			onCreateGame={onCreateGame}
		/>
	);
};

export default NewGameContainer;