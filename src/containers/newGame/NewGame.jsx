import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MIN_WIDTH, MIN_HEIGHT, MIN_MINES, types, difficulties } from '../../constants';
import { hideSettings, setGame, restartGame } from '../../store/modules/game';
import { NewGame } from '../../components';
import { creatingGame, gameCreated, routes } from '../../store/modules/app.js';
import { callListener } from '../../store/middlewares/lenra.js';

const NewGameContainer = () => {
	const dispatch = useDispatch();

	const [type, setType] = useState(types[0]);
	const [difficulty, setDifficulty] = useState(difficulties[0]);
	const creating = useSelector(rootState => rootState.app.creatingGame);
	const createGameListener = useSelector(rootState => rootState.app.createGameListener);

	const onChangeType = useCallback((e) => {
		setType(types.find(type => type.value === e.target.value));
	}, []);

	const onChangeDifficulty = useCallback((e) => {
		setDifficulty(difficulties.find(difficulty => difficulty.value === e.target.value));
	}, []);

	const onCreateGame = useCallback((e) => {
		e.preventDefault();
		dispatch(creatingGame());
		dispatch(
			callListener(
				routes.games,
				{
					...createGameListener,
					event: {
						type: type.value,
						difficulty: difficulty.value
					}
				},
				() => dispatch(gameCreated())
			)
		);
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