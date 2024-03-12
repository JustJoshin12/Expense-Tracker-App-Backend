const Income = require("../models/income");
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");

//Create new income
const createIncome = (req, res, next) => {
  const { category, amount, title, description, date } = req.body;
  if (!amount || !category || !title || !description || !date) {
    return next(new BadRequestError("These fields are required"));
  }

  Income.create({
    userId: req.user._id,
    category,
    amount,
    title,
    description,
    date,
  })
    .then((income) => res.status(201).json(income))
    .catch((err) => next(err));
};

// get all incomes
const getIncomes = (req, res, next) => {
  Income.find({})
    .then((income) => res.json(income))
    .catch((err) => next(err));
};

//Update a income
const updateIncome = (req, res, next) => {
  const { category, amount, title, description, date } = req.body;

  Income.findByIdAndUpdate(
    req.params.id,
    { category, amount, title, description, date },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError("Income not found"))
    .then((expense) => res.json(expense))
    .catch((err) => next(err));
};

//Delete a income
const deleteIncome = (req, res, next) => {
  Income.findByIdAndDelete(req.params.id)
    .orFail(new NotFoundError("Income not found"))
    .then(() => res.json({ message: "Income deleted successfully" }))
    .catch((err) => next(err));
};


module.exports = {
    createIncome,
    getIncomes,
    updateIncome,
    deleteIncome
};