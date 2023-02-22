const RegExpUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w-]+)+[\w\-_~:/?#[\]@!$&'()*+,;=.]+$/;

// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://high-level.nomoredomains.work',
  'http://high-level.nomoredomains.work',
];

// Коды ошибок
const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const TOO_MANY_REQUESTS = 429;

// Сообщения ошибок
const OK_MOVIE_DELETE = 'Фильм удалён';
const SUCCESSFUL_COOKIE = 'Кука успешно добавлена в хранилище';
const NOT_FOUND_PAGE = 'Страница по указанному маршруту не найдена';
const NOT_FOUND_MOVIE_MESSAGE = 'Фильм с указанным _id не найдена.';
const NOT_FOUND_MOVIEID = 'Передан несуществующий _id фильма.';
const NOT_FOUND_USERID = 'Пользователь по указанному _id не найден.';
const NOT_FOUND_USER = 'Неправильные почта или пароль';
const BAD_REQUEST_MESSAGE = 'Переданы некорректные данные при создании карточки.';
const BAD_REQUEST_MOVIE_DELETE = 'Переданы некорректные данные при удаление фильма.';
const BAD_REQUEST_MOVIE_GET = 'Переданы некорректные данные для получения фильмов.';
const BAD_REQUEST_PUT_LIKE = 'Переданы некорректные данные для постановки лайка.';
const BAD_REQUEST_DEL_LIKE = 'Переданы некорректные данные для удаления лайка.';
const BAD_REQUEST_CREATE_USER = 'Переданы некорректные данные при создании пользователя.';
const BAD_REQUEST_SEARCH_USER = 'Переданы некорректные данные при поиске пользователя.';
const UNAUTHORIZED_MOVIE = 'Данный фильм пренодлежит другому пользователю';
const CONFLICT_EMAIL = 'Пользователь с такой почтой уже существует';
const INTERNAL_SERVER_ERROR_MESSAGE = 'Произошла неизвестная ошибка, проверьте корректность запроса';

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  TOO_MANY_REQUESTS,
  OK_MOVIE_DELETE,
  SUCCESSFUL_COOKIE,
  NOT_FOUND_PAGE,
  NOT_FOUND_MOVIE_MESSAGE,
  NOT_FOUND_MOVIEID,
  NOT_FOUND_USERID,
  NOT_FOUND_USER,
  BAD_REQUEST_MESSAGE,
  BAD_REQUEST_MOVIE_DELETE,
  BAD_REQUEST_MOVIE_GET,
  BAD_REQUEST_PUT_LIKE,
  BAD_REQUEST_DEL_LIKE,
  BAD_REQUEST_CREATE_USER,
  BAD_REQUEST_SEARCH_USER,
  UNAUTHORIZED_MOVIE,
  CONFLICT_EMAIL,
  INTERNAL_SERVER_ERROR_MESSAGE,
  allowedCors,
  RegExpUrl,
};
