require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET = '337fd74160df4d86dd7435ef560348417' } = process.env;

const { NOT_FOUND_USER } = require('../constants');
const Unauthorized = require('../errors/Unauthorized');

const auth = (req, res, next) => {
  const JWT = req.cookies.jwt;

  if (!JWT) {
    throw next(new Unauthorized(NOT_FOUND_USER));
  }

  const token = JWT;
  let payload = '';

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw next(new Unauthorized(NOT_FOUND_USER));
  }

  req.user = payload;
  return next();
};

module.exports = {
  auth,
  JWT_SECRET,
};
