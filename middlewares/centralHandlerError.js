const {
  SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../constants');

module.exports.centralHandlerErr = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_ERROR
        ? INTERNAL_SERVER_ERROR_MESSAGE
        : message,
    });

  return next();
};
