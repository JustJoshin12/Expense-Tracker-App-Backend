const mongoose = require('mongoose');

const alert = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  threshold: {
    type: Number,
    required: false, 
  },
  timeFrame: {
    type: Number,
    required: false, 
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("alert", alert);

