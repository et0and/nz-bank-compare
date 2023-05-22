import { useState } from "react";
import SearchIcon from "@/components/SearchIcon";

export default function SearchBar({ onSearch }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <>
      {searchOpen ? (
        <input
          type="text"
          placeholder="Search"
          className="w-1/6 px-3 py-1 border rounded text-black bg-white dark:text-white dark:bg-black md:w-64"
          value={searchTerm}
          onChange={handleSearch}
          onBlur={() => setSearchOpen(false)}
        />
      ) : (
        <button className="md:hidden" onClick={() => setSearchOpen(true)}>
          <SearchIcon />
        </button>
      )}
      <input
        type="text"
        placeholder="Search"
        className="w-1/6 px-3 py-1 border rounded text-black bg-white dark:text-white dark:bg-black md:w-64 md:block hidden"
        value={searchTerm}
        onChange={handleSearch}
      />
    </>
  );
}
