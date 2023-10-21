import { CREATE_GAME, SET_GAME, gameCreated, routes, setGameList } from '../modules/app.js';
import { setBoardSize, updateBoardData, OPEN_CELL } from '../modules/game.js';
import { CONNECTED, addRouteListener, callListener } from './lenra.js';

export const AppMiddleware = store => {
    let currentGameId = null;
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
                        () => store.dispatch(gameCreated())
                    )
                );
                break;
            case SET_GAME:
                if (currentGameId !== null) {
                    store.dispatch(removeEventListener(routes.game.replace(':id', currentGameId), onGameChange));
                }
                currentGameId = action.gameId;
                if (action.gameId) {
                    store.dispatch(addRouteListener(routes.game.replace(':id', action.gameId), onGameChange));
                }
                break;
            case OPEN_CELL:
                store.dispatch(
                    callListener(
                        routes.game.replace(':id', currentGameId),
                        "onRevealCell",
                        {
                            x: action.x,
                            y: action.y
                        }
                    )
                );
                break;
        }
        return next(action);
    }

    function onGameListChange(store, data) {
        console.log("Games route changed");
        store.dispatch(setGameList(data.games));
    }

    function onGameChange(store, data) {
        console.log("Game route changed");
        store.dispatch(updateBoardData(data.boardData));
        store.dispatch(setBoardSize(data.width, data.height));
    }
}
