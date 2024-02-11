const express = require("express");
const {
  register,
  login,
  profile,
  promoteAuditor,
  loginAuditor,
} = require("../controllers/usersController");
const {
  registerValidations,
  loginValidations,
} = require("../validations/userValidation");
const router = express.Router();

router.post("/register", registerValidations, register);
router.post("/promote-auditor/:id", registerValidations, promoteAuditor);
router.post("/login", loginValidations, login);
router.get("/profile", profile);
router.post("/auditors/login", loginValidations, loginAuditor);
module.exports = router;
