import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import "../components/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/events?search=${input}&school=${input2}`);
  };

  return (
    <div>
      <Navbar />
      <div className="hero">
        <div className="heroTxt">
          <h1>Uncover The excitement around your campus city</h1>
          <p>find out about the latest events!</p>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
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
            </div>
            <button>Search</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
