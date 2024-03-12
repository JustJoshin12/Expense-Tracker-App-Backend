const router = require("express").Router();

const {
  createIncome,
  getIncomes,
  updateIncome,
  deleteIncome,
} = require("../controllers/income");

const { authorize } = require("../middleware/auth");
const { validateId, validateIncomeBody } = require("../middleware/validation");

//CRUD

//Create
router.post("/", authorize, validateIncomeBody, createIncome);

//Read
router.get("/", authorize, getIncomes);

//Update
router.patch("/:id", authorize, validateIncomeBody, updateIncome);

//Delete
router.delete("/:id", authorize, validateId, deleteIncome);

module.exports = router;
