import React from 'react';
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