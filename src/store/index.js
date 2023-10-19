import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './modules';
import { LenraMiddleware } from './middlewares/lenra.js';

const DEBUG = process.env.NODE_ENV === 'development';

export default createStore(
	rootReducer,
	DEBUG && composeWithDevTools(),
	applyMiddleware(LenraMiddleware)
);