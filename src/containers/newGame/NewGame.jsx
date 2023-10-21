import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { types, difficulties } from '../../constants';
import { NewGame } from '../../components';
import { createGame, gameCreated, routes } from '../../store/modules/app.js';
import { callListener } from '../../store/middlewares/lenra.js';

const NewGameContainer = () => {
	const dispatch = useDispatch();

	const [type, setType] = useState(types[0]);
	const [difficulty, setDifficulty] = useState(difficulties[0]);
	const creating = useSelector(rootState => rootState.app.creatingGame);

	const onChangeType = useCallback((e) => {
		setType(types.find(type => type.value === e.target.value));
	}, []);

	const onChangeDifficulty = useCallback((e) => {
		setDifficulty(difficulties.find(difficulty => difficulty.value === e.target.value));
	}, []);

	const onCreateGame = useCallback((e) => {
		e.preventDefault();
		dispatch(createGame(type.value, difficulty.value));
	}, [type, difficulty]);

	return (
		<NewGame
			type={type}
			difficulty={difficulty}
			creating={creating}
			onChangeType={onChangeType}
			onChangeDifficulty={onChangeDifficulty}
			onCreateGame={onCreateGame}
		/>
	);
};

export default NewGameContainer;