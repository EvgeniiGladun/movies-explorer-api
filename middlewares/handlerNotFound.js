const { NOT_FOUND_PAGE } = require('../constants');
const NotFoundError = require('../errors/NotFoundError');

// Обработка несуществующей страницы
module.exports.handlerNotFound = (req, res, next) => {
  throw next(new NotFoundError(NOT_FOUND_PAGE));
};
