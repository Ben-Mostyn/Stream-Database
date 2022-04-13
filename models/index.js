const connection = require("../connection");

const Movie = require("./movies");
const Show = require("./shows");
const Genre = require("./genre");
// const User = require("./user");

Show.belongsTo(Genre);
Movie.belongsTo(Genre);
Genre.hasMany(Show);

module.exports = {
  Movie,
  Show,
  Genre,
  // User,
};
