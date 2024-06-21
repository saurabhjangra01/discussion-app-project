const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");
const auth = require("./../middeware/auth");
const { validate, signupValidator } = require("./../utils/validator");

router.put("/:id", validate(signupValidator), auth, UserController.updateUser);
router.delete("/:id", auth, UserController.deleteUser);
router.get("/search/?", auth, UserController.searchUser);
router.get("/", auth, UserController.getUserList);
router.get("/:id", auth, UserController.getUserDetails);

module.exports = router;
