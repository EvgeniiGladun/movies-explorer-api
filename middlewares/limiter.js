const rateLimit = require('express-rate-limit');

const limiterAuth = rateLimit({
  windowMs: 60 * 60 * 1000, // ограничения по времени, за 1 час максимум 5 запросов
  max: 5, // можно совершить максимум 5 запросов с одного IP
  message: 'Упсс... похоже вы привысели лимит по запросам, повторите попытку через час 🫥',
  standardHeaders: true,
  legacyHeaders: false,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // ограничения по времени, за 15 минут максимум 20 запросов
  max: 100, // можно совершить максимум 100 запросов с одного IP
  message: 'Упсс... похоже вы привысели лимит по запросам, повторите попытку через 15 минут 🫥',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  limiterAuth,
  limiter,
};
