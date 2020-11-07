const express = require("express");
const mongoose = require("mongoose");
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require("body-parser");
const { errors } = require("celebrate");

const { PORT = 3000 } = process.env;
const app = express();
const cors = require("cors");
// const usersRouter = require('./routes/users').router;
// const cardsRouter = require('./routes/cards').router;
const { login, createUser } = require("./controllers/users");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const {
  validateSignin,
  validateSignup,
} = require("./middlewares/validationJoi");

const routes  = require("./routes");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(requestLogger);

app.post("/signin", validateSignin, login);
app.post("/signup", validateSignup, createUser);

app.use(routes);

app.use(errorLogger);

app.use(errors());
// eslint-disable-next-line no-console
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ message: err.message });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
