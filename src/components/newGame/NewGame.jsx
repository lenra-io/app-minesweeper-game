import React from 'react';
import { MIN_WIDTH, MAX_WIDTH, MIN_HEIGHT, MAX_HEIGHT, MIN_MINES, types, difficulties } from '../../constants';
import { 
	Slider,
	Button
} from '../common';
import {
	Wrapper,
	RadioGroup
} from './NewGameStyle';

const NewGame = ({
	type,
	difficulty,
	creating,
	onChangeType,
	onChangeDifficulty,
	onCreateGame,
}) => {
	return (
		<Wrapper onSubmit={onCreateGame}>
			<RadioGroup>
				{
					types.map(t => (
						<label key={t.value}>
							<input type="radio" name="type" value={t.value} checked={t === type} onChange={onChangeType} />
							{t.name}
						</label>
					))
				}
			</RadioGroup>
			<RadioGroup>
				{
					difficulties.map(d => (
						<label key={d.value}>
							<input type="radio" name="difficulty" value={d.value} checked={d === difficulty} onChange={onChangeDifficulty} />
							{d.name}
						</label>
					))
				}
			</RadioGroup>
			<Button disabled={creating}>Create</Button>
		</Wrapper>
	);
};

export default NewGame;