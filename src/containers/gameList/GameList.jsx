import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newGame, setGame } from '../../store/modules/app.js';
import GameCard from '../../components/gameCard/GameCard.jsx';
import Button from '../../components/common/Button.js';

const GameListContainer = () => {
	const dispatch = useDispatch();
	const games = useSelector(rootState => rootState.app.games);

	const onCreateGame = useCallback(() => {
			dispatch(newGame());
	}, []);
	
	if (games === null) {
		return (
			<div>Loading...</div>
		);
	}

	return (
		<>
		<ul>
			{
				games.map((game) => <GameCard key={game.id} id={game.id} type={game.type} difficulty={game.difficulty} onClick={() => dispatch(setGame(game.id))} />)
			}
		</ul>
		<Button onClick={onCreateGame}>Create game</Button>
		</>
	);
};

export default GameListContainer;