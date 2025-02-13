import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const fetchAppointmentsById = async (id, searchTerm = "", sortColumn = "pet_name", sortOrder = "ASC") => {
    try {
        let endpoint = `${API_URL}/appointments/user/${id}`;
    
        if (searchTerm) {
          endpoint += "/search";
        } else {
          endpoint += "/filter";
        }
    
        const response = await axios.get(endpoint, {
          params: {
            pet_name: searchTerm ? searchTerm : undefined,
            sortColumn: sortColumn || "pet_name", 
            sortOrder: sortOrder || "ASC", 
          },
        });
    
        return response.data;
      } catch (error) {
        return { error: error.message };
      } 
};

export default fetchAppointmentsById;