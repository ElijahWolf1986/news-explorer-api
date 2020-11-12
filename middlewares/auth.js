require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_LOCAL_SECRET } = require('../config');

const { JWT_SECRET = JWT_LOCAL_SECRET } = process.env;

module.exports.auth = async (req, res, next) => {
  const token = req.headers.authorization
    && req.headers.authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;

  next();
  return req.user;
};
