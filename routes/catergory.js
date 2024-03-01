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
router.patch("/:id", authorize, validateCategoryBody, updateCategory);

//Delete
router.delete("/:id", authorize, validateId, deleteCategory);

module.exports = router;
