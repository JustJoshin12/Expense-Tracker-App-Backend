const Alert = require("../models/alert");
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");

// Set a new alert threshold
const setAlertThreshold = (req, res, next) => {
  const { userId, categoryId, threshold, timeFrame } = req.body;

  // Basic validation
  if (!userId || !categoryId || threshold == null || !timeFrame) {
    return next(new BadRequestError("All fields are required for setting an alert"));
  }

  Alert.create({ userId, categoryId, threshold, timeFrame })
    .then((alert) => res.status(201).json(alert))
    .catch((err) => next(err))

}

// Update an alert threshold
const updateAlertThreshold = (req, res, next) => {
    const { threshold, timeFrame } = req.body;
    const { categoryId } = req.params; // Assuming the alert ID is passed as a URL parameter
  
    // Validate input
    if (!categoryId && !threshold && !timeFrame) {
      return next(new BadRequestError("At least one field must be provided for update"));
    }
  
    const updateData = {};
    if (categoryId) updateData.categoryId = categoryId;
    if (threshold) updateData.threshold = threshold;
    if (timeFrame) updateData.timeFrame = timeFrame;
  
    Alert.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .orFail(new NotFoundError("Alert not found"))
      .then((updatedAlert) => res.json(updatedAlert))
      .catch((err) => next(err));
  };
  
  // Delete an alert
  const deleteAlert = (req, res, next) => {
    const { categoryId } = req.params; // Assuming the alert ID is passed as a URL parameter
  
    Alert.findByIdAndDelete(categoryId)
      .orFail(() => new NotFoundError("Alert not found"))
      .then(() => res.json({ message: "Alert deleted successfully" }))
      .catch((err) => next(err));
  };
  
  module.exports = {
    updateAlertThreshold,
    deleteAlert,
    setAlertThreshold
  };
  