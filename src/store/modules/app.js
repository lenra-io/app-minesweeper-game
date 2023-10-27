import produce from 'immer';
import { CONNECT, CONNECTED } from '../middlewares/lenra.js';

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