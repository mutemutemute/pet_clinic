import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext } from "react";
import AppointmentContext from "../contexts/AppointmentContext";
import UserContext from "../contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const AddAppointment = () => {
  const { error, setError, setShowForm, setAppointments, update } =
    useContext(AppointmentContext);
  const { user } = useContext(UserContext);

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formdata) => {
    try {
      const payload = {
        ...formdata,
        status: "Pending",
        rating: null,
        user_id: user.id,
      };

      const response = await axios.post(`${API_URL}/appointments`, payload, {
        withCredentials: true,
      });

      const newAppointment = response.data?.data || response.data || response;

      setAppointments((prev) => ({
        ...prev,
        list: [...prev.list, newAppointment],
      }));
      reset();
      window.alert("Appointment added successfully!");

      setShowForm(false);
      update();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex justify-center items-center gap-3 space-y-2">
          <label htmlFor="pet_name" className="text-sm ">
            Pet Name
          </label>
          <input
            {...register("pet_name", {
              required: "Pet name is required",
            })}
            type="text"
            placeholder="Pet's Name"
            className="input input-bordered mt-1 p-2  rounded-md w-full flex-1"
          />

          {errors.pet_name && (
            <div className="relative">
              <p className="text-red-500 text-sm absolute whitespace-nowrap right-[1.5rem] top-[1.2rem] md:right-[29.4rem] lg:right-[44.4rem]">
                {errors.pet_name.message}
              </p>
            </div>
          )}
        </div>

        <div className="mb-4 flex justify-center items-center gap-2 space-y-2">
          <label htmlFor="pet_owner" className="text-sm ">
            Pet Owner
          </label>
          <input
            {...register("pet_owner", {
              required: "Owner's name is required",
            })}
            type="text"
            placeholder="Owner's Name"
            className="input input-bordered mt-1 p-2  rounded-md w-full flex-1"
          />
          {errors.pet_owner && (
            <div className="relative">
              <p className="text-red-500 text-sm absolute whitespace-nowrap right-[-0.5rem] top-[1.2rem] md:right-[27.5rem] lg:right-[42.5rem]">
                {errors.pet_owner.message}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col md:grid grid-cols-2 ">
          <div className="mb-4 flex justify-center items-center ml-9 md:mx-9 gap-2 space-y-2">
            <label htmlFor="appointment_date" className="block text-sm">
              Date
            </label>
            <input
              {...register("appointment_date", {
                required: "Date is required",
              })}
              type="date"
              min={today}
              className="mt-1 p-2 rounded-md w-full input input-bordered"
            />
            {errors.appointment_date && (
              <div className="relative">
                <p className="text-red-500 text-sm absolute whitespace-nowrap right-[3.2rem] top-[1.2rem] md:right-[7.9rem] lg:right-[15.4rem]">
                  {errors.appointment_date.message}
                </p>
              </div>
            )}
          </div>

          <div className="mb-4 flex justify-center items-center gap-2 ml-9 md:ml-16 space-y-2">
            <label htmlFor="appointment_time" className="text-sm">
              Time
            </label>
            <input
              {...register("appointment_time", {
                required: "Time is required",
                min: 1,
              })}
              type="time"
              min="08:00"
              max="17:00"
              className="mt-1 p-2 input input-bordered rounded-md w-full "
            />
            {errors.appointment_time && (
              <div className="relative">
                <p className="text-red-500 text-sm absolute whitespace-nowrap right-[3.2rem] top-[1.2rem] md:right-[8.3rem] lg:right-[15.8rem]">
                  {errors.appointment_time.message}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4 flex justify-center gap-2 space-y-2">
          <label htmlFor="notes" className="block text-sm mt-2">
            Apt. Notes
          </label>
          <textarea
            {...register("notes", {
              required: "Appointment notes are required",
            })}
            placeholder="Appointment Notes"
            className="input input-bordered mt-1 p-2 rounded-md w-full h-32 flex-1"
          />
          {errors.notes && (
            <div className="relative">
              <p className="text-red-500 text-sm absolute whitespace-nowrap right-[-0.5rem] top-[8.3rem] md:right-[24.8rem] lg:right-[39.8rem]">
                {errors.notes.message}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-2 pb-2">
          <button
            type="submit"
            className="btn px-4 py-2 bg-[#431592] text-white "
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
