const router = require("express").Router();
const { Movie, Genre } = require("../models");
const {
  handleNotFoundError,
  handleInternalServerError,
} = require("../middleware/error");

//! Get all movies
router.get("/", async (req, res) => {
  res.status(200).json(await Movie.findAll({}));
});

//!Create a Movie
router.post("/", async (req, res) => {
  const genre = await Genre.findOne({
    where: { name: (req.body.name = req.body.genre) },
  });
  const movie = await Movie.create(req.body);
  res.status(201).json({ msg: `Created ${movie.name}`, movie });
  movie.addGenres([genre]);
  genre.addMovies([movie]);
});

//!Get a movie by name
router.get("/:name", async (req, res, next) => {
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
router.delete("/", async (req, res) => {
  const result = await Movie.destroy({ where: {} });
  res.status(200).json({ msg: "Deleted all Movies", result });
});

//!Delete Movie by name
router.delete("/:name", async (req, res) => {
  const result = await Movie.destroy({ where: { name: req.params.name } });
  res.status(200).json({ msg: `Deleted ${req.params.name}` });
});

//!Update Movie
router.put("/:name", async (req, res) => {
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
