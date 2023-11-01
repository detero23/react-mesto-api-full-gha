const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const IncorrectDataError = require('../errors/IncorrectDataError');
const NotFoundError = require('../errors/NotFoundError');
const AlreadyExistError = require('../errors/AlreadyExistError');
const NoAuthError = require('../errors/NoAuthError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Ошибка валидации'));
      } else next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const nopass = user.toObject();
      delete nopass.password;
      res.status(201).send({ data: nopass });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Ошибка валидации при создании пользователя'));
      } else if (err.code === 11000) {
        next(new AlreadyExistError('Пользователь с таким email уже существует'));
      } else next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new IncorrectDataError('Wrong email or password'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new IncorrectDataError('Wrong email or password'));
        }

        return user;
      });
    })
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'My_Custom_Secret', {
          expiresIn: '7d',
        }),
      });
    })
    .catch((err) => {
      if (err.message === 'Wrong email or password') {
        next(new NoAuthError('Некорректный email или пароль'));
      } else next(err);
    });
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Некорректные данные пользователя'));
      } else if (err.name === 'NotFoundError') {
        next(new NotFoundError('Пользователь не найден'));
      } else next(err);
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Некорректные данные пользователя'));
      } else if (err.name === 'NotFoundError') {
        next(new NotFoundError('Пользователь не найден'));
      } else next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Ошибка валидации при обновлении данных пользователя'));
      } else if (err.name === 'NotFoundError') {
        next(new NotFoundError('Пользователь не найден при обновлении данных пользователя'));
      } else next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Ошибка валидации при обновлении аватара'));
      } else if (err.name === 'CastError') {
        next(new IncorrectDataError('Некорректные данные пользователя при обновлении аватара'));
      } else if (err.name === 'NotFoundError') {
        next(new NotFoundError('Пользователь не найден при обновлении аватара'));
      } else next(err);
    });
};
