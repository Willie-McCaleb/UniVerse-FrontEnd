import React from "react";
import { Link, useParams } from "react-router-dom";
import { Slider } from "infinite-react-carousel";
import "./Event.css";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import Members from "./Members";
import Share from "./Share";

function Event() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["event"],
    queryFn: () =>
      newRequest.get(`/events/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const url = `http://localhost:3000/event/${id}`;

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  return (
    <div className="event">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadCrumbs">
              {" "}
              <Link className="link" to="/">
                Home
              </Link>{" "}
              &gt;{" "}
              <Link className="link" to="/events">
                Search
              </Link>{" "}
              &gt; {data.title}
            </span>
            <h1>{data.title}</h1>
            <Slider
              slidesToShow={1}
              autoplayScroll={1}
              arrows={false}
              autoplay={true}
              autoplaySpeed={8000}
              pauseOnHover={false}
              className="slider"
            >
              {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong"
            ) : (
              <div className="user">
                <div className="info">
                  <img src={dataUser.img || "assets/noavatar.png"} alt="" />
                  <span>
                    {" "}
                    {dataUser.username} -{" "}
                    <span className="school">{dataUser.school}</span>
                  </span>
                </div>
              </div>
            )}
            <div className="desc">
              <h2>About This Event</h2>
              <p>{data.desc}</p>
            </div>
            <div className="mem">
              <h2>Members</h2>
              <Members eventId={id} />
            </div>
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.school}</h3>
              <h2>{data.price ? `$${data.price}` : "Free"}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="time-date">
              <div className="date">
                <i className="fa-solid fa-calendar-days"></i>
                <span>{data.date}</span>
              </div>
              <div className="time">
                <i className="fa-solid fa-clock"></i>
                <span>{data.time}</span>
              </div>
            </div>
            <div className="location">
              <i className="fa-solid fa-location-dot"></i>
              <div className="info">
                <span>{data.locationName}</span>
                <span className="address">
                  {data.address}
                  <div className="address-row">
                    {data.city},{data.state}
                    &nbsp;{data.zcode}
                  </div>
                </span>
              </div>
            </div>
            <div className="submit">
              <Share title={data.title} url={url} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Event;
