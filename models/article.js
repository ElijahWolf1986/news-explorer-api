const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Поле keyword должно быть заполнено'],
  },
  title: {
    type: String,
    required: [true, 'Поле title должно быть заполнено'],
  },
  text: {
    type: String,
    required: [true, 'Поле text должно быть заполнено'],
  },
  date: {
    type: Date,
    required: [true, 'Поле date должно быть заполнено'],
  },
  source: {
    type: String,
    required: [true, 'Поле source должно быть заполнено'],
  },
  link: {
    type: String,
    required: [true, 'Поле link должно быть заполнено'],
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/gm.test(v);
      },
      message: 'Ссылка на статью не верна!',
    },
  },
  image: {
    type: String,
    required: [true, 'Поле image должно быть заполнено'],
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/gm.test(v);
      },
      message: 'Ссылка на изображение не верна!',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле owner должно быть заполнено'],
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
