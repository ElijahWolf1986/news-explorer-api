const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const UnauthorizedError = require('../errors/UnauthorizedError.js');
const BadRequestError = require('../errors/BadRequestError.js');
const NotFoundError = require('../errors/NotFoundError.js');
const ForbiddenError = require('../errors/ForbiddenError.js');
const ConflictError = require('../errors/ConflictError.js');
const { JWT_LOCAL_SECRET } = require('../config');

const { JWT_SECRET = JWT_LOCAL_SECRET } = process.env;

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError('Не удалось найти пользователя'));
    }
    const { email, name } = user;
    return res.status(200).send({ email, name });
  } catch (err) {
    return next(
      new BadRequestError(
        'Не удалось загрузить данные пользователя, попробуйте позже',
      ),
    );
  }
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  return bcrypt.hash(password, 10, async (error, hash) => {
    const user = await User.findOne({ email });
    if (user) {
      return next(
        new ConflictError('пользователь с таким Email уже существует'),
      );
    }
    return User.create({
      email,
      password: hash,
      name,
    })
      .then(() => res.status(200).send({
        email,
        name,
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return next(
            new BadRequestError(
              `${Object.values(err.errors)
                .map(() => error.message)
                .join(', ')}`,
            ),
          );
        }
        return next(
          new BadRequestError(
            'Не удалось создать пользователя, попробуйте позже',
          ),
        );
      });
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new UnauthorizedError('Неправильный логин или пароль'));
    }
    return bcrypt.compare(password, user.password, (err, isValidPassword) => {
      if (!isValidPassword) return next(new ForbiddenError('Неправильный логин или пароль'));
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      return res
        .cookie('jwt', token, {
          maxAge: 36000,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    });
  } catch (err) {
    return next(
      new BadRequestError('Не удалось войти, попробуйте позже'),
    );
  }
};

module.exports = {
  getUserInfo,
  createUser,
  login,
};
