import { combineReducers } from 'redux';
import { default as gameReducer } from './game';
import { default as appReducer } from './app';

export const rootReducer = combineReducers({
	app: appReducer,
	game: gameReducer,
});