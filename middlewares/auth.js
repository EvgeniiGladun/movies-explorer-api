require('dotenv').config();
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET_DEV } = require('../constants');

const { UNAUTHORIZED_JWT } = require('../constants');
const Unauthorized = require('../errors/Unauthorized');

const auth = (req, res, next) => {
  const JWT = req.cookies.jwt;

  if (!JWT) {
    throw next(new Unauthorized(UNAUTHORIZED_JWT));
  }

  const token = JWT;
  let payload = '';

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    throw next(new Unauthorized(UNAUTHORIZED_JWT));
  }

  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
