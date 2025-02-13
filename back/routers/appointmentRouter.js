const express = require("express");
const {
  createNewAppointment,
  getAllAppointments,
  updateThisAppointment,
  deleteThisAppointment,
  filterAllAppointments,
  filterAllAppointmentsByPetName,
  getThisAppointment,
} = require("../controllers/appointmentController");
const validate = require("../validators/validate");
const router = express.Router();
const validatePagination = require("../validators/pagination");
const validateNewAppointment = require("../validators/newappointment");
const validateAppointmentId = require("../validators/appointmentid");
const validateFilter = require("../validators/filter");
const {protect} = require("../controllers/authController");

router
  .route("/")
  .post(protect, validateNewAppointment, validate, createNewAppointment)
  .get(validatePagination, validate, getAllAppointments);
router
  .route("/filter")
  .get(validateFilter, validatePagination, validate, filterAllAppointments);
router
  .route("/search")
  .get(validatePagination, validate, filterAllAppointmentsByPetName);
router
  .route("/:id")
  .get(validateAppointmentId, validate, getThisAppointment)
  .patch(validateAppointmentId, validate, updateThisAppointment)
  .delete(validateAppointmentId, validate, deleteThisAppointment);

module.exports = router;
