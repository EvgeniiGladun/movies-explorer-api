const rateLimit = require('express-rate-limit');
const { LIMITERAUTH_MESSAGE, LIMITER_MESSAGE } = require('../constants');

const limiterAuth = rateLimit({
  windowMs: 60 * 60 * 1000, // ограничения по времени, за 1 час максимум 5 запросов
  max: 5, // можно совершить максимум 5 запросов с одного IP
  message: {
    message: LIMITERAUTH_MESSAGE,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // ограничения по времени, за 15 минут максимум 100 запросов
  max: 100, // можно совершить максимум 100 запросов с одного IP
  message: {
    message: LIMITER_MESSAGE,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  limiterAuth,
  limiter,
};
