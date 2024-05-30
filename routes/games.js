const gamesRouter = require('express').Router();

const {
    findAllGames,
    createGame,
    findGameById,
    updateGame,
    deleteGame,
    checkEmptyFields,
    checkIfUsersAreSafe,
    checkIfCategoriesAvaliable,
    checkIsGameExists,
    checkIsVoteRequest,
} = require('../middlewares/games');
const { checkAuth } = require('../middlewares/auth');
const { sendAllGames, sendGameCreated, sendGameById, sendGameUpdated, sendGameDeleted } = require('../controllers/games');

gamesRouter.get('/games', findAllGames, sendAllGames);
gamesRouter.get('/games/:id', findGameById, sendGameById);
gamesRouter.post('/games', findAllGames, checkEmptyFields, checkIsGameExists, checkAuth, createGame, sendGameCreated);
gamesRouter.delete('/games/:id', checkAuth, deleteGame, sendGameDeleted);
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
