import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const fetchAppointmentsById = async (
  id,
  searchTerm = "",
  sortColumn = "pet_name",
  sortOrder = "ASC",
  page = 1,
  limit = 5
) => {
  try {
    let endpoint = `${API_URL}/appointments/user/${id}`;
    const params = {
      sortColumn: sortColumn || "pet_name",
      sortOrder: sortOrder || "ASC",
      page,
      limit,
    };

    if (searchTerm.trim() !== "") {
      endpoint += "/search";
      params.pet_name = searchTerm.trim();
    } else {
      endpoint += "/filter";
    }

    const response = await axios.get(endpoint, {
      params,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export default fetchAppointmentsById;
