import React from "react";
import ListEvents from "../components/ListEvents";
import Navbar from "../components/navbar/Navbar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

function Events() {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <ListEvents />
    </div>
  );
}

export default Events;
