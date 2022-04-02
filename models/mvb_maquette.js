const mongoose = require("mongoose");

const maquetteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Поле keyword должно быть заполнено"],
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

module.exports = mongoose.model("maquette", maquetteSchema);
