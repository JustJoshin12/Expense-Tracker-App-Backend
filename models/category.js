const mongoose = require('mongoose');


const Category = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  budget: {
    type: Number,
    required: false // Making the budget optional allows for categories without a set spending limit.
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

module.exports = mongoose.model("category", Category)
