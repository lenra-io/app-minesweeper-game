import produce from 'immer';

export const CONNECT = 'lenra/CONNECT';
export const CONNECTED = 'lenra/CONNECTED';

export const connect = () => ({ type: CONNECT });

const initialState = {
	connected: false,
	connecting: false,
	routes: {},
};

export default function(state = initialState, action) {
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