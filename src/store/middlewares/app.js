import { CREATE_GAME, SET_GAME, gameCreated, routes, setGame, setGameList } from '../modules/app.js';
import { updateBoardData, OPEN_CELL, ROTATE_CELL_FLAG, updateAttributes, updateStatus, updateScore } from '../modules/game.js';
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
            case SET_GAME:
                if (currentGameId !== null) {
                    store.dispatch(removeRouteListener(routes.game.replace(':id', currentGameId), onGameChange));
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
            case ROTATE_CELL_FLAG:
                store.dispatch(
                    callListener(
                        routes.game.replace(':id', currentGameId),
                        "onRotateCellFlag",
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
        if (openCreatedGame) {
            // find the new game in the list
            const oldGames = store.getState().app.games;
            const newGame = data.games.find(game => !oldGames.some(oldGame => oldGame.id === game.id));
            store.dispatch(setGame(newGame.id));
            openCreatedGame = false;
        }
        store.dispatch(setGameList(data.games));
    }

    function onGameCreated() {
        console.log("Game created");
        openCreatedGame = true;
        store.dispatch(gameCreated());
    }

    function onGameChange(store, data) {
        console.log("Game route changed");
        store.dispatch(updateBoardData(data.boardData));
        store.dispatch(updateAttributes(data.width, data.height, data.mineCount));
        store.dispatch(updateStatus(data.state, data.myTurn, data.remainingFlags));
        store.dispatch(updateScore(data.scores));
    }
}
