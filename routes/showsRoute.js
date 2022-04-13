const router = require("express").Router();
const { Show } = require("../models");

//! Get All Shows
router.get("/shows", async (req, res) => {
  res.status(200).json(await Show.findAll({}));
});

//!Create Show
router.post("/shows", async (req, res) => {
  const show = await Show.create(req.body);
  res.status(201).json({ msg: `Created ${show.name}`, show });
});

//!Get Show by name
router.get("/shows/:name", async (req, res) => {
  const show = await Show.findOne({ where: { name: req.params.name } });
  if (show) {
    res.status(200).json(show);
  } else {
    res.status(404).json(null);
  }
});

//! Delete all Shows
router.delete("/shows", async (req, res) => {
  const result = await Show.destroy({ where: {} });
  res.status(200).json({ msg: "Deleted all Shows", result });
});

//!Delete Show by name
router.delete("/shows/:name", async (req, res) => {
  const result = await Show.destroy({ where: { name: req.params.name } });
  res.status(200).json({ msg: `Deleted ${req.params.name}` });
});

//!Update Show
router.put("/shows/:name", async (req, res) => {
  const result = await Show.findOne({ where: { name: req.params.name } });
  if (req.body.name) {
    result.name = req.body.name;
  }
  if (req.body.rating) {
    result.rating = req.body.rating;
  }
  if (req.body.seasons) {
    result.seasons = req.body.seasons;
  }
  if (req.body.actor) {
    result.actor = req.body.actor;
  }
  if (req.body.episodes) {
    result.episodes = req.body.episodes;
  }

  await result.save();
  res.status(200).json({ msg: `Updated: ${req.params.name}`, result });
});

module.exports = router;
