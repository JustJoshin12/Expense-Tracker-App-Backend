const Expenses = require("../models/expenses");
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");

// Create a new expense
const createExpense = async (req, res, next) => {
  const { category, amount, title, description, date } = req.body;
  if (!amount || !category || !title || !description || !date) {
    return next(new BadRequestError("These fields are required"));
  }

  Expenses.create({ category, amount, title, description, date })
    .then((income) => res.status(201).json(income))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Bad Request"));
      }
      next(err);
    });
};

// Get all expenses for a user
const getAllExpenses = (req, res, next) => {
  Expenses.find({ userId: req.user._id })
    .then((expenses) => res.json(expenses))
    .catch((err) => next(err));
};

// Update an expense
const updateExpense = (req, res, next) => {
  const { category, amount, title, description, date } = req.body;

  Expenses.findByIdAndUpdate(
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
  Expenses.findByIdAndDelete(req.params.id)
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
