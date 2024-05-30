const users = require('../models/users');
const bcrypt = require('bcryptjs');

const findAllUsers = async (req, res, next) => {
    console.log('GET /api/users');
    req.usersArray = await users.find({}, { password: 0 });
    next();
};
const hashPassword = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        next();
    } catch (error) {
        res.status(400).send({ message: 'Ошибка хеширования пароля' });
    }
};
const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ message: 'Заполни все поля' }));
    } else {
        next();
    }
};
const checkEmptyNameAndEmail = async (req, res, next) => {
    if (!req.body.username || !req.body.email) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ message: 'Заполни все поля' }));
    } else {
        next();
    }
};
const checkIsUserExists = async (req, res, next) => {
    const isInArray = req.usersArray.find((user) => {
        return req.body.email === user.email;
    });
    if (isInArray) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ message: 'Пользователь с таким email уже существует' }));
    } else {
        next();
    }
};
const createUser = async (req, res, next) => {
    console.log('POST /users');
    try {
        console.log(req.body);
        req.game = await users.create(req.body);
        next();
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ message: 'Error creating user' }));
    }
};
const findUserById = async (req, res, next) => {
    console.log('GET /api/users/:id');
    try {
        req.user = await users.findById(req.params.id, { password: 0 });
        next();
    } catch (error) {
        res.status(404).send('User not found');
    }
};
const deleteUser = async (req, res, next) => {
    console.log(`DELETE /users/${req.params.id}`);
    try {
        req.user = await users.findByIdAndDelete(req.params.id);
        next();
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ message: 'Ошибка удаления users' }));
    }
};
const updateUser = async (req, res, next) => {
    console.log(`PUT /user/${req.params.id}`);
    try {
        req.game = await users.findByIdAndUpdate(req.params.id, req.body);
        next();
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ message: 'Ошибка обновления пользователя' }));
    }
};

module.exports = {
    findAllUsers,
    hashPassword,
    createUser,
    findUserById,
    updateUser,
    deleteUser,
    checkEmptyNameAndEmail,
    checkEmptyNameAndEmailAndPassword,
    checkIsUserExists,
};
