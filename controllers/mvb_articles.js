const Article = require("../models/mvb_article");
const NotFoundError = require("../errors/NotFoundError.js");
const BadRequestError = require("../errors/BadRequestError.js");

const getMvbArticles = async (req, res, next) => {
  try {
    const abouts = await Article.find({});
    if (!abouts || abouts.length === 0) {
      return next(new NotFoundError("Не удалось найти никакой информации"));
    }

    return res.status(200).send({ data: abouts });
  } catch (err) {
    return next(
      new BadRequestError(
        "Не удалось загрузить никакой информации, попробуйте позже"
      )
    );
  }
};

const createMvbArticle = async (req, res, next) => {
  const { name, title, subtitle, image, link } = req.body;
  try {
    await Article.create({
      name,
      title,
      subtitle,
      image,
      link,
    });
    return res.status(200).send({
      name,
      title,
      subtitle,
      image,
      link,
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
      new BadRequestError("Не удалось создать блок about, попробуйте позже")
    );
  }
};

const editMvbArticle = async (req, res, next) => {
  const { articleId, name, title, subtitle, image, link } = req.body;
  try {
    await Article.findByIdAndUpdate(articleId, {
      name,
      title,
      subtitle,
      image,
      link,
    });
    return res.status(200).send({
      name,
      title,
      subtitle,
      image,
      link,
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
      new BadRequestError("Не удалось создать блок about, попробуйте позже")
    );
  }
};

const deleteMvbArticle = async (req, res, next) => {
  try {
    const deletedArticle = await Article.findByIdAndRemove(
      req.params.mvbarticleId
    );
    return res.status(200).send({ data: deletedArticle });
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
      new BadRequestError("Не удалось создать блок about, попробуйте позже")
    );
  }
};

module.exports = {
  getMvbArticles,
  createMvbArticle,
  editMvbArticle,
  deleteMvbArticle,
};
