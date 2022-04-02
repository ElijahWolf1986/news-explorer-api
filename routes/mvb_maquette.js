const router = require("express").Router();
const {
  getMaquettes,
  createMaquette,
  deleteMaquette,
} = require("../controllers/mvb_maquette");

router.get("/", getMaquettes);
router.post("/", createMaquette);
router.delete("/:maquetteId", deleteMaquette);

module.exports = { router };
