import React, { useState } from "react";

const Navbar1Search = () => {
  const URI = import.meta.env.VITE_API_URL;
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${URI}api/admin/getAllproductsSearch?searchTerm=${searchTerm}`
      );
      const data = await response.json();
      console.log(data);
      // Handle the search results (e.g., update state or display results)
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="relative flex-grow w-full flex items-center">
      <input
        type="search"
        placeholder="Search by title, category, or subcategory"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-2 py-2 pl-10 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500 text-black"
      />
      <button
        onClick={handleSearch}
        className="absolute right-0 flex items-center justify-center bg-black text-white p-2 px-2 rounded-r-sm text-md"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        Search
      </button>
    </div>
  );
};

export default Navbar1Search;
