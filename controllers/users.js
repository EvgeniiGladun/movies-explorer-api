const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET, JWT_SECRET_DEV } = require('../middlewares/auth');
const { LOGOUT_MESSAGE } = require('../constants');

const Conflict = require('../errors/Conflict');
const BadRequest = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFoundError');

const {
  OK,
  SUCCESSFUL_COOKIE,
  NOT_FOUND_USERID,
  BAD_REQUEST_CREATE_USER,
  BAD_REQUEST_SEARCH_USER,
  CONFLICT_EMAIL,
} = require('../constants');

// Авторизация пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // Создание секретного jwt-токена
      const token = jwt.sign({ _id: user.id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV, { expiresIn: '7d' });

      // Отправка кука пользователю с ключем
      return res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, Secure: true }).send({
        message: SUCCESSFUL_COOKIE,
        JWT: token,
      });
    }).catch(next);
};

// Пользователь выхоит из аккаунта
const logOut = (req, res) => {
  res.clearCookie('jwt').send({
    message: LOGOUT_MESSAGE,
  });
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((passHash) => User.create({
      name,
      email,
      password: passHash,
    })
      .then((newUser) => res.status(OK).send({
        name: newUser.name,
        email: newUser.email,
      })))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new Conflict(CONFLICT_EMAIL));
      }

      if (err.name === 'ValidationError') {
        return next(new BadRequest(BAD_REQUEST_CREATE_USER));
      }

      return next(err);
    });
};

const readMeProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw next(new NotFoundError(NOT_FOUND_USERID));
    })
    .then((user) => {
      const dataUser = {
        name: user.name,
        email: user.email,
      };
      res.send(dataUser);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest(BAD_REQUEST_SEARCH_USER));
      }

      return next(err);
    });
};

const updateMeProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw next(new NotFoundError(NOT_FOUND_USERID));
    })
    .then((updateUser) => {
      const dataUser = {
        name: updateUser.name,
        email: updateUser.email,
      };
      res.status(OK).send(dataUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest(BAD_REQUEST_CREATE_USER));
      }

      if (err.code === 11000) {
        return next(new Conflict(CONFLICT_EMAIL));
      }

      return next(err);
    });
};

// Экспорируем функций
module.exports = {
  login,
  logOut,
  createUser,
  readMeProfile,
  updateMeProfile,
};
