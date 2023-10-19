import React from 'react';
import { CellContainer } from '../../containers';
import {
	Wrapper
} from './GameCardStyle';

const GameCard = ({
	id,
	onClick,
}) => {
	return (
		<Wrapper key={id} onClick={onClick}>
			Game {id}
		</Wrapper>
	);
};

export default GameCard;