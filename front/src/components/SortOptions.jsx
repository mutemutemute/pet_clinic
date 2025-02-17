import { useContext, useState } from "react";
import AppointmentContext from "../contexts/AppointmentContext";

const SortOptions = () => {
  const { sortColumn, setSortColumn, sortOrder, setSortOrder } =
    useContext(AppointmentContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (column) => {
    setSortColumn(column);
    setSortOrder("ASC");
    setIsOpen(false);
  };

  const handleOrderChange = (order) => {
    setSortOrder(order);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#431592] text-white px-4 md:py-2.5 text-sm  rounded-r-lg flex items-center gap-2"
      >
        Sort by:
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-44 bg-white border border-gray-300 shadow-lg rounded-lg">
          <div className="py-2">
            <button
              onClick={() => handleSortChange("pet_name")}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                sortColumn === "pet_name" ? "bg-gray-300" : ""
              }`}
            >
              Pet Name
            </button>
            <button
              onClick={() => handleSortChange("appointment_date")}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                sortColumn === "appointment_date" ? "bg-gray-300" : ""
              }`}
            >
              Date
            </button>
            <button
              onClick={() => handleSortChange("pet_owner")}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                sortColumn === "pet_owner" ? "bg-gray-300" : ""
              }`}
            >
              Owner
            </button>

            <hr className="border-gray-200 mt-2 mb-2" />

            <button
              onClick={() => handleOrderChange("ASC")}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                sortOrder === "ASC" ? "bg-gray-300" : ""
              }`}
            >
              Asc
            </button>
            <button
              onClick={() => handleOrderChange("DESC")}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                sortOrder === "DESC" ? "bg-gray-300" : ""
              }`}
            >
              Desc
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortOptions;
