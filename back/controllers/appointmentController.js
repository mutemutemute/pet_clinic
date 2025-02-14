const {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  filterAppointments,
  searchAppointments,
  getAppointmentById,
  getAppointmentsByUserId,
  filterUserAppointments,
  searchUserAppointments,
} = require("../models/appointmentModel");

exports.createNewAppointment = async (req, res, next) => {
  const newAppointment = {
    ...req.body,
    status: "Pending",
    rating: null,
    user_id: req.user.id,
  };
  try {
    const appointment = await createAppointment(newAppointment);

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

    res.status(200).json({
      status: "success",
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllAppointmentsByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { page, limit } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;
    const appointments = await getAppointmentsByUserId(id, limit, offset);
    res.status(200).json({
      status: "success",
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateThisAppointment = async (req, res, next) => {
  const { id } = req.params;
  const { id: user_id, role } = req.user;

  try {
    const isAdmin = role === "admin";

    const updatedData = isAdmin
      ? { ...req.body, id }
      : { ...req.body, id, user_id };

    const appointment = await updateAppointment(updatedData, isAdmin);

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

exports.filterUserAppointments = async (req, res, next) => {
  try {
    const { id } = req.params;

    let { page, limit, sortColumn, sortOrder } = req.query;

    page = page ? parseInt(page) : null;
    limit = limit ? parseInt(limit) : null;
    const offset = page && limit ? (page - 1) * limit : null;

    const appointments = await filterUserAppointments(
      id,
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

exports.searchAllAppointmentsByPetName = async (req, res, next) => {
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

exports.searchUserAppointmentsByPetName = async (req, res, next) => {
  try {
    const { id } = req.params;

    let { pet_name, page, limit } = req.query;
    console.log(req.query);

    page = page ? parseInt(page) : null;
    limit = limit ? parseInt(limit) : null;
    const offset = page && limit ? (page - 1) * limit : null;

    const appointments = await searchUserAppointments(
      id,
      pet_name,
      limit,
      offset
    );

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
