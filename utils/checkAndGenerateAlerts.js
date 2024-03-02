const Category = require("../models/category");
const Alert = require("../models/alert");
const Expense = require("../models/expenses");

 async function checkAndGenerateAlerts(userId, categoryId) {
    const category = await Category.findById(categoryId);
    if (!category || !category.budget) return; // Exit if no category or no budget set
  
    const expenses = await Expense.find({ userId, category: categoryId });
    const totalSpent = expenses.reduce((acc, cur) => acc + cur.amount, 0);
  
    let message = "";
    if (totalSpent >= category.budget) {
      message = `You have exceeded your budget for ${category.name}.`;
    } else if (totalSpent >= category.budget * 0.9) { // 90% of budget as threshold
      message = `You are nearing your budget limit for ${category.name}.`;
    }
  
    if (message) {
      await Alert.create({ categoryId, userId, message });
    }
  }
  

  module.exports = { checkAndGenerateAlerts };
