const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const UnauthorizedError = require("../errors/UnauthorizedError.js");
const BadRequestError = require("../errors/BadRequestError.js");
const NotFoundError = require("../errors/NotFoundError.js");
const ForbiddenError = require("../errors/ForbiddenError.js");
const ConflictError = require("../errors/ConflictError.js");
const { JWT_SECRET } = process.env;

const getUserInfo = (req, res, next) => {
  return User.findById(req.user._id).then((user) => {
    const {email, name} = user;
    res.status(200).send({ email, name });
  });

  next();
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  return bcrypt.hash(password, 10, async (error, hash) => {
    try {
      const user = await User.findOne({ email });
      if (user) {
        return next(
          new ConflictError("пользователь с таким Email уже существует")
        );
      }
      return (
        User.create({
          email,
          password: hash,
          name,
        })
          .then(() =>
            res.status(200).send({
              data: {
                email,
                name,
              },
            })
          )
          .catch((err) => {
            if (err.name === "ValidationError") {
               return next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
            }
          })
      );
    } catch (err) {
      return next(new BadRequestError("Что-то пошло не так"));
    }
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new UnauthorizedError("Неправильный логин или пароль"));
    }
    return bcrypt.compare(password, user.password, (err, isValidPassword) => {
      if (!isValidPassword)
        next(new UnauthorizedError("Неправильный логин или пароль"));

      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res
        .cookie("jwt", token, {
          maxAge: 36000,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: "your cookies are baked" });
    });
  } catch (err) {
    return next(new UnauthorizedError("Неправильный логин или пароль"));
  }
};

module.exports = {
  getUserInfo,
  createUser,
  login,
};
