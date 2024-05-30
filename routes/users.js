const usersRouter = require('express').Router();

const { checkAuth } = require('../middlewares/auth');
const {
    findAllUsers,
    hashPassword,
    createUser,
    findUserById,
    updateUser,
    deleteUser,
    checkEmptyNameAndEmailAndPassword,
    checkEmptyNameAndEmail,
    checkIsUserExists,
} = require('../middlewares/users');
const { sendAllUsers, sendUserCreated, sendUserById, sendUserUpdated, sendUserDeleted, sendMe } = require('../controllers/users');

usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.get('/users/:id', findUserById, sendUserById);
usersRouter.get('/me', checkAuth, sendMe);
usersRouter.post('/users', findAllUsers, checkIsUserExists, checkEmptyNameAndEmailAndPassword, hashPassword, createUser, sendUserCreated);
usersRouter.delete('/users/:id', checkAuth, findUserById, deleteUser, sendUserDeleted);
usersRouter.put('/users/:id', checkEmptyNameAndEmail, checkAuth, updateUser, sendUserUpdated);

module.exports = usersRouter;
