const mongoose = require("mongoose");

const Category = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    budget: {
      type: Number,
      required: false,
    },
    threshold: {
      type: Number,
      required: false,
      min: 0,
      max: 100, 
      default: 90, 
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("category", Category);
