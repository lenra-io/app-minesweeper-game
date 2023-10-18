import React, { useEffect, useState, } from 'react';
import { LenraApp } from '@lenra/client';
import {
	SettingsContainer,
	StatusContainer,
	BoardContainer
} from './containers';
import {
	Wrapper,
	Title
} from './AppStyle';
import Button from './components/common/Button.js';
import GameCard from './components/gameCard/GameCard.jsx';
import { Board } from './components/index.js';


const App = () => {
	const [connected, setConnected] = useState(false);
	const [data, setData] = useState(null);
	const [route, setRoute] = useState(null);
	const [currentGame, setCurrentGame] = useState(null);

	function createGame() {
		route.callListener(data.onCreateGame)
	}

	useEffect(() => {
		/** @type {LenraApp} */
		const lenraApp = window.lenraApp;
		console.log("Connecting to Lenra...");
		lenraApp.connect()
			.then(() => {
				console.log("Connected to Lenra");
				setConnected(true);
				setRoute(lenraApp.route("/games", (data) => {
					setData(data);
				}));
			})
			.catch((error) => {
				console.error("Failed to connect to Lenra", error);
				setConnected(false);
			});
	}, []);

	if (!connected) {
		return (
			<Wrapper>
				<Title>Connecting to Lenra...</Title>
			</Wrapper>
		);
	}
	if (data===null) {
		return (
			<Wrapper>
				<Title>Loading games...</Title>
			</Wrapper>
		);
	}

	if (currentGame) {
		return (
			<Wrapper>
				<StatusContainer gameId={currentGame} />
				<Board gameId={currentGame} />
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			{
				data.games.map((game) => (
					<GameCard key={game.id} id={game.id} onClick={() => setCurrentGame(game.id)}/>
				))
			}
			<Button onClick={createGame}>Create game</Button>
		</Wrapper>
	);
};

export default App;