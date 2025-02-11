import { useContext } from "react";
import AppointmentContext from "../contexts/AppointmentContext";

const SortOptions = () => {
  const { sortColumn, setSortColumn, sortOrder, setSortOrder } =
    useContext(AppointmentContext);

  const handleSortChange = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortColumn(column);
      setSortOrder("ASC");
    }
  };

  return (
    <div className="relative inline-block text-left">
      <select
        onChange={(e) => handleSortChange(e.target.value)}
        className="border border-gray-300 rounded-md p-2 dark:text-white"
      >
        <option disabled>Sort by:</option>
        <option value="pet_name">Pet Name</option>
        <option value="appointment_date">Date</option>
        <option value="pet_owner">Owner</option>
      </select>
      <button
        onClick={() => setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC")}
        className="ml-2 bg-gray-300 text-black px-2 py-2 rounded-md"
      >
        {sortOrder === "ASC" ? "Ascending" : "Descending"}
      </button>
    </div>
  );
};

export default SortOptions;
