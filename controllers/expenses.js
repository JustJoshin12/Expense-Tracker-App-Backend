const Expense = require("../models/Expense");
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");

// Create a new expense
const createExpense = (req, res, next) => {
  const { category, amount, title, description, date } = req.body;
  if (!amount || !category) {
    return next(new BadRequestError("Category and amount are required"));
  }
  Expense.findOne({})
  Expense.create({ userId: req.user._id, category, amount, title, description, date })
    .then((expense) => res.status(201).json(expense))
    .catch((err) => next(err));
};

// Get all expenses for a user
const getAllExpenses = (req, res, next) => {
  Expense.find({ userId: req.user._id })
    .then((expenses) => res.json(expenses))
    .catch((err) => next(err));
};

// Update an expense
const updateExpense = (req, res, next) => {
  const { category, amount, title, description, date } = req.body;

  Expense.findByIdAndUpdate(
    req.params.id,
    { category, amount, title, description, date },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError("Expense not found"))
    .then((expense) => res.json(expense))
    .catch((err) => next(err));
};

// Delete an expense
const deleteExpense = (req, res, next) => {
  Expense.findByIdAndDelete(req.params.id)
    .orFail(new NotFoundError("Expense not found"))
    .then(() => res.json({ message: "Expense deleted successfully" }))
    .catch((err) => next(err));
};

module.exports = {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
};
