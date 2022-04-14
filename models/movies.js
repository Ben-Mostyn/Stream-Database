const { DataTypes, INTEGER, INET, HasOne } = require("sequelize");
const connection = require("../connection");
const Genre = require("./genre");

const Movie = connection.define(
  "Movie",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: { type: INTEGER },
    releaseYear: { type: INTEGER },
    actor: { type: DataTypes.STRING },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [{ unique: false, fields: ["name"] }],
  }
);
// Movie.hasOne(Genre);
module.exports = Movie;
