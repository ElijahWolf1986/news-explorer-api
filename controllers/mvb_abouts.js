const About = require("../models/mvb_about");
const NotFoundError = require("../errors/NotFoundError.js");
const BadRequestError = require("../errors/BadRequestError.js");

const getAboutInfo = async (req, res, next) => {
  try {
    const abouts = await About.find({});
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

const createAbout = async (req, res, next) => {
  const { title, image, about1, about2 } = req.body;
  try {
    await About.update({
      title,
      image,
      about1,
      about2,
    });
    return res.status(200).send({
      title,
      image,
      about1,
      about2,
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

module.exports = {
  getAboutInfo,
  createAbout,
};
