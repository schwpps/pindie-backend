const categoriesRouter = require('express').Router();

const { checkAuth } = require('../middlewares/auth');

const {
    findAllCategories,
    createCategory,
    findCategoryById,
    updateCategory,
    deleteCategory,
    checkIsCategoryExists,
    checkEmptyName,
} = require('../middlewares/categories');
const { sendAllCategories, sendCategoryCreated, sendCategoryById, sendCategoryUpdated, sendCategoryDeleted } = require('../controllers/categories');

categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
categoriesRouter.get('/categories/:id', findCategoryById, sendCategoryById);
categoriesRouter.post('/categories', findAllCategories, checkIsCategoryExists, checkEmptyName, checkAuth, createCategory, sendCategoryCreated);
categoriesRouter.delete('/categories/:id', checkAuth, findCategoryById, deleteCategory, sendCategoryDeleted);
categoriesRouter.put('/categories/:id', checkEmptyName, checkAuth, updateCategory, sendCategoryUpdated);

module.exports = categoriesRouter;
