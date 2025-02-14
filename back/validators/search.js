const { query } = require("express-validator");


const validateSearch = [
    query("pet_name")
        .optional()
        .trim()
        .isString()
        .withMessage("Pet name must be a string")
        .isLength({ min: 1, max: 50 })
        .withMessage("Pet name must be between 1 and 50 characters"),
];

module.exports = validateSearch;