import { useState, useEffect } from "react";
import AppointmentContext from "./AppointmentContext";
import fetchAppointments from "../helpers/fetchAppointments";

function AppointmentContextProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [sortColumn, setSortColumn] = useState("pet_name");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAppointments(searchTerm, sortColumn, sortOrder);
      if (data.error) {
        setError(data.error);
      } else {
        setAppointments(data.data);
      }
    };

    fetchData();
  }, [sortColumn, sortOrder, searchTerm]); 

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        setAppointments,
        error,
        setError,
        showForm,
        setShowForm,
        sortColumn,
        setSortColumn,
        sortOrder,
        setSortOrder,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export default AppointmentContextProvider;
