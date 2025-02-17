import { useContext } from "react";
import AppointmentContext from "../contexts/AppointmentContext";
import AppointmentTableRow from "./AppointmentTableRow";

const AppointmentTable = () => {
  const { appointments } = useContext(AppointmentContext);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full">
        {appointments.list && appointments.list.length > 0 ? (
          appointments.list.map((appointment, index) => (
            <AppointmentTableRow
              key={
                appointment.id
                  ? `appointment-${appointment.id}`
                  : `index-${index}`
              }
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
