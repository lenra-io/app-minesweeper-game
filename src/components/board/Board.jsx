import React, { useEffect, useState } from 'react';
import { CellContainer } from '../../containers';
import {
	Wrapper
} from './BoardStyle';

const Board = (props) => {
	const [data, setData] = useState(null);
	const [route, setRoute] = useState(null);
	console.log("props", props);

	useEffect(() => {
		/** @type {LenraApp} */
		const lenraApp = window.lenraApp;
		setRoute(lenraApp.route(`/games/${props.gameId}/board`, (data) => {
			setData(data);
		}));
	}, []);

	const onRightClickBoard = (e) => {
		e.preventDefault();
	};

	if (data===null) {
		return (
			<Wrapper>
				<p>Loading board...</p>
			</Wrapper>
		);
	}

	return (
		<Wrapper widthSize={data.width} onContextMenu={onRightClickBoard}>
			{Array(data.width * data.height).fill().map((v, i) => 
				<CellContainer key={i} x={i % data.width} y={Math.floor(i / data.width)} />
			)}
		</Wrapper>
	);
};

export default Board;