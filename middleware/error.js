// error object
// 500 internal server error
const handleInternalServerError = (error, req, res, next) => {
  if (req.errType === 500) {
    res.status(500).json({
      msg: "Error, you've done something wrong",
    });
  }
  next();
};
// user/client error is 400
const handleNotFoundError = (err, req, res, next) => {
  if (req.errType == 400) {
    res.status(404).json({
      msg: "Not Found!!!!!",
    });
  }
  next();
};

module.exports = { handleNotFoundError, handleInternalServerError };
