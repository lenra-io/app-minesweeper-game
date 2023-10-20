import { LenraApp } from '@lenra/client';

export const CONNECT = 'lenra/CONNECT';
export const CONNECTED = 'lenra/CONNECTED';
export const LISTEN_ROUTE = 'lenra/LISTEN_ROUTE';
export const CALL_LISTENER = 'lenra/CALL_LISTENER';

export const connect = () => ({ type: CONNECT });
export const listenRoute = (path, callBack) => ({ type: LISTEN_ROUTE, path, callBack });
export const callListener = (path, listener, callBack) => ({ type: CALL_LISTENER, path, listener, callBack });

export const LenraMiddleware = store => {
    const app = new LenraApp({
        clientId: "XXX-XXX-XXX",
    });
    /**
     * @type {{[path: string]: {listeners: Array<Function>, route: import("@lenra/client").LenraRoute}}}
     */
    const routes = {};
    return next => action => {
        let route;
        switch (action.type) {
            case CONNECT:
                app.connect().then(s => {
                    store.dispatch({ type: CONNECTED })
                });
                break;
            case LISTEN_ROUTE:
                route = routes[action.path];
                if (!route) {
                    console.log("Listen route", action.path);
                    route = {
                        listeners: [],
                        route: app.route(action.path, (data) => {
                            data = JSON.parse(JSON.stringify(data));
                            route.listeners.forEach(callBack => {
                                callBack(store, data);
                            });
                        })
                    };
                    routes[action.path] = route;
                }
                else {
                    if (route.route.json) {
                        const data = JSON.parse(JSON.stringify(route.route.json));
                        action.callBack(store, data);
                    }
                }
                route.listeners.push(action.callBack);
                break;
            case CALL_LISTENER:
                route = routes[action.path];
                if (route) {
                    route.route.callListener(action.listener).then(action.callBack);
                }
                break;
        }
        return next(action)
    }
}