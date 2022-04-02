const router = require("express").Router();
const {
  getMvbArticles,
  createMvbArticle,
  editMvbArticle,
  deleteMvbArticle,
} = require("../controllers/mvb_articles");

router.get("/", getMvbArticles);
router.post("/", createMvbArticle);
router.put("/", editMvbArticle);
router.delete("/:mvbarticleId", deleteMvbArticle);

module.exports = { router };
