const { DataTypes } = require("sequelize");
const { Movie, Show } = require("./index");
const connection = require("../connection");

const Genre = connection.define(
  "Genre",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [{ unique: false, fields: ["name"] }],
  }
);

module.exports = Genre;
