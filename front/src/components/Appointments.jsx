import Navbar from "./Navbar";
import AddAppointment from "./AddAppointment";
import AppointmentContext from "../contexts/AppointmentContext";
import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import AppointmentTable from "./AppointmentTable";
import SearchBar from "./SearchBar";
import SortOptions from "./SortOptions";
import Pagination from "./Pagination";
import Footer from "./Footer";

const Appointments = () => {
  const { showForm, setShowForm } = useContext(AppointmentContext);

  return (
    <>
      <div className="min-h-screen">
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
          <div className="flex items-center justify-center mt-10 w-[17rem] md:w-[45rem] lg:w-[60rem]">
            <SearchBar />
            <SortOptions />
          </div>
          <div className="w-[17rem] md:w-[45rem] lg:w-[60rem] mt-10">
            <AppointmentTable />
          </div>
        </div>
        <div className="flex justify-center items-center w-full mt-15 mb-15">
          <div className="w-[17rem] md:w-[45rem] lg:w-[60rem]">
            <Pagination />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Appointments;
