const express = require("express");
const { register, login, profile } = require("../controllers/usersController");
const {
  registerValidations,
  loginValidations,
} = require("../validations/userValidation");
const router = express.Router();

router.post("/register", registerValidations, register);
router.post("/login", loginValidations, login);
router.get("/profile", profile);
module.exports = router;
