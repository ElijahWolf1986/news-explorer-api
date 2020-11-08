const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError.js');
const ForbiddenError = require('../errors/ForbiddenError.js');
const BadRequestError = require('../errors/BadRequestError.js');

const getAllArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send({ data: articles }))
    .catch(() => {
      next(new BadRequestError('Что-то пошло не так'));
    });
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image} = req.body;
  const owner = req.user._id;

  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then((article) => res.send({ data: article }))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      }
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const owner = req.user._id;

  Article.findById(req.params.articleId).select("+owner")
    .then((article) => {
      if (!article) {
        return next(new NotFoundError('Такой карты не существует'));
      }
      if (owner !== article.owner.toString()) {
        return next(new ForbiddenError('Вы не можете удалять чужие карточки'));
      }
      return (
        Article.findByIdAndRemove(articleId)
          .then((deletedArticle) => res.status(200).send({ data: deletedArticle }))
          .catch(() => next(new NotFoundError('карта не найдена')))
      );
    });
};

module.exports = {
  getAllArticles,
  createArticle,
  deleteArticle,
};
