require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const { DATA_BASE_DEV } = require('./constants');

const { NODE_ENV, DATA_BASE = 'mongodb://localhost:27017/developdb' } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DATA_BASE : DATA_BASE_DEV, {
  useNewUrlParser: true,
});

const { auth } = require('./middlewares/auth');
const { cors } = require('./middlewares/cors');
const { limiterAuth, limiter } = require('./middlewares/limiter');
const { handlerNotFound } = require('./middlewares/handlerNotFound');
const { centralHandlerErr } = require('./middlewares/centralHandlerError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { loginValidate, registerValidate } = require('./middlewares/validateCelebrate');

const { createUser, login, logOut } = require('./controllers/users');

const users = require('./routes/users');
const movies = require('./routes/movies');

const app = express();

// Логгер действий
app.use(requestLogger);

// Заголовки безопасности
app.use(helmet());

// Парсинг данных от клиента
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Корс проверка
app.use('/', cors);

app.post('/signin', [loginValidate, limiterAuth], login);
app.post('/signup', [registerValidate, limiterAuth], createUser);

app.use(auth);
app.use('/movies', limiter, movies);
app.use('/users', limiter, users);
app.post('/signout', limiter, logOut);

// Обработка несуществующей страницы
app.use(handlerNotFound);

// Обработка ошибок модуля 'Joi'
app.use(errors());

// Глобальный обработчик ошибок
app.use(centralHandlerErr);

// Логгер ошибок
app.use(errorLogger);

module.exports = app;
