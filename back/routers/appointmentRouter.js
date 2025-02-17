const express = require("express");
const {
  createNewAppointment,
  getAllAppointments,
  updateThisAppointment,
  deleteThisAppointment,
  filterAllAppointments,
  searchAllAppointmentsByPetName,
  getThisAppointment,
  getAllAppointmentsByUserId,
  filterUserAppointments,
  searchUserAppointmentsByPetName
} = require("../controllers/appointmentController");
const {allowAccessTo} = require("../controllers/authController");
const validate = require("../validators/validate");
const router = express.Router();
const validatePagination = require("../validators/pagination");
const validateNewAppointment = require("../validators/newappointment");
const validateAppointmentId = require("../validators/appointmentid");
const validateFilter = require("../validators/filter");
const { protect } = require("../controllers/authController");
const validateUserId = require("../validators/userid");
const validateSearch = require("../validators/search");

router
  .route("/")
  .post(protect, validateNewAppointment, validate, createNewAppointment)
  .get( protect, allowAccessTo("admin"), validatePagination, validate, getAllAppointments);
router
  .route("/filter")
  .get(protect, validateFilter, validatePagination, validate, filterAllAppointments);
router
  .route("/search")
  .get(protect, validateSearch, validatePagination, validate, searchAllAppointmentsByPetName);
router
  .route("/:id")
  .get(protect,validateAppointmentId, validate, getThisAppointment)
  .patch(protect, validateAppointmentId, validate, updateThisAppointment)
  .delete(protect, validateAppointmentId, validate, deleteThisAppointment);
router
  .route("/user/:id")
  .get(protect,validateUserId, validatePagination, validate, getAllAppointmentsByUserId);
router
  .route("/user/:id/filter")
  .get(protect, validateUserId, validateFilter, validatePagination, validate, filterUserAppointments);
router
  .route("/user/:id/search")
  .get(protect, validateUserId, validateSearch, validatePagination, validate, searchUserAppointmentsByPetName);

module.exports = router;
