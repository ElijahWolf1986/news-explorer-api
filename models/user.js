const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле name должно быть заполнено'],
    minlength: [2, 'минимальная длина поля name - 2'],
    maxlength: [30, 'максимальная длина поля name - 2'],
  },
  email: {
    type: String,
    required: [true, 'Поле email должно быть заполнено'],
    unique: [true, 'Поле email не должно повторяться'],
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Вы ввели не электронную почту!',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле password должно быть заполнено'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
