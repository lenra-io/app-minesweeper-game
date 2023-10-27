import React from 'react';
import { difficulties } from '../../constants';
import { 
	Button
} from '../common';
import {
	Wrapper,
	RadioGroup,
	Radio
} from './NewGameStyle';

const NewGame = ({
	difficulty,
	creating,
	setDifficulty,
	onCreateGame,
}) => {
	return (
		<Wrapper>
			<RadioGroup>
				{
					difficulties.map(d => (
						<Radio key={d.value} selected={d === difficulty} onClick={() => setDifficulty(d)}>
							{d.name}
						</Radio>
					))
				}
			</RadioGroup>
			<Button disabled={creating} onClick={onCreateGame}>Create</Button>
		</Wrapper>
	);
};

export default NewGame;