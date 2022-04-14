require("dotenv").config();
const express = require("express");
const connection = require("./connection");
const app = express();
const { Movie, Show, Genre } = require("./models/index");
const passport = require("passport");

//! Router Connections
const {
  movieRouter,
  showRouter,
  streamRouter,
  genreRouter,
  userRouter,
} = require("./routes/index");

const {
  registerStrategy,
  loginStrategy,
  verifyStrategy,
} = require("./middleware/auth");

//This tells the server to accept the data as Json
app.use(express.json());

passport.use("register", registerStrategy);
passport.use("login", loginStrategy);
passport.use(verifyStrategy);

app.use("/user", userRouter);
app.use("/movies", movieRouter);
app.use("/shows", showRouter);
app.use("/stream", streamRouter);
app.use("/genre", genreRouter);
// app.use("/stream", streamRouter);

app.listen(parseInt(process.env.HTTP_PORT), () => {
  console.log("Server Online");
  connection.authenticate();
  connection.sync({ alter: true });
});
