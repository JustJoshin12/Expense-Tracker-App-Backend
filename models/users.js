const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Users = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [2, "Name must be at least 2 characters"],
      maxLength: [30, "Name cannot exceed 30 characters"],
    },
    userName: {
      type: String,
      required: [true, "Username is required"],
      minLength: [2, "Username must be at least 2 characters"],
      maxLength: [30, "Username cannot exceed 30 characters"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    avatar: {
      type: String,
      required: [true, "Avatar URL is required"],
      validate: [validator.isURL, "You must enter a valid URL"],
    },
    totalIncome: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

Users.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((data) => {
      if (!data) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return bcrypt.compare(password, data.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }

        return data;
      });
    });
};
module.exports = mongoose.model("users", Users);
