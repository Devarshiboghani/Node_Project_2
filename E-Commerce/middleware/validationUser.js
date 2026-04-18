const { body } = require("express-validator");

const registerValidation = [
    body("Firstname").trim().notEmpty().withMessage("Firstname is Required"),
    body("Lastname").trim().notEmpty().withMessage("Lastname is Required"),
    body("email").trim().notEmpty().withMessage("Email is Required"),
    body("password").trim().notEmpty().withMessage("Password is Required"),
    body("mobileNo").trim().notEmpty().withMessage("MobileNo is Required"),
];

const loginValidation = [
    body("email").trim().notEmpty().withMessage("Email is Required").isEmail().withMessage("Enter Valid Email"),
    body("password").trim().notEmpty().withMessage("Password is Required")
]

module.exports = {registerValidation, loginValidation};