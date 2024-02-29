const router = require("express").Router();

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/catergory");

const { authorize } = require("../middleware/auth");
const {
  validateId,
  validateCategoryBody,
} = require("../middleware/validation");

//CRUD

//Create
router.post("/", authorize, validateCategoryBody, createCategory);

//Read
router.get("/", authorize, getCategories);

//Update
router.patch("/", authorize, validateCategoryBody, updateCategory);

//Delete
router.delete(":name", authorize, validateId, deleteCategory);

module.exports = router;
