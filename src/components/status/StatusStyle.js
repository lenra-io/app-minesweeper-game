import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	font-size: 18px;
	margin-top: 20px;
`;

export const Mine = styled.div`
	flex: ${flex};
	text-align: center;
`;

export const ButtonWrapper = styled.div`
	flex: ${flex};
	text-align: center;
`;

export const RestartButton = styled.span`
	cursor: pointer;
`;

export const SettingsButton = styled.span`
	cursor: pointer;
`;

export const Timer = styled.div`
	flex: ${flex};
	text-align: center;
`;

export const Score = styled.div`
	flex: ${flex};
	text-align: center;
	padding: 4px 8px;
	background-color: ${({ player, myTurn }) => {
		switch (player) {
			case 0:
				return myTurn ? 'royalblue' : 'lightskyblue';
			case 1:
				return myTurn ? '#9b1c31' : '#ffcccb';
		}
	}};
	color: ${({ myTurn }) => myTurn ? 'white' : 'black'};
	font-weight: ${({ myTurn }) => myTurn ? 'bold' : 'normal'};
`;

function flex({align}) {
	switch (align) {
		case 'center':
			return "1";
		default:
			return "0 auto";
	}
}
