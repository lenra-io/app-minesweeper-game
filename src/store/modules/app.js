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
export const createGame = (difficulty) => ({ type: CREATE_GAME, difficulty });
export const gameCreated = () => ({ type: GAME_CREATED });
export const setGame = (gameId) => ({ type: SET_GAME, gameId });
export const setGameList = (games) => ({ type: SET_GAME_LIST, games });

const initialState = {
	connected: false,
	connecting: false,
	newGame: false,
	creatingGame: false,
	currentGameId: null,
	games: null,
	createGameListener: null,
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
		case NEW_GAME:
			return produce(state, draft => {
				draft.newGame = true;
			});
		case CREATE_GAME:
			return produce(state, draft => {
				draft.creatingGame = true;
			});
		case GAME_CREATED:
			return produce(state, draft => {
				draft.creatingGame = false;
				draft.newGame = false;
			});
		case SET_GAME:
			return produce(state, draft => {
				draft.currentGameId = action.gameId;
			});
		case SET_GAME_LIST:
			return produce(state, draft => {
				draft.games = action.games;
			});
		default:
			return state;
	}
}