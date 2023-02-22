const users = require('express').Router();
const { updateProfileValidate } = require('../middlewares/validateCelebrate');

const {
  readMeProfile,
  updateMeProfile,
} = require('../controllers/users');

users.get('/me', readMeProfile);
users.patch('/me', updateProfileValidate, updateMeProfile);

// Экспортируем "роутер"
module.exports = users;
