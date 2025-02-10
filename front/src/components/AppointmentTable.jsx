import { useContext } from "react";
import AppointmentContext from "../contexts/AppointmentContext";
import AppointmentTableRow from "./AppointmentTableRow";

const AppointmentTable = () => {

const {appointments} = useContext(AppointmentContext);

if(appointments.data) console.log(appointments.data);

  
return (
        
        <div className="flex flex-col justify-center items-center">
         
{appointments.data ? (
 appointments.data.map((appointment) => (<AppointmentTableRow key={appointment.id} appointment={appointment} />))
)
: (
    <p>No appointments found</p>
)}   

        </div>
        
    )
}

export default AppointmentTable;