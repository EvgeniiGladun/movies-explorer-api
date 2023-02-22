const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const { NOT_FOUND_USER } = require('../constants');

const Unauthorized = require('../errors/Unauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    validate(email) {
      return validator.isEmail(email);
    },
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function (email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized(NOT_FOUND_USER);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized(NOT_FOUND_USER);
          }

          // Создание секретного ключа
          return user;
        });
    }).catch(next);
};

module.exports = mongoose.model('user', userSchema);
