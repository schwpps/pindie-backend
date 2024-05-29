const usersRouter = require('express').Router();

const {
    findAllUsers,
    createUser,
    findUserById,
    updateUser,
    deleteUser,
    checkEmptyNameAndEmailAndPassword,
    checkEmptyNameAndEmail,
    hashPassword,
} = require('../middlewares/users');
const { checkAuth } = require('../middlewares/auth');
const { sendAllUsers, sendUserCreated, sendUserById, sendUserUpdated, sendUserDeleted, sendMe } = require('../controllers/users');

usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.get('/users/:id', findUserById, sendUserById);
usersRouter.post('/users', checkEmptyNameAndEmailAndPassword, checkAuth, hashPassword, createUser, sendUserCreated);
usersRouter.delete('/users/:id', checkAuth, deleteUser, sendUserDeleted);
usersRouter.put('/users/:id', checkEmptyNameAndEmail, checkAuth, updateUser, sendUserUpdated);
usersRouter.get('/me', checkAuth, sendMe);

module.exports = usersRouter;
