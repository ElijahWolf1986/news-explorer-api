const Article = require("../models/article");
const NotFoundError = require("../errors/NotFoundError.js");
const ForbiddenError = require("../errors/ForbiddenError.js");
const BadRequestError = require("../errors/BadRequestError.js");
const bcrypt = require("bcryptjs");

const getAllArticles = async (req, res, next) => {
  const user = req.user._id;
  try {
    const articles = await Article.find({});
    const userArticles = articles.filter((item) => item.owner === user);
    if (!articles || articles.length === 0) {
      return next(new NotFoundError("Не удалось найти ни одной статьи"));
    }

    return res.status(200).send({ data: userArticles });
  } catch (err) {
    return next(
      new BadRequestError("Не удалось загрузить статьи, попробуйте позже")
    );
  }
};

const createArticle = async (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  const owner = req.user._id;
  try {
    await Article.create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner,
    });
    return res.status(200).send({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(
        new BadRequestError(
          `${Object.values(err.errors)
            .map((error) => error.message)
            .join(", ")}`
        )
      );
    }
    return next(
      new BadRequestError("Не удалось создать статью, попробуйте позже")
    );
  }
};

const deleteArticle = async (req, res, next) => {
  const owner = req.user._id;

  try {
    const article = await Article.findById(req.params.articleId).select(
      "+owner"
    );
    if (!article) {
      return next(new NotFoundError("Такой карты не существует"));
    }
    if (owner !== article.owner.toString()) {
      return next(new ForbiddenError("Вы не можете удалять чужие карточки"));
    }
    const deletedArticle = await Article.findByIdAndRemove(
      req.params.articleId
    );

    return res.status(200).send({ data: deletedArticle });
  } catch (err) {
    return next(
      new BadRequestError("Не удалось удалить статью, попробуйте позже")
    );
  }
};

module.exports = {
  getAllArticles,
  createArticle,
  deleteArticle,
};
