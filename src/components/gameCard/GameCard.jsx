import React from 'react';
import {
	Wrapper
} from './GameCardStyle';
import { difficulties, types } from '../../constants.js';

const GameCard = ({
	type,
	difficulty,
	onClick,
}) => {
	return (
		<Wrapper onClick={onClick}>
			{types.find(t => t.value===type).name} - {difficulties.find(d => d.value===difficulty).name}
		</Wrapper>
	);
};

export default GameCard;