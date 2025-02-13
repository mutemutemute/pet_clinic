import { Link } from "react-router";
import { useContext } from "react";
import AppointmentContext from "../contexts/AppointmentContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AppointmentTableRow = ({ appointment }) => {
  const { id, pet_name, pet_owner, appointment_date, appointment_time, notes, status } =
    appointment;
  const { setError, setAppointments } = useContext(AppointmentContext);

  const date = new Date(appointment_date)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    })
    .replace(" ", "-");

    const [hour, minute] = appointment_time
    ? appointment_time.split(":")
    : ["00", "00"];
  const time = new Date(`1970-01-01T${hour}:${minute}:00`)
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this invoice?"
    );

    if (confirmed) {
      setAppointments((prev) =>
        prev.filter((appointment) => appointment.id !== id)
      );
    }

    try {
      await axios.delete(`${API_URL}/appointments/${id}`, {
        withCredentials: true,
      });
      window.alert("Appointment deleted successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="grid grid-cols-3 border-b border-gray-300 p-4 w-full">
      <div className="flex flex-col items-start space-y-1">
        <Link to={`edit/${id}`}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>

      <div className="text-center text-sm mr-5">
        <p className="text-[#431592]">{pet_name}</p>
        <p className="text-gray-600">Owner: {pet_owner}</p>
        <p className="text-gray-500">{notes}</p>
      </div>

      <div className="text-right">
        <p className="text-sm mb-2">
          {date} {time}
        </p>
        <button className="btn bg-[#431592] text-white">{status}</button>
      </div>
      
    </div>
  );
};

export default AppointmentTableRow;
