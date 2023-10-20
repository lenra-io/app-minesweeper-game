import React from 'react';
import { 
	SettingsContainer,
	StatusContainer,
	BoardContainer
} from './containers';
import {
	Wrapper,
	Title
} from './AppStyle';
import AppContainer from './containers/app/App.jsx';

const App = () => {
	return (
		<Wrapper>
			<Title>Minesweeper Game in React</Title>
			<AppContainer />
		</Wrapper>
	);
};

export default App;