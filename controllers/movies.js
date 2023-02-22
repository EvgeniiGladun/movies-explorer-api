const Movie = require('../models/movie');

const BadRequest = require('../errors/BadRequest');
const Unauthorized = require('../errors/Unauthorized');
const NotFoundError = require('../errors/NotFoundError');

const {
  OK,
  CREATED,
  OK_MOVIE_DELETE,
  NOT_FOUND_MOVIE_MESSAGE,
  NOT_FOUND_MOVIEID,
  BAD_REQUEST_MESSAGE,
  BAD_REQUEST_MOVIE_DELETE,
  UNAUTHORIZED_MOVIE,
} = require('../constants');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user ? req.user._id : null,
    movieId,
    nameRU,
    nameEN,
  })
    .then((newMovie) => res.status(CREATED).send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest(BAD_REQUEST_MESSAGE));
      }

      return next(err);
    });
};

const deleteSaveMovies = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      const userId = req.user._id;
      const ownerMovie = movie ? movie.owner.toString() : null;

      // Проверяем наличие фильма 'movieId'
      if (movie === null) {
        return next(new NotFoundError(NOT_FOUND_MOVIE_MESSAGE));
      }

      // Проверяем на владельца
      if (userId !== ownerMovie) {
        return next(new NotFoundError(UNAUTHORIZED_MOVIE));
      }

      return Movie.findByIdAndRemove(movie._id)
        .orFail(() => {
          throw new NotFoundError(NOT_FOUND_MOVIEID);
        })
        .then(() => res.status(OK).send({ message: OK_MOVIE_DELETE }))
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new Unauthorized(BAD_REQUEST_MOVIE_DELETE));
          }

          return next(err);
        });
    })
    .catch(next);
};

const readMeSaveMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((card) => {
      res.status(OK).send(card);
    })
    .catch(next);
};

// Экспортируем "функций"
module.exports = {
  createMovie,
  deleteSaveMovies,
  readMeSaveMovies,
};
