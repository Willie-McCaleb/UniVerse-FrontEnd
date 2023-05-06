import React from "react";
import Event from "../components/Event";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

function EventPage() {
  return (
    <div>
      <Navbar />
      <Event />
      <Footer />
    </div>
  );
}

export default EventPage;
