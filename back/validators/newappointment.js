const { body } = require("express-validator");
const validStatuses = ["Pending", "Comfirmed", "Closed"];
const validateNewAppointment = [
  body("pet_name")
    .trim()
    .notEmpty()
    .withMessage("Pet name is required")
    .isString()
    .withMessage("Pet name must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Pet name must be between 3 and 100 characters")
    .isAlpha()
    .withMessage("Pet name must contain only letters"),

  body("pet_owner")
    .trim()
    .notEmpty()
    .withMessage("Pet owner is required")
    .isString()
    .withMessage("Pet owner must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Pet owner must be between 3 and 100 characters"),

  body("appointment_date")
    .trim()
    .notEmpty()
    .withMessage("Appointment date is required")
    .isDate()
    .withMessage("Appointment date must be a valid date"),

  body("appointment_time")
    .trim()
    .notEmpty()
    .withMessage("Appointment time is required")
    .isTime()
    .withMessage("Appointment time must be a valid time"),

  body("notes")
    .trim()
    .optional()
    .isString()
    .withMessage("Notes must be a string")
    .isLength({ min: 3, max: 500 })
    .withMessage("Notes must be between 3 and 500 characters"),

  body("status")
    .trim()
    .optional()
    .isString()
    .withMessage("Status must be a string")
    .isIn(validStatuses)
    .withMessage(`Status must be one of: ${validStatuses.join(", ")}`),
];

module.exports = validateNewAppointment;
