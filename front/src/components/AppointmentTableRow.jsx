import { Link } from "react-router";
import { useContext, useState } from "react";
import AppointmentContext from "../contexts/AppointmentContext";
import axios from "axios";
import Rating from "./Rating";
import UserContext from "../contexts/UserContext";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

const API_URL = import.meta.env.VITE_API_URL;

const validStatuses = ["Pending", "Confirmed", "Closed"];

const AppointmentTableRow = ({ appointment }) => {
  const {
    id,
    pet_name,
    pet_owner,
    appointment_date,
    appointment_time,
    notes,
    status,
  } = appointment;
  const { setError, setAppointments, update } = useContext(AppointmentContext);
  const { user } = useContext(UserContext);

  const [selectedStatus, setSelectedStatus] = useState(status);

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
      "Are you sure you want to delete this appointment?"
    );

    if (confirmed) {
      setAppointments((prev) => ({
        ...prev,
        list: prev.list.filter((appointment) => appointment.id !== id),
      }));
    }

    try {
      await axios.delete(`${API_URL}/appointments/${id}`, {
        withCredentials: true,
      });
      window.alert("Appointment deleted successfully!");
      update();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setSelectedStatus(newStatus);

    try {
      const response = await axios.patch(
        `${API_URL}/appointments/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setAppointments((prev) => ({
          ...prev,
          list: prev.list.map((appointment) =>
            appointment.id === id
              ? { ...appointment, status: newStatus }
              : appointment
          ),
        }));
      }
    } catch (error) {
      setError("Could not update status. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-3 border-b border-gray-300 pt-4 pb-4 w-full">
      <div className="flex flex-col items-start space-y-1">
        <Link
          to={`edit/${id}`}
          className="text-[#431592] border border-[#431592] rounded-sm p-1"
        >
          <FaEdit size={22} />
        </Link>
        <button
          onClick={handleDelete}
          className="text-[#431592] border border-[#431592] rounded-sm p-1"
        >
          <MdDeleteSweep size={22} />
        </button>
      </div>

      <div className="text-center text-sm mr-5">
        <p className="text-[#431592]">{pet_name}</p>
        <p className="text-gray-600">Owner: {pet_owner}</p>
        <p className="text-gray-500">{notes}</p>
      </div>

      <div className="text-right">
        <p className="text-sm ">{date}</p>
        <p className="text-sm">{time}</p>
        <div className="flex justify-end pt-3 pb-3">
          <Rating id={id} />
        </div>

        {user?.role === "admin" ? (
          <select
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="border px-2 py-1 rounded bg-white cursor-pointer w-22 md:w-29"
          >
            {validStatuses.map((statusOption) => (
              <option key={statusOption} value={statusOption}>
                {statusOption}
              </option>
            ))}
          </select>
        ) : (
          <button className="btn bg-[#431592] text-white">{status}</button>
        )}
      </div>
    </div>
  );
};

export default AppointmentTableRow;
