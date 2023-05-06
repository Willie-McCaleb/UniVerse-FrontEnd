import React from "react";
import LoadMap from "./LoadMap";
import "./ListEvents.css";
import newRequest from "../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import EventCard from "./EventCard";
import { useLocation } from "react-router-dom";

function Events() {
  const { search } = useLocation();

  // console.log(location);

  const { isLoading, error, data } = useQuery({
    queryKey: ["events"],
    queryFn: () =>
      newRequest.get(`/events${search}`).then((res) => {
        return res.data;
      }),
  });

  console.log(data);

  return (
    <div className="events-container">
      <LoadMap />

      <div className="cards">
        {isLoading
          ? "loading"
          : error
          ? "Something went wrong!"
          : data.map((event) => <EventCard key={event._id} item={event} />)}
      </div>
    </div>
  );
}

export default Events;
