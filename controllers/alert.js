const Alert = require("../models/alert");
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");

// Set a new alert threshold
const setAlertThreshold = (req, res, next) => {
  const { userId, category, threshold, timeFrame } = req.body;

  // Basic validation
  if (!userId || !category || threshold == null || !timeFrame) {
    return next(new BadRequestError("All fields are required for setting an alert"));
  }

  Alert.create({ userId, category, threshold, timeFrame })
    .then((alert) => res.status(201).json(alert))
    .catch((err) => next(err))

}

// Update an alert threshold
const updateAlertThreshold = (req, res, next) => {
    const { category, threshold, timeFrame } = req.body;
    const { id } = req.params; // Assuming the alert ID is passed as a URL parameter
  
    // Validate input
    if (!category && !threshold && !timeFrame) {
      return next(new BadRequestError("At least one field must be provided for update"));
    }
  
    const updateData = {};
    if (category) updateData.category = category;
    if (threshold) updateData.threshold = threshold;
    if (timeFrame) updateData.timeFrame = timeFrame;
  
    Alert.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .orFail(new NotFoundError("Alert not found"))
      .then((updatedAlert) => res.json(updatedAlert))
      .catch((err) => next(err));
  };
  
  // Delete an alert
  const deleteAlert = (req, res, next) => {
    const { id } = req.params; // Assuming the alert ID is passed as a URL parameter
  
    Alert.findByIdAndDelete(id)
      .orFail(() => new NotFoundError("Alert not found"))
      .then(() => res.json({ message: "Alert deleted successfully" }))
      .catch((err) => next(err));
  };
  
  module.exports = {
    // include other functions here as needed
    updateAlertThreshold,
    deleteAlert,
  };
  