const connection = require("../connection");

const Movie = require("./movies");
const Show = require("./shows");
const Genre = require("./genre");
// const User = require("./user");

Show.hasMany(Genre, { constraints: false });

Movie.hasMany(Genre, { constraints: false });
Genre.hasMany(Show, { constraints: false });
Genre.hasMany(Movie, { constraints: false });

module.exports = {
  Movie,
  Show,
  Genre,
  // User,
};
