import { useForm } from "react-hook-form";
import { useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router";
import axios from "axios";
import AppointmentContext from "../contexts/AppointmentContext";

const API_URL = import.meta.env.VITE_API_URL;

const EditAppointment = () => {
  const { error, setError, setAppointments, appointments } =
    useContext(AppointmentContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (formdata) => {
    try {
      const { data: response } = await axios.patch(
        `${API_URL}/appointments/${id}`,
        formdata,
        {
          withCredentials: true,
        }
      );

      setAppointments((prev) => ({
        ...prev,
        list: prev.list.map((appointment) =>
          appointment.id === +id ? response.data : appointment
        ),
      }));

      window.alert("Appointment updated successfully!");

      navigate("/appointments");
    } catch (error) {
      setError(error.message);
    }
  };

  const getAppointment = async () => {
    try {
      const { data: response } = await axios.get(
        `${API_URL}/appointments/${id}`,
        { withCredentials: true }
      );

      const { pet_name, pet_owner, appointment_date, appointment_time, notes } =
        response.data;

      const date = appointment_date
        ? new Date(appointment_date).toISOString().split("T")[0]
        : "";

      setValue("pet_name", pet_name);
      setValue("pet_owner", pet_owner);
      setValue("appointment_date", date);
      setValue("appointment_time", appointment_time);
      setValue("notes", notes);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getAppointment();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className=" w-[17rem] md:w-[45rem] lg:w-[60rem]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 rounded-lg shadow-lg"
        >
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
                <p className="text-red-500 text-sm absolute whitespace-nowrap right-[2.5rem] top-[1.2rem] md:right-[30.4rem] lg:right-[45.5rem]">
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
                <p className="text-red-500 text-sm absolute whitespace-nowrap right-[0.6rem] top-[1.2rem] md:right-[28.5rem] lg:right-[43.6rem]">
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
                  <p className="text-red-500 text-sm absolute whitespace-nowrap right-[4.2rem] top-[1.2rem] md:right-[8.4rem] lg:right-[16rem]">
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
                  <p className="text-red-500 text-sm absolute whitespace-nowrap right-[4.1rem] top-[1.2rem] md:right-[8.8rem] lg:right-[16.2rem]">
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
                <p className="text-red-500 text-sm absolute whitespace-nowrap right-[0.4rem] top-[8.4rem] md:right-[25.9rem] lg:right-[40.9rem]">
                  {errors.notes.message}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-2 pb-2">
            <Link to="/appointments">
              <button className="btn bg-gray-300">Back</button>
            </Link>
            <button
              type="submit"
              className="btn px-4 py-2 bg-[#431592] text-white"
            >
              Edit Appointment
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditAppointment;
