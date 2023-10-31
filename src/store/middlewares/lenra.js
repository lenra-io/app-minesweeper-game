import { LenraApp } from '@lenra/client';

export const CONNECT = 'lenra/CONNECT';
export const CONNECTED = 'lenra/CONNECTED';
export const ADD_ROUTE_LISTENER = 'lenra/ADD_ROUTE_LISTENER';
export const REMOVE_ROUTE_LISTENER = 'lenra/REMOVE_ROUTE_LISTENER';
export const CALL_LISTENER = 'lenra/CALL_LISTENER';

export const connect = () => ({ type: CONNECT });
export const addRouteListener = (path, callBack) => ({ type: ADD_ROUTE_LISTENER, path, callBack });
export const removeRouteListener = (path, callBack) => ({ type: REMOVE_ROUTE_LISTENER, path, callBack });
export const callListener = (path, listener, event, callBack) => ({ type: CALL_LISTENER, path, listener, event, callBack });

const isProd = process.env.NODE_ENV === 'production';

export const LenraMiddleware = store => {
    const app = new LenraApp({
        clientId: "85be8c69-4633-499f-b483-86c7107a4b54",
        isProd,
    });
    /**
     * @type {{[path: string]: {listeners: Array<Function>, route: import("@lenra/client").LenraRoute, data: any}}}
     */
    const routes = {};
    return next => action => {
        let route;
        switch (action.type) {
            case CONNECT:
                const socketParams = {};
                if (!isProd) {
                    const params = new URLSearchParams(location.search);
                    if (params.has('user')) {
                        socketParams.userId = params.get('user');
                    }
                }
                app.connect(socketParams).then(s => {
                    store.dispatch({ type: CONNECTED })
                });
                break;
            case ADD_ROUTE_LISTENER:
                route = routes[action.path];
                if (!route) {
                    route = {
                        listeners: [],
                        data: null,
                        route: app.route(action.path, (data) => {
                            route.data = JSON.parse(JSON.stringify(data));
                            route.listeners.forEach(callBack => {
                                callBack(store, route.data);
                            });
                        })
                    };
                    routes[action.path] = route;
                }
                else {
                    if (route.data !== null) {
                        action.callBack(store, route.data);
                    }
                }
                route.listeners.push(action.callBack);
                break;
            case REMOVE_ROUTE_LISTENER:
                route = routes[action.path];
                if (route) {
                    route.listeners = route.listeners.filter(callBack => callBack !== action.callBack);
                    if (route.listeners.length === 0) {
                        route.route.close();
                        delete routes[action.path];
                    }
                }
                break;
            case CALL_LISTENER:
                route = routes[action.path];
                if (route) {
                    const listener = action.listener.split('.').reduce((acc, cur) => acc[cur], route.data);
                    route.route.callListener({ ...listener, event: action.event }).then(action.callBack);
                }
                break;
        }
        return next(action)
    }
}