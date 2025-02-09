import { useState } from "react";
import AppointmentContext from "./AppointmentContext";

function AppointmentContextProvider({ children }) {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false); 
    

    return (
        <AppointmentContext.Provider value={{ appointments, setAppointments, error, setError,showForm, setShowForm }}>
            {children}
        </AppointmentContext.Provider>
    );
}

export default AppointmentContextProvider;