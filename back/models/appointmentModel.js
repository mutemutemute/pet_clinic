const { sql } = require("../dbConnection");

exports.createAppointment = async (newAppointment) => {
  const [appointment] = await sql`
      INSERT INTO appointments ${sql(newAppointment, "user_id", "pet_name", "pet_owner", "status", "rating", "appointment_date", "appointment_time", "notes")}
      RETURNING *;
      `;
  return appointment;
};

exports.getAppointments = async (limit, offset) => {
  const appointments = await sql`SELECT appointments.*
      FROM appointments
      ORDER BY appointments.id
      ${
        !isNaN(limit) && !isNaN(offset)
          ? sql`LIMIT ${limit} OFFSET ${offset}`
          : sql``
      } `;
  return appointments;
};

exports.getAppointmentById = async (id) => {
  const [appointment] = await sql`
      SELECT appointments.* 
      FROM appointments
      WHERE appointments.id = ${id}
      `;
  return appointment;
};

exports.getAppointmentsByUserId = async (id, limit, offset) => {
  const appointments = await sql`
      SELECT appointments.* 
      FROM appointments
      WHERE appointments.user_id = ${id}
      ORDER BY appointments.id
      ${
        !isNaN(limit) && !isNaN(offset)
          ? sql`LIMIT ${limit} OFFSET ${offset}`
          : sql``
      } `;
  return appointments;
};

exports.getUserWithAppointments = async (id) => {
  const [appointment] = await sql`
      SELECT appointments.*
      FROM appointments
      WHERE appointments.user_id = ${id}
      `;
  return appointment;
};

exports.updateAppointment = async (id, updatedAppointment) => {
  const [appointment] = await sql`
      UPDATE appointments
      SET ${sql(updatedAppointment, "pet_name", "pet_owner", "appointment_date", "appointment_time", "notes")}
      WHERE appointments.id = ${id}
      RETURNING *;
      `;
  return appointment;
};

exports.deleteAppointment = async (id) => {
  const [appointment] = await sql`
      DELETE FROM appointments
      WHERE appointments.id = ${id}
      RETURNING *;
      `;
  return appointment;
};

exports.filterAppointments = async (limit, offset, sortColumn, sortOrder) => {
  const validColumns = ["pet_name", "pet_owner", "appointment_date"];
  const validDirections = ["ASC", "DESC"];

  const orderColumn = validColumns.includes(sortColumn)
    ? sortColumn
    : "appointment_date";
  const orderDirection = validDirections.includes(sortOrder?.toUpperCase())
    ? sortOrder.toUpperCase()
    : "ASC";

  const appointments = await sql`
      SELECT appointments.* 
      FROM appointments
      
      ORDER BY ${sql.unsafe(orderColumn)} ${sql.unsafe(orderDirection)}
      ${!isNaN(limit) && !isNaN(offset) ? sql`LIMIT ${limit} OFFSET ${offset}` : sql``}
  `;

  return appointments;
};

exports.filterUserAppointments = async (
  id,
  limit,
  offset,
  sortColumn,
  sortOrder
) => {
  const validColumns = ["pet_name", "pet_owner", "appointment_date"];
  const validDirections = ["ASC", "DESC"];

  const orderColumn = validColumns.includes(sortColumn)
    ? sortColumn
    : "appointment_date";
  const orderDirection = validDirections.includes(sortOrder?.toUpperCase())
    ? sortOrder.toUpperCase()
    : "ASC";

  const appointments = await sql`
      SELECT appointments.* 
      FROM appointments
      WHERE appointments.user_id = ${id}
      ORDER BY ${sql.unsafe(orderColumn)} ${sql.unsafe(orderDirection)}
      ${!isNaN(limit) && !isNaN(offset) ? sql`LIMIT ${limit} OFFSET ${offset}` : sql``}
  `;

  return appointments;
};

exports.searchAppointments = async (pet_name, limit, offset) => {
  const petNameFilter = pet_name ? `%${pet_name}%` : "%";

  const appointments = await sql`
      SELECT appointments.*
      FROM appointments
      WHERE appointments.pet_name ILIKE ${petNameFilter}
      ORDER BY appointments.id
      ${
        !isNaN(limit) && !isNaN(offset)
          ? sql`LIMIT ${limit} OFFSET ${offset}`
          : sql``
      }
  `;

  return appointments;
};

exports.searchUserAppointments = async (id, pet_name, limit, offset) => {
  console.log(pet_name);
  
  const petNameFilter = pet_name ? `%${pet_name}%` : "%";
  const appointments = await sql`
      SELECT appointments.*
      FROM appointments
      WHERE appointments.user_id = ${id}
      AND appointments.pet_name ILIKE ${petNameFilter} 
      ORDER BY appointments.id

      ${
        !isNaN(limit) && !isNaN(offset)
          ? sql`LIMIT ${limit} OFFSET ${offset}`
          : sql``
      }
  `;
  return appointments;
};
