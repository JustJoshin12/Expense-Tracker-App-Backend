const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  category: {
    type: String,
    required: true,
  },
  threshold: {
    type: Number,
    required: true,
    min: 0
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Alert', alertSchema);
