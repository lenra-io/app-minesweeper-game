import { LenraApp } from '@lenra/client';

export const CONNECT = 'lenra/CONNECT';
export const CONNECTED = 'lenra/CONNECTED';

export const connect = () => ({ type: CONNECT });

export const LenraMiddleware = store => {
    const app = new LenraApp({
        clientId: "XXX-XXX-XXX",
    });
    return next => action => {
        switch (action.type) {
            case CONNECT:
                app.connect().then(s => {
                    store.dispatch({ type: CONNECTED })
                });
                break;
        }
        return next(action)
    }
}