const router = require("express").Router();
const { Show, Genre } = require("../models");
const {
  handleNotFoundError,
  handleInternalServerError,
} = require("../middleware/error");

//! Get All Shows
router.get("/", async (req, res) => {
  res.status(200).json(await Show.findAll({}));
});

//!Create Show
router.post("/", async (req, res) => {
  const genre = await Genre.findOne({
    where: { name: req.body.genre },
  });
  const show = await Show.create(req.body);
  res.status(201).json({ msg: `Created ${show.name}`, show });
  show.addGenres([genre]);
  genre.addShows([show]);
});

// const show = await Show.create(req.body);
// res.status(201).json({ msg: `Created ${show.name}`, show });

//!Get Show by name

router.get("/:name", async (req, res, next) => {
  try {
    const show = await Show.findOne({ where: { name: req.params.name } });
    if (show) {
      res.status(200).json(show);
    } else {
      req.errType = 400;
      throw new Error("Show doesnt exist");
    }
  } catch (error) {
    next(error);
  }
});

// router.get("/shows/:name", async (req, res) => {
//   const show = await Show.findOne({ where: { name: req.params.name } });
//   if (show) {
//     res.status(200).json(show);
//   } else {
//     res.status(404).json(null);
//   }
// });

//! Delete all Shows
router.delete("/", async (req, res) => {
  const result = await Show.destroy({ where: {} });
  res.status(200).json({ msg: "Deleted all Shows", result });
});

//!Delete Show by name
router.delete("/:name", async (req, res) => {
  const result = await Show.destroy({ where: { name: req.params.name } });
  res.status(200).json({ msg: `Deleted ${req.params.name}` });
});

//!Update Show
router.put("/:name", async (req, res) => {
  const result = await Show.findOne({ where: { name: req.params.name } });
  if (req.body.name) {
    result.name = req.body.name;
  }
  if (req.body.rating) {
    result.rating = req.body.rating;
  }
  if (req.body.seasons) {
    result.seasons = req.body.seasons;
  }
  if (req.body.actor) {
    result.actor = req.body.actor;
  }
  if (req.body.episodes) {
    result.episodes = req.body.episodes;
  }

  await result.save();
  res.status(200).json({ msg: `Updated: ${req.params.name}`, result });
});

router.use(handleNotFoundError);
router.use(handleInternalServerError);

module.exports = router;
