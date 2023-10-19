import { LenraApp } from '@lenra/client';
import * as lenra from '../modules/lenra.js';

export const LenraMiddleware = store => {
    const app = new LenraApp({
        clientId: "XXX-XXX-XXX",
    });
    let socket;
    return next => action => {
        switch (action.type) {
            case lenra.CONNECT:
                app.connect().then(s => {
                    socket = s;
                    store.dispatch({ type: lenra.CONNECTED })
                });
                break;
        }
        return next(action)
    }
}