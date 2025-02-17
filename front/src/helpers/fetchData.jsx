import fetchAppointments from "./fetchAppointments";
import fetchAppointmentsById from "./fetchAppointmentsById";

const fetchData = async ({
  user,
  searchTerm,
  sortColumn,
  sortOrder,
  setError,
  page = 1,
  limit = 5,
}) => {
  try {
    let data;

    if (!user || !user.role || !user.id) {
      return null;
    }

    if (user.role === "admin") {
      data = await fetchAppointments(
        searchTerm,
        sortColumn,
        sortOrder,
        page,
        limit
      );
    } else if (user.role === "user") {
      data = await fetchAppointmentsById(
        user.id,
        searchTerm,
        sortColumn,
        sortOrder,
        page,
        limit
      );
    } else {
      return null;
    }

    if (data?.error) {
      setError(data.error);
      return null;
    }

    return data;
  } catch (error) {
    setError(error.message);
    return null;
  }
};

export default fetchData;
