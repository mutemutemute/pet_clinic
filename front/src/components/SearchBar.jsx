import { useState, useContext } from "react";
import AppointmentContext from "../contexts/AppointmentContext";
import fetchAppointments from "../helpers/fetchAppointments";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setAppointments, setError } = useContext(AppointmentContext);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    const data = await fetchAppointments(e.target.value);
    if (data.error) {
      setError(data.error);
    } else {
      setAppointments(data);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search appointments..."
        value={searchTerm}
        onChange={handleSearch}
        className="border-0 border-y border-l border-gray-300 rounded-l p-[0.43rem]"
      />
    </div>
  );
};

export default SearchBar;
