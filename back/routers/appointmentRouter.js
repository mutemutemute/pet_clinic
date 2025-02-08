const express = require("express");
const {
  createNewAppointment,
  getAllAppointments,
  updateThisAppointment,
  deleteThisAppointment,
  filterAllAppointments,
  filterAllAppointmentsByPetName,
} = require("../controllers/appointmentController");
const validate = require("../validators/validate");
const router = express.Router();
const validatePagination = require("../validators/pagination");
const validateNewAppointment = require("../validators/newappointment");
const validateAppointmentId = require("../validators/appointmentid");
const validateFilter = require("../validators/filter");

router
  .route("/")
  .post(validateNewAppointment, validate, createNewAppointment)
  .get(validatePagination, validate, getAllAppointments);
router
  .route("/filter")
  .get(validateFilter, validatePagination, validate, filterAllAppointments);
router
  .route("/search")
  .get(validatePagination, validate, filterAllAppointmentsByPetName);
router
  .route("/:id")
  .patch(validateAppointmentId, validate, updateThisAppointment)
  .delete(validateAppointmentId, validate, deleteThisAppointment);

module.exports = router;
