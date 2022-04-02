const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const userRouter = require("./users").router;
const articleRouter = require("./articles").router;
const mvbAboutRouter = require("./mvb_about").router;
const mvbArticleRouter = require("./mvb_articles").router;
const mvbMaquetteRouter = require("./mvb_maquette").router;

const NotFoundError = require("../errors/NotFoundError");
const checkPassword = require("../middlewares/check-password");
const { login, createUser } = require("../controllers/users");
const {
  validateSignin,
  validateSignup,
} = require("../middlewares/validationJoi");

router.post("/signup", validateSignup, checkPassword, createUser);
router.post("/signin", validateSignin, checkPassword, login);
router.use("/users", auth, userRouter);
router.use("/articles", auth, articleRouter);
router.use("/mvbabout", mvbAboutRouter);
router.use("/mvbarticles", mvbArticleRouter);
router.use("/mvbmaquette", mvbMaquetteRouter);

router.use(() => {
  throw new NotFoundError("Запрашиваемый ресурс не найден");
});

module.exports = router;
