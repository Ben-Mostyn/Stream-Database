const router = require("express").Router();
const { Movie } = require("../models");
const {
  handleNotFoundError,
  handleInternalServerError,
} = require("../middleware/error");

//! Get all movies
router.get("/movies", async (req, res) => {
  res.status(200).json(await Movie.findAll({}));
});

//!Create a Movie
router.post("/movies", async (req, res) => {
  const movie = await Movie.create(req.body);
  res.status(201).json({ msg: `Created ${movie.name}`, movie });
});

//!Get a movie by name
router.get("/movies/:name", async (req, res, next) => {
  try {
    const movie = await Movie.findOne({ where: { name: req.params.name } });
    if (movie) {
      res.status(200).json(movie);
    } else {
      req.errType = 400;
      throw new Error("Doesnt exist");
    }
  } catch (error) {
    next(error);
  }
});

//! Delete all Movies
router.delete("/movies", async (req, res) => {
  const result = await Movie.destroy({ where: {} });
  res.status(200).json({ msg: "Deleted all Movies", result });
});

//!Delete Movie by name
router.delete("/movies/:name", async (req, res) => {
  const result = await Movie.destroy({ where: { name: req.params.name } });
  res.status(200).json({ msg: `Deleted ${req.params.name}` });
});

//!Update Movie
router.put("/movies/:name", async (req, res) => {
  const result = await Movie.findOne({ where: { name: req.params.name } });
  if (req.body.name) {
    result.name = req.body.name;
  }
  if (req.body.rating) {
    result.rating = req.body.rating;
  }
  if (req.body.releaseYear) {
    result.releaseYear = req.body.releaseYear;
  }
  if (req.body.actor) {
    result.actor = req.body.actor;
  }

  await result.save();
  res.status(200).json({ msg: "Updated one movie", result });
});

router.use(handleNotFoundError);
router.use(handleInternalServerError);
module.exports = router;
