const { param } = require("express-validator");
const {getUserWithAppointments} = require("../models/appointmentModel");


const validateUserId = [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("Id must be a positive integer")
      .bail()
      .custom(async (value) => {
            const user = await getUserWithAppointments(value);
            if (!user) {
              throw new Error("User with this id does not have appointments");
            }
            return true;
          }),
  ];
  
  module.exports = validateUserId;