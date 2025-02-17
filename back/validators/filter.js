const { query } = require("express-validator");

const validColumns = ["pet_name", "pet_owner", "appointment_date"];
const validDirections = ["ASC", "DESC"];

const validateFilter = [
  query("sortColumn")
    .optional()
    .isString()
    .isIn(validColumns)
    .withMessage(
      `Invalid sortColumn. Must be one of: ${validColumns.join(", ")}`
    )
    .trim(),

  query("sortOrder")
    .optional()
    .trim()
    .toUpperCase()
    .isString()
    .isIn(validDirections)
    .withMessage(
      `Invalid sortOrder. Must be one of: ${validDirections.join(", ")}`
    ),
];

module.exports = validateFilter;
