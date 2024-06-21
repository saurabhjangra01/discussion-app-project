const { body, validationResult } = require("express-validator");

const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            // result will have some value when there is a validation error, result empty means validation success
            if (!result.isEmpty()) {
                break;
            }
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};

const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password should atleast have 6 characters"),
];

const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("mobile").notEmpty().withMessage("Mobile is required"),
    ...loginValidator,
];

const discussionValidator = [
    body("text").notEmpty().withMessage("Text is required"),
];

const commentValidator = [
    body("text").notEmpty().withMessage("Text is required"),
    body("discussion_id").notEmpty().withMessage("Discussion id is required"),
];

module.exports = {
    validate,
    loginValidator,
    signupValidator,
    discussionValidator,
    commentValidator,
};
