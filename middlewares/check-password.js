const BadRequestError = require('../errors/BadRequestError.js');

const checkPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || !password.trim()) {
    return next(new BadRequestError('Поле password должно быть заполнено'));
  }
  return next();
};

module.exports = checkPassword;
