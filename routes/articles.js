const router = require('express').Router();
const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articles');
const {
  validateCreateArticle,
  validateDeleteArticle,
} = require('../middlewares/validationJoi');

router.get('/', getAllArticles);
router.post('/', validateCreateArticle, createArticle);
router.delete('/:articleId', validateDeleteArticle, deleteArticle);

module.exports = { router };
