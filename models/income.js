const mongoose = require("mongoose");
const { Schema } = mongoose;

const IncomeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,  
    required: true,
    enum: ["work", "gift", "item sold"],
  },
  amount: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("income", IncomeSchema);
