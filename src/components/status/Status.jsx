import React from 'react';
import {
	Wrapper,
	Mine,
	ButtonWrapper,
	RestartButton,
	SettingsButton,
	Timer,
	Score
} from './StatusStyle';

const Status = ({
	leftMineCount,
	mineCount,
	resultEmoji,
	enableSettings,
	elapsedTime,
	scores,
	myTurn,
	onClickRestart,
	onClickSettings
}) => {
	console.log('Status render', scores);
	if (scores) {
		return (
			<Wrapper>
				<Score player={0} myTurn={myTurn}>{scores[0]}</Score>
				<Mine align="center">💣 {leftMineCount} / {mineCount}</Mine>
				<Score player={1} myTurn={!myTurn}>{scores[1]}</Score>
			</Wrapper>
		);
	}
	return (
		<Wrapper>
			<Mine>💣 {leftMineCount} / {mineCount}</Mine>
			<ButtonWrapper align="center">
				<RestartButton title="Restart" onClick={onClickRestart}>{resultEmoji}</RestartButton>
				{enableSettings && <SettingsButton title="Settings" onClick={onClickSettings}>⚙️</SettingsButton>}
			</ButtonWrapper>
			<Timer>🕙 {elapsedTime}</Timer>
		</Wrapper>
	);
};

export default Status;