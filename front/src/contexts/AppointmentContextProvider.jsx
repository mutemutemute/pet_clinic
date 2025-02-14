import {useContext, useState, useEffect } from "react";
import AppointmentContext from "./AppointmentContext";
import fetchAppointments from "../helpers/fetchAppointments";
import fetchAppointmentsById from "../helpers/fetchAppointmentsById";
import UserContext from "./UserContext";



function AppointmentContextProvider({ children }) {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [sortColumn, setSortColumn] = useState("pet_name");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      
      if(!user || !user.role || !user.id) {
     
        return;
      } 
      let data;
      console.log(user.role)
      if (user.role === 'admin') {
        data = await fetchAppointments(searchTerm, sortColumn, sortOrder);
      } else if (user.role === 'user') {
        data = await fetchAppointmentsById(user.id, searchTerm, sortColumn, sortOrder);
      }
  
      if (data?.error) {
        setError(data.error);
      } else {
        setAppointments(data.data);
        
      }
    };
  
    fetchData();
  }, [user, sortColumn, sortOrder, searchTerm])

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