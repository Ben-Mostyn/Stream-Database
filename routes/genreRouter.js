const router = require("express").Router();
const { Genre } = require("../models");
const {
  handleNotFoundError,
  handleInternalServerError,
} = require("../middleware/error");

router.use(handleNotFoundError);
router.use(handleInternalServerError);

module.exports = router;
