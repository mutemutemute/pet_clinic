import { Link } from "react-router";
const AppointmentTableRow = ({ appointment }) => {
  const { id, pet_name, pet_owner, appointment_date, appointment_time, notes } =
    appointment;
  
    const date = new Date(appointment_date)
    .toLocaleDateString("en-US", {
      month: "short", 
      day: "2-digit",
    })
    .replace(" ", "-");

  const [hour, minute] = appointment_time.split(":");
  const time = new Date(`1970-01-01T${hour}:${minute}:00`)
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();

  return (
    <div className="flex border-b border-gray-300 p-4 w-full justify-between">
      <div className="flex flex-col">
        <p>{pet_name}</p>
        <p>Owner: {pet_owner}</p>
        <p>{notes}</p>
      </div>
      <div>
        <p>
          {date} {time}
        </p>
      </div>
      <Link to={`edit/${id}`}>Edit</Link>
    </div>
  );
};

export default AppointmentTableRow;
