const express = require("express");
const { body } = require("express-validator");

const User = require("../models/auth");

const authController = require("../controllers/auth");

const router = express.Router();

router.post("/signup", [
    body("phoneNumber")
    .isLength({min: 8})
    .trim()
    .notEmpty(),body("password")
    .trim()
    .isLength({min: 8, max: 20})
    .notEmpty()
], authController.signup);

router.post("/login", authController.login);

module.exports = router;