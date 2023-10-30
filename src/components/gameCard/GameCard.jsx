import React from 'react';
import {
	Wrapper
} from './GameCardStyle';
import { difficulties } from '../../constants.js';

const GameCard = ({
	difficulty,
	onClick,
}) => {
	return (
		<Wrapper onClick={onClick}>
			{difficulties.find(d => d.value===difficulty).name}
		</Wrapper>
	);
};

export default GameCard;