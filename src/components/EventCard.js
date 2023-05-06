import React from "react";
import { Link } from "react-router-dom";
import "./EventCard.css";
import { useQuery } from "@tanstack/react-query";

function EventCard({ item }) {
  // const { isLoading, error, data } = useQuery({
  //   queryKey: ["repoData"],
  //   queryFn: () =>
  //     newRequest.get(`/events${search}`).then((res) => {
  //       return res.data;
  //     }),
  // });

  return (
    <Link to={`/event/${item._id}`} className="link">
      <div className="eventCard">
        <img src={item.coverImg} alt="" />
        <div className="info">
          <div className="time-date">
            <div className="date">
              <i className="fa-solid fa-calendar-days"></i>
              <span>{item.date}</span>
            </div>
            <div className="time">
              <i className="fa-solid fa-clock"></i>
              <span>{item.time}</span>
            </div>
          </div>
          <div className="card-title">
            <h2>{item.title.substring(0, 22)}</h2>
          </div>
          <div className="location-price">
            <div className="location">
              <i className="fa-solid fa-location-dot"></i>
              <span>
                {item.city},{item.state}
              </span>
            </div>
            <div className="price">
              <i className="fa-solid fa-hand-holding-dollar"></i>
              <span>{item.price ? `$${item.price}` : "Free"}</span>
            </div>
          </div>

          <div className="card-bottom">
            <div className="attendee">
              <span>{item.attend} attendee</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
