import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext } from "react";
import AppointmentContext from "../contexts/AppointmentContext";

const API_URL = import.meta.env.VITE_API_URL;

const AddAppointment = () => {
  const { setAppointments, error, setError, setShowForm } =
    useContext(AppointmentContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formdata) => {
    try {
      const { data: response } = await axios.post(
        `${API_URL}/appointments`,
        formdata,
        { withCredentials: true }
      );
      setAppointments((prev) => [...prev, response]);
      reset();
      window.alert("Appointment added successfully!");
      setShowForm(false);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="pet_name"
            className="block text-sm font-medium text-gray-300"
          >
            Pet Name
          </label>
          <input
            {...register("pet_name", {
              required: "Pet name is required",
            })}
            type="text"
            placeholder="Pet's Name"
            className="input input-bordered mt-1 p-2  rounded-md w-full"
          />
          {errors.pet_name && (
            <p className="text-red-500 text-sm">{errors.pet_name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="pet_owner"
            className="block text-sm font-medium text-gray-300"
          >
            Pet Owner
          </label>
          <input
            {...register("pet_owner", {
              required: "Owner's name is required",
            })}
            type="text"
            placeholder="Owner's Name"
            className="input input-bordered mt-1 p-2  rounded-md w-full"
          />
          {errors.pet_owner && (
            <p className="text-red-500 text-sm">{errors.pet_owner.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="appointment_date"
            className="block text-sm font-medium text-gray-300 "
          >
            Date
          </label>
          <input
            {...register("appointment_date", {
              required: "Date is required",
            })}
            type="date"
            className="mt-1 p-2 rounded-md w-full input input-bordered"
          />
          {errors.appointment_date && (
            <p className="text-red-500 text-sm">
              {errors.appointment_date.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="appointment_time"
            className="block text-sm font-medium text-gray-300"
          >
            Time
          </label>
          <input
            {...register("appointment_time", {
              required: "Time is required",
              min: 1,
            })}
            type="time"
            className="mt-1 p-2 input input-bordered rounded-md w-full "
          />
          {errors.appointment_time && (
            <p className="text-red-500 text-sm">
              {errors.appointment_time.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-300"
          >
            Apt. Notes
          </label>
          <textarea
            {...register("notes", {
              required: "Appointment notes are required",
            })}
            placeholder="Appointment Notes"
            className="input input-bordered mt-1 p-2 rounded-md w-full h-32"
          />
          {errors.notes && (
            <p className="text-red-500 text-sm">{errors.notes.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="btn  px-4 py-2 bg-[#431592] text-white"
          >
            Add Appointment
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </>
  );
};

export default AddAppointment;
