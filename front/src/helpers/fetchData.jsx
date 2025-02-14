import fetchAppointments from "./fetchAppointments";
import fetchAppointmentsById from "./fetchAppointmentsById";

const fetchData = async ({user, searchTerm, sortColumn, sortOrder}) => {
  
    let data;

    if (user.role === "admin") {
      data = await fetchAppointments(searchTerm, sortColumn, sortOrder);
    } else if (user.role === "user") {
      data = await fetchAppointmentsById(
        user.id,
        searchTerm,
        sortColumn,
        sortOrder
      );
    }

    if (data?.error) {
      setError(data.error);
    } else {
      return data.data;
    }
  };

export default fetchData;
