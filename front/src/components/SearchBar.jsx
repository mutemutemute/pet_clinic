import { useContext } from "react";
import AppointmentContext from "../contexts/AppointmentContext";

const SearchBar = () => {
  const { searchTerm, setSearchTerm, setCurrentPage } =
    useContext(AppointmentContext);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(0);
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
