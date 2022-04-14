const { DataTypes, INTEGER, INET, HasOne } = require("sequelize");
const connection = require("../connection");
const Genre = require("./genre");

const Show = connection.define(
  "Show",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: { type: INTEGER },
    actor: { type: DataTypes.STRING },
    seasons: { type: INTEGER },
    episodes: { type: INTEGER },
    genre: { type: DataTypes.STRING },
  },
  {
    indexes: [{ unique: false, fields: ["name"] }],
  }
);
// Show.hasOne(Genre);

module.exports = Show;
