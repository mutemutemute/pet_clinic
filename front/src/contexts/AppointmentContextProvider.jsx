import { useContext, useState, useEffect } from "react";
import AppointmentContext from "./AppointmentContext";
import fetchAppointments from "../helpers/fetchAppointments";
import fetchAppointmentsById from "../helpers/fetchAppointmentsById";
import UserContext from "./UserContext";

function AppointmentContextProvider({ children }) {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState({ list: [], total: 0 });
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [sortColumn, setSortColumn] = useState("pet_name");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    if (!user || !user.role || !user.id) {
      setAppointments({ list: [], total: 0 });
      return;
    }

    const fetchAllData = async () => {
      let response;
      if (user.role === "admin") {
        response = await fetchAppointments(
          searchTerm,
          sortColumn,
          sortOrder,
          currentPage + 1,
          itemsPerPage
        );
      } else if (user.role === "user") {
        response = await fetchAppointmentsById(
          user.id,
          searchTerm,
          sortColumn,
          sortOrder,
          currentPage + 1,
          itemsPerPage
        );
      } else {
        return;
      }

      const appointmentsArray = response?.data?.appointments || [];
      const totalCount = Number(response?.data?.total_count) || 0;

      if (Array.isArray(appointmentsArray)) {
        setAppointments({
          list: appointmentsArray,
          total: totalCount,
        });
      } else {
        setError("Error fetching appointments");
      }
    };

    fetchAllData();
  }, [user, searchTerm, sortColumn, sortOrder, currentPage, itemsPerPage]);

  const update = () => {
    window.location.reload();
  };

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
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        update,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export default AppointmentContextProvider;
