const router = require("express").Router();
const { Show, Movie } = require("../models/");

const allMovies = async (req, res) =>
  res.status(200).json(await Movie.findAll({}));
console.log(allMovies);

const allShows = async (req, res) =>
  res.status(200).json(await Show.findAll({}));

// const allMedia = async (req, res) => {
//   //   if (allMedia) {
//   //     res.status(200).json(await Show.findAll({}));
//   //   } else {
//   //     res.status(404).json({ msg: "Not applicable" });
//   //   }
//   //   allMedia.push(await Movie.findAll({}));
//   //   res.status(200).json((await Movie.findAll({})) && Show.findAll({}));
//   //   allMedias.push(allMovies && allShows);
// };
router.get("/movies", allShows, allMovies);

// ! GET MOVIES & SHOWS

module.exports = router;
