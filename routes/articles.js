const router = require('express').Router();
const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articles');
const {
  validateCreateCard,
  validateDeleteCard,
} = require('../middlewares/validationJoi');

router.get('/', getAllArticles);

router.post('/', createArticle); //todo add validateCreateArticle

router.delete('/:articleId', deleteArticle); //todo add validateDeleteCard,

module.exports = { router };
