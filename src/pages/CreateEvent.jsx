import React from "react";
import Add from "../components/AddEvent";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

function CreateEvent() {
  return (
    <div>
      <Navbar />
      <Add />
      <Footer />
    </div>
  );
}

export default CreateEvent;
