const movie = require('express').Router();
const { createMovieValidate, deleteMovieValidate } = require('../middlewares/validateCelebrate');

const {
  readMeSaveMovies,
  createMovie,
  deleteSaveMovies,
} = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы
movie.get('/', readMeSaveMovies);

//  создание фильма с переданными в теле ключами
movie.post('/', createMovieValidate, createMovie);

//  удаляет сохранённый фильм по id
movie.delete('/:movieId', deleteMovieValidate, deleteSaveMovies);

// Экспортируем "роутер"
module.exports = movie;
