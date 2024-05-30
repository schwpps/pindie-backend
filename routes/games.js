const gamesRouter = require('express').Router();

const {
    findAllGames,
    createGame,
    findGameById,
    checkIsVoteRequest,
    updateGame,
    deleteGame,
    checkEmptyFields,
    checkIfCategoriesAvaliable,
    checkIfUsersAreSafe,
    checkIsGameExists,
} = require('../middlewares/games');
const { sendAllGames, sendGameCreated, sendGameById, sendGameUpdated, sendGameDeleted } = require('../controllers/games');
const { checkAuth } = require('../middlewares/auth');

gamesRouter.get('/games', findAllGames, sendAllGames);
gamesRouter.get('/games/:id', findGameById, sendGameById);
gamesRouter.post('/games', findAllGames, checkIsGameExists, checkIfCategoriesAvaliable, checkEmptyFields, checkAuth, createGame, sendGameCreated);
gamesRouter.delete('/games/:id', checkAuth, findGameById, deleteGame, sendGameDeleted);
gamesRouter.put(
    '/games/:id',
    findGameById,
    checkIsVoteRequest,
    checkIfUsersAreSafe,
    checkIfCategoriesAvaliable,
    checkEmptyFields,
    checkAuth,
    updateGame,
    sendGameUpdated
);

module.exports = gamesRouter;
