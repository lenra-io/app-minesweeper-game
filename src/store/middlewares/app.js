import { SET_GAME, routes, setCreateGameListener, setGameList } from '../modules/app.js';
import { CONNECTED, addRouteListener } from './lenra.js';

export const AppMiddleware = store => {
    return next => action => {
        switch (action.type) {
            case CONNECTED:
                store.dispatch(addRouteListener(routes.games, onGamesChange));
                break;
            case SET_GAME:
                if (action.gameId) {
                    store.dispatch(addRouteListener(routes.game.replace(':id', action.gameId), (store, data) => {
                        console.log("Game route changed");
                        // store.dispatch(setGame(data));
                    }));
                }
                else {

                }
                break;
        }
        return next(action);
    }

    function onGamesChange(store, data) {
        console.log("Games route changed");
        store.dispatch(setGameList(data.games));
        store.dispatch(setCreateGameListener(data.onCreateGame));
    }

    function onGameChange(store, data) {
        console.log("Game route changed");
        store.dispatch(lenra.setGame(data));
    }
}