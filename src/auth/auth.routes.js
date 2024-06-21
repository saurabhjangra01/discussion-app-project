const express = require("express");
const router = express.Router();
const AuthController = require("./auth.controller");
const {
    validate,
    loginValidator,
    signupValidator,
} = require("./../utils/validator");

router.post("/signup", validate(signupValidator), AuthController.signup);
router.post("/login", validate(loginValidator), AuthController.login);

module.exports = router;
