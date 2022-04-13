const router = require("express").Router();
const movieRouter = require("../routes/movieRoute");
const showRouter = require("../routes/showsRoute");
const streamRouter = require("../routes/stream");
const genreRouter = require("../routes/genreRouter");

module.exports = {
  movieRouter,
  showRouter,
  streamRouter,
  genreRouter,
};
