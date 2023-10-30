import React from 'react';
import { difficulties, types } from '../../constants';
import { 
	Button
} from '../common';
import {
	Wrapper,
	RadioGroup,
	Radio
} from './NewGameStyle';

const NewGame = ({
	type,
	difficulty,
	creating,
	setType,
	setDifficulty,
	onCreateGame,
}) => {
	return (
		<Wrapper>
			<RadioGroup>
				{
					types.map(t => (
						<Radio key={t.value} selected={t === type} onClick={() => setType(t)}>
							{t.name}
						</Radio>
					))
				}
			</RadioGroup>
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