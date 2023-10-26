import produce from 'immer';
import { CONNECT, CONNECTED } from '../middlewares/lenra.js';

export const routes = {
	games: '/games',
	game: '/games/:id',
};

export const NEW_GAME = 'app/NEW_GAME';
export const CREATE_GAME = 'app/CREATE_GAME';
export const GAME_CREATED = 'app/GAME_CREATED';
export const SET_GAME = 'app/SET_GAME';
export const SET_GAME_LIST = 'app/REFRESH_GAME_LIST';

export const newGame = () => ({ type: NEW_GAME });
export const createGame = (type, difficulty) => ({ type: CREATE_GAME, gameType: type, difficulty });
export const gameCreated = () => ({ type: GAME_CREATED });
export const setGame = (gameId) => ({ type: SET_GAME, gameId });
export const setGameList = (games) => ({ type: SET_GAME_LIST, games });

const initialState = {
	connected: false,
	connecting: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case CONNECT:
			return produce(state, draft => {
				draft.connecting = true;
			});
		case CONNECTED:
			return produce(state, draft => {
				draft.connecting = false;
				draft.connected = true;
			});
		default:
			return state;
	}
}