const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Поле keyword должно быть заполнено"],
  },
  title: {
    type: String,
    required: [true, "Поле title должно быть заполнено"],
  },
  subtitle: {
    type: String,
    // required: [true, "Поле subtitle должно быть заполнено"],
  },
  link: {
    type: String,
    required: [true, "Поле link должно быть заполнено"],
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/gm.test(v);
      },
      message: "Ссылка на статью не верна!",
    },
  },
  image: {
    type: String,
    required: [true, "Поле image должно быть заполнено"],
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/gm.test(v);
      },
      message: "Ссылка на изображение не верна!",
    },
  },
});

module.exports = mongoose.model("mvbarticle", articleSchema);
