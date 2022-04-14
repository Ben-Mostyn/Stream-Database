const router = require("express").Router();
const { Genre, Movie } = require("../models");
const {
  handleNotFoundError,
  handleInternalServerError,
} = require("../middleware/error");
// /genre/genre
router.post("/", async (req, res) => {
  const genre = await Genre.create(req.body);

  res.status(201).json({ msg: `Created ${genre.name}`, genre });
});

router.get("/", async (req, res) => {
  res.status(200).json(await Genre.findAll({}));
});

router.use(handleNotFoundError);
router.use(handleInternalServerError);

module.exports = router;
