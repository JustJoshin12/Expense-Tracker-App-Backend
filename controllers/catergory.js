const Category = require("../models/category");
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");

// Create a new category
const createCategory = (req, res, next) => {
  const { name, budget } = req.body;
  if (!name) {
    return next(new BadRequestError("Name is required for the category"));
  }

  Category.create({ name, budget })
    .then((category) => res.status(201).json(category))
    .catch((err) => next(err));
};

// Get all categories
const getCategories = (req, res, next) => {
  Category.find({})
    .then((categories) => res.json(categories))
    .catch((err) => next(err));
};

// Update a category
const updateCategory = (req, res, next) => {
  const { name, budget, threshold } = req.body;

  Category.findByIdAndUpdate(
    req.params.id,
    { name, budget, threshold },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError("Category not found"))
    .then((category) => res.json(category))
    .catch((err) => next(err));
};

// Delete a category
const deleteCategory = (req, res, next) => {
  Category.findByIdAndDelete(req.params.id)
    .orFail(new NotFoundError("Category not found"))
    .then(() => res.json({ message: "Category deleted successfully" }))
    .catch((err) => next(err));
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
