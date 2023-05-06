import React, { useState } from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/events?search=${input}&school=${input2}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="searchBarForm ">
          <input
            type="search"
            placeholder='Search for "clubs"'
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="search"
            placeholder="Enter College"
            onChange={(e) => setInput2(e.target.value)}
          />
          <button>Search</button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
