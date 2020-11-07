const router = require("express").Router();

const { auth } = require("../middlewares/auth");

const userRouter = require("./users").router;

const articleRouter = require("./articles").router;

const NotFoundError = require("../errors/NotFoundError");

router.use("/users", auth, userRouter);

router.use("/articles", auth, articleRouter);

router.use((req, res) => {
  throw new NotFoundError({ message: "Запрашиваемый ресурс не найден" });
});

module.exports = router;
