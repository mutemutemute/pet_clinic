import { useContext } from "react";
import AppointmentContext from "../contexts/AppointmentContext";
import AppointmentTableRow from "./AppointmentTableRow";

const AppointmentTable = () => {
  const { appointments } = useContext(AppointmentContext);

  
  

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="h-100 overflow-y-auto w-full">
        {appointments ? (
          appointments.map((appointment) => (
            <AppointmentTableRow
              key={appointment.id}
              appointment={appointment}
            />
          ))
        ) : (
          <p>No appointments found</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentTable;
