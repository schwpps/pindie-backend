const mongoose = require('mongoose');
const userModel = require('./users');
const categoryModel = require('./categories');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    developer: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: userModel,
        },
    ],
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: categoryModel,
        },
    ],
});

gameSchema.statics.findGameByCategory = function (category) {
    return this.find({})
        .populate({
            path: 'categories',
            match: { name: category },
        })
        .populate({
            path: 'users',
            select: '-password',
        })
        .then((games) => {
            return games.filter((game) => game.categories.length > 0);
        });
};

const games = mongoose.model('games', gameSchema);
module.exports = games;
