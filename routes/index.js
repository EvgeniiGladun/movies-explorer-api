const index = require('express').Router();
const { auth } = require('../middlewares/auth');
const { NOT_FOUND_PAGE } = require('../constants');

const NotFoundError = require('../errors/NotFoundError');

const { limiterAuth, limiter } = require('../middlewares/limiter');
const { loginValidate, registerValidate } = require('../middlewares/validateCelebrate');
const { createUser, login, logOut } = require('../controllers/users');

const users = require('./users');
const movies = require('./movies');

index.post('/signin', [loginValidate, limiterAuth], login);
index.post('/signup', [registerValidate, limiterAuth], createUser);

index.use(auth);
index.use('/movies', limiter, movies);
index.use('/users', limiter, users);
index.post('/signout', limiter, logOut);

// Обработка несуществующей страницы
index.use((req, res, next) => {
  throw next(new NotFoundError(NOT_FOUND_PAGE));
});

module.exports = index;
