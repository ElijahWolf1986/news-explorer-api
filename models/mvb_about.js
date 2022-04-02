const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Поле title должно быть заполнено"],
  },
  about1: {
    type: String,
    required: [true, "Поле about1 должно быть заполнено"],
  },
  about2: {
    type: String,
    required: [true, "Поле about2 должно быть заполнено"],
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

module.exports = mongoose.model("about", aboutSchema);
