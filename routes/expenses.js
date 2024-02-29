const router = require("express").Router();

const {
    createExpense,
    getAllExpenses,
    updateExpense,
    deleteExpense
} = require("../controllers/expenses");

const { authorize } = require("../middleware/auth");
const { validateId, validateExpenseBody } = require("../middleware/validation");

//CRUD

//Create
router.post("/", authorize, validateExpenseBody, createExpense);

//Read
router.get("/", authorize, getAllExpenses);

//Update
router.patch("/", authorize, validateExpenseBody, updateExpense);

//Delete 
router.delete("/:name", authorize, validateId, deleteExpense);


module.exports = router;

