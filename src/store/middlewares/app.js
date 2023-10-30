import { CREATE_GAME, SET_GAME, gameCreated, routes, setGame, setGameList } from '../modules/app.js';
import { CONNECTED, addRouteListener, callListener, removeRouteListener } from './lenra.js';

export const AppMiddleware = store => {
    let currentGameId = null;
    let openCreatedGame = false;
    return next => action => {
        switch (action.type) {
            case CONNECTED:
                store.dispatch(addRouteListener(routes.games, onGameListChange));
                break;
            case CREATE_GAME:
                store.dispatch(
                    callListener(
                        routes.games,
                        "onCreateGame",
                        {
                            type: action.gameType,
                            difficulty: action.difficulty
                        },
                        onGameCreated
                    )
                );
                break;
        }
        return next(action);
    }

    function onGameListChange(store, data) {
        console.log("Games route changed");
        if (openCreatedGame) {
            // find the new game in the list
            const oldGames = store.getState().app.games;
            const newGame = data.games.find(game => !oldGames.some(oldGame => oldGame.id === game.id));
            store.dispatch(setGame(newGame.id));
            store.dispatch(gameCreated());
            openCreatedGame = false;
        }
        store.dispatch(setGameList(data.games));
    }

    function onGameCreated(store, data) {
        console.log("Game created");
        openCreatedGame = true;
    }

    function onGameChange(store, data) {
        console.log("Game route changed");
    }
}
