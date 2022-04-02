const Maquette = require("../models/mvb_maquette");
const NotFoundError = require("../errors/NotFoundError.js");
const BadRequestError = require("../errors/BadRequestError.js");

const getMaquettes = async (req, res, next) => {
  try {
    const abouts = await Maquette.find({});
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

const createMaquette = async (req, res, next) => {
  const { name, image } = req.body;
  try {
    await Maquette.create({
      name,
      image,
    });
    return res.status(200).send({
      name,
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
      new BadRequestError("Не удалось создать блок about, попробуйте позже")
    );
  }
};

const deleteMaquette = async (req, res, next) => {
  try {
    const deletedMaquette = await Maquette.findByIdAndRemove(
      req.params.maquetteId
    );
    return res.status(200).send({ data: deletedMaquette });
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
  getMaquettes,
  createMaquette,
  deleteMaquette,
};
