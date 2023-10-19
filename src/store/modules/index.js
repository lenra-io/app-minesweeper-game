import { combineReducers } from 'redux';
import { default as gameReducer } from './game';
import { default as lenraReducer } from './lenra';

export const rootReducer = combineReducers({
	lenra: lenraReducer,
	game: gameReducer
});