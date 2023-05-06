import React from "react";
import { Link } from "react-router-dom";
import "./MyEvents.css";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import New from "./NewEvent";

function MyEvents({ eventId }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["members"],
    queryFn: () =>
      newRequest.get(`/members/${eventId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="myEvents">
      <div className="container">
        <div className="title">
          <h1>All Events</h1>
          <Link to="/createEvent" className="btn">
            Create New Event
          </Link>
        </div>
        <div className="cat-events">
          <h2>Attending Events</h2>
          {isLoading ? (
            "loading"
          ) : error ? (
            "error"
          ) : (
            <table>
              <tbody>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Attendace</th>
                  <th>Action</th>
                </tr>
                {data.map((event) => (
                  <tr key={event._id}>
                    <td>
                      <img src={event.img} alt="" />
                    </td>
                    <td>{event.title}</td>
                    <td>{data.price ? `$${data.price}` : "Free"}</td>
                    <td>{event.attend}</td>
                    <td>{event.date}</td>
                    <td>
                      <i className="fa-solid fa-trash"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <New />
        </div>
      </div>
    </div>
  );
}

export default MyEvents;
