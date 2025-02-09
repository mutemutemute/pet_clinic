import Navbar from "./Navbar";
import AddAppointment from "./AddAppointment";
import AppointmentContext from "../contexts/AppointmentContext";
import { useContext } from "react";

const Appointments = () => {
  const { showForm, setShowForm } = useContext(AppointmentContext);

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-6 w-full">
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#431592] text-white px-6 py-3 rounded-md shadow-md w-[17rem] md:w-[45rem] lg:w-[60rem]"
        >
          Add Appointment
        </button>

        {showForm && (
          <div className="mt-6 p-6 bg-white rounded-lg shadow-lg w-[17rem] md:w-[45rem] lg:w-[60rem]">
            <AddAppointment />
          </div>
        )}
      </div>
    </>
  );
};

export default Appointments;
