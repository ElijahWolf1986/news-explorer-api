const router = require("express").Router();
const { getAboutInfo, createAbout } = require("../controllers/mvb_abouts");
// const {
//   validateCreateArticle,
//   validateDeleteArticle,
// } = require('../middlewares/validationJoi');

router.get("/", getAboutInfo);
router.put("/", createAbout);

module.exports = { router };
