import React, { useState, useEffect, useCallback } from 'react';
import { MIN_WIDTH, MIN_HEIGHT, MIN_MINES } from '../../../app-lenra/src/constants';
import { Settings } from '../../components';


const hideSettings = () => { throw new Error("Not implemented"); };
const setGame = () => { throw new Error("Not implemented"); };
const restartGame = () => { throw new Error("Not implemented"); };

const SettingsContainer = () => {
	const enableSettings = false;

	const [width, setWidth] = useState(MIN_WIDTH);
	const [height, setHeight] = useState(MIN_HEIGHT);
	const [mineCount, setMineCount] = useState(MIN_MINES);

	useEffect(() => {
		const maxMineCount = (width - 1) * (height - 1);

		if (mineCount > maxMineCount) {
			setMineCount(maxMineCount)
		}
	}, [width, height, mineCount]);

	const onChangeWidth = useCallback((e) => {
		setWidth(parseInt(e.target.value));
	}, []);

	const onChangeHeight = useCallback((e) => {
		setHeight(parseInt(e.target.value));
	}, []);

	const onChangeMines = useCallback((e) => {
		setMineCount(parseInt(e.target.value));
	}, []);

	const onClickSet = useCallback(() => {
		setGame(width, height, mineCount);
		restartGame();
		hideSettings();
	}, [width, height, mineCount]);

	return (
		<>
			{enableSettings &&
			<Settings
				width={width}
				height={height}
				mineCount={mineCount}
				maxMineCount={(width - 1) * (height - 1)}
				onChangeWidth={onChangeWidth}
				onChangeHeight={onChangeHeight}
				onChangeMines={onChangeMines}
				onClickSet={onClickSet}
			/>}
		</>
	);
};

export default SettingsContainer;