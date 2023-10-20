import produce from 'immer';
import { CONNECT, CONNECTED } from '../middlewares/lenra.js';

export const routes = {
	games: '/games',
	game: '/games/:id/board',
};

export const SET_GAME = 'app/SET_GAME';
export const SET_GAME_LIST = 'app/REFRESH_GAME_LIST';
export const SET_CREATE_GAME_LISTENER = 'app/SET_CREATE_GAME_LISTENER';

export const setGame = (gameId) => ({ type: SET_GAME, gameId });
export const setGameList = (games) => ({ type: SET_GAME_LIST, games });
export const setCreateGameListener = (listener) => ({ type: SET_CREATE_GAME_LISTENER, listener });

const initialState = {
	connected: false,
	connecting: false,
	currentGameId: null,
	games: null,
	createGameListener: null,
	creatingGame: false,
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
		case SET_GAME:
			return produce(state, draft => {
				draft.currentGameId = action.gameId;
			});
		case SET_GAME_LIST:
			return produce(state, draft => {
				draft.games = action.games;
			});
		case SET_CREATE_GAME_LISTENER:
			return produce(state, draft => {
				draft.createGameListener = action.listener;
			});
		case CONNECTED:

		default:
			return state;
	}
}