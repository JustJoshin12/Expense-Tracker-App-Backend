const router = require("express").Router();
const users = require("./users");
const NotFoundError = require("../errors/not-found-error");
const { createUser, login } = require("../controllers/users");
const { authorize } = require("../middleware/auth");
const expenses = require("./expenses");
const category = require("./catergory");
const {validateLoginAuthentication, validateUserInfoBody} = require("../middleware/validation");


router.use("/users", authorize, users);
router.use("/expenses", expenses);
router.use("/category", category);

router.post("/signin",validateLoginAuthentication, login);
router.post("/signup", validateUserInfoBody, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;