const { body, validationResult } = require("express-validator");

// Register Validation
const registerValidation = [
    body("name").trim().notEmpty().withMessage("Name is Required"),
    body("email").trim().notEmpty().withMessage("Email is Required").isEmail().withMessage("Enter valid email"),
    body("password").trim().notEmpty().withMessage("Password is Required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("mobileNo").optional().isLength({ min: 10, max: 10 }).withMessage("MobileNo must be 10 digits")
];

// Login Validation
const loginValidation = [
    body("email").trim().notEmpty().withMessage("Email is Required").isEmail().withMessage("Enter valid email"),
    body("password").trim().notEmpty().withMessage("Password is Required"),
];


const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({errors: errors.array()});
    }

    next();
};

module.exports = {registerValidation, loginValidation, validate};