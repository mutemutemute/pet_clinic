import { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import AppointmentContext from "../contexts/AppointmentContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Rating({ id }) {
  const { appointments, setAppointments, setError } =
    useContext(AppointmentContext);

  const appointment = appointments.list.find((a) => a.id === id);
  if (!appointment) return null;
  const { rating: initialRating, status } = appointment;

  if (status !== "Closed") {
    return null;
  }

  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRatingUpdate = async (newRating) => {
    try {
      const response = await axios.patch(
        `${API_URL}/appointments/${id}`,
        { rating: newRating },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setRating(newRating);

        setAppointments((prev) => ({
          ...prev,
          list: prev.list.map((appointment) =>
            appointment.id === id
              ? { ...appointment, rating: newRating }
              : appointment
          ),
        }));
      }
    } catch (error) {
      setError("Could not update rating. Please try again.");
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={18}
          onClick={() => handleRatingUpdate(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          color={(hover || rating) >= star ? "#ffc107" : "#e4e5e9"}
          className="cursor-pointer"
        />
      ))}
    </div>
  );
}

export default Rating;
