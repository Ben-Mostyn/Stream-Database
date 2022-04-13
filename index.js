require("dotenv").config();
const express = require("express");
const connection = require("./connection");
const app = express();
const { Movie, Show, Genre } = require("./models/index");

//! Router Connections
const {
  movieRouter,
  showRouter,
  streamRouter,
  genreRouter,
} = require("./routes/index");

//This tells the server to accept the data as Json
app.use(express.json());

app.use("/", movieRouter);
app.use("/", showRouter);
app.use("/stream", streamRouter);
app.use("/", genreRouter);
// app.use("/stream", streamRouter);

app.listen(parseInt(process.env.HTTP_PORT), () => {
  console.log("Server Online");
  connection.authenticate();
  connection.sync({ alter: true });
});
