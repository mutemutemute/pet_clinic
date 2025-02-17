const { param } = require("express-validator");
const { getAppointmentById } = require("../models/appointmentModel");

const validateAppointmentId = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Id must be a positive integer")
    .bail()
    .custom(async (value) => {
      const appointment = await getAppointmentById(value);
      if (!appointment) {
        throw new Error("Appointment with this id does not exist");
      }
      return true;
    }),
];

module.exports = validateAppointmentId;
