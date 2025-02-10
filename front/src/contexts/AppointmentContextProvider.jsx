import { useState } from "react";
import AppointmentContext from "./AppointmentContext";
import { useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function AppointmentContextProvider({ children }) {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false); 
    
    
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${API_URL}/appointments`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
  
    useEffect(() => {
      fetchAppointments();
    }, []);
   

    return (
        <AppointmentContext.Provider value={{ appointments, setAppointments, error, setError,showForm, setShowForm }}>
            {children}
        </AppointmentContext.Provider>
    );
}

export default AppointmentContextProvider;