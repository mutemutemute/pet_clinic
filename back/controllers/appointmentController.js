const {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  filterAppointments,
  searchAppointments,
  getAppointmentById
} = require("../models/appointmentModel");

exports.createNewAppointment = async (req, res, next) => {
  const newAppointment = req.body;

  try {
    const appointment = await createAppointment(newAppointment);
    appointment.id = undefined;
    res.status(201).json({
      status: "success",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllAppointments = async (req, res, next) => {
  try {
    let { page, limit } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    const appointments = await getAppointments(limit, offset);
    // const appointmentsWithoutId = appointments.map(({ id, ...rest }) => rest);

    res.status(200).json({
      status: "success",
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateThisAppointment = async (req, res, next) => {
  const id = req.params.id;
  const updatedAppointment = req.body;

  try {
    const appointment = await updateAppointment(id, updatedAppointment);

    res.status(200).json({
      status: "success",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteThisAppointment = async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteAppointment(id);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

exports.filterAllAppointments = async (req, res, next) => {
  try {
    let { page, limit, sortColumn, sortOrder } = req.query;

    page = page ? parseInt(page) : null;
    limit = limit ? parseInt(limit) : null;
    const offset = page && limit ? (page - 1) * limit : null;

    const appointments = await filterAppointments(
      limit,
      offset,
      sortColumn,
      sortOrder
    );

    res.status(200).json({
      status: "success",
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

exports.filterAllAppointmentsByPetName = async (req, res, next) => {
  try {
    let { pet_name, page, limit } = req.query;

    page = page ? parseInt(page) : null;
    limit = limit ? parseInt(limit) : null;
    const offset = page && limit ? (page - 1) * limit : null;

    const appointments = await searchAppointments(pet_name, limit, offset);

    res.status(200).json({
      status: "success",
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

exports.getThisAppointment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const appointment = await getAppointmentById(id);
    res.status(200).json({
      status: "success",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};