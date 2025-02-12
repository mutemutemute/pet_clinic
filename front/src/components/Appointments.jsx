import Navbar from "./Navbar";
import AddAppointment from "./AddAppointment";
import AppointmentContext from "../contexts/AppointmentContext";
import { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import AppointmentTable from "./AppointmentTable";
import SearchBar from "./SearchBar";
import SortOptions from "./SortOptions";

const Appointments = () => {
  const { showForm, setShowForm } = useContext(AppointmentContext);

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-6">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-[#431592] text-white flex justify-center items-center px-6 py-1.5 rounded-md shadow-md w-[17rem] md:w-[45rem] lg:w-[60rem]"
        >
          <FaPlus /> Add Appointment
        </button>

        {showForm && (
          <div className="mt-6 p-6 bg-white rounded-lg shadow-lg w-[17rem] md:w-[45rem] lg:w-[60rem]">
            <AddAppointment />
          </div>
        )}
        <div className="flex items-center justify-center mt-5 w-[17rem] md:w-[45rem] lg:w-[60rem]">
          <SearchBar />
          <SortOptions />
        </div>
        <div className="w-[17rem] md:w-[45rem] lg:w-[60rem]">
          <AppointmentTable />
        </div>
      </div>
    </>
  );
};

export default Appointments;
