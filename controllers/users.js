const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("../models/users");

const BadRequestError = require("../errors/bad-request-error");
const ConflictError = require("../errors/conflict-error");
const UnauthorizedError = require("../errors/unauthorize-error");
const NotFoundError = require("../errors/not-found-error");
const { JWT_SECRET, NODE_ENV } = require("../utils/config");


//create a new user
const createUser = (req, res, next) => {
  const { name, userName, password, email, avatar, totalIncome } = req.body;

  if (!email) {
    return next(new BadRequestError("Please include an email"));
  }

  return users
    .findOne({ email })
    .then((user) => {
      if (user) {
        next(new ConflictError("A user with this email already exists."));
      }

      return bcrypt.hash(password, 10).then((hash) => {
        users
          .create({ name, avatar, email, password: hash, userName, totalIncome })
          .then((data) =>
            res.send({
              name: data.name,
              avatar: data.avatar,
              email: data.email,
              userName: data.userName,
              totalIncome: data.totalIncome
            }),
          )
          .catch((err) => {
            if (err.name === "ValidationError") {
              next(new BadRequestError("Invalid data entry"));
            }
            if (err.code === 11000) {
              next(new ConflictError("Email already exist"));
            }
            next(err);
          });
      });
    })
    .catch((err) => {
      next(err);
    });
};


//login in user
const login = (req, res, next) => {
  const { email, password } = req.body;

  return users
    .findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("incorrect username or password"));
      }

      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-key",
        {
          expiresIn: "7d",
        },
      );

      return res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      next(new UnauthorizedError("Unauthorize"));
    });
};


//Get current user 
const getCurrentUser = (req, res, next) => {
  users
    .findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new BadRequestError("Invalid data entry"));
      }
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Info not found"));
      }
      next(err);
    });
};


//update user profile
const updateProfile = (req, res, next) => {
  const { name, avatar, userName, totalIncome } = req.body;
  const userId = req.user._id;
  users
    .findByIdAndUpdate(
      userId,
      { name, avatar, userName, totalIncome },
      {
        new: true,
        runValidators: true,
      },
    )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new BadRequestError("Invalid data entry"));
      }
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Info not found"));
      }
      next(err);
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};