import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login_signup.css";
import newRequest from "../utils/newRequest";
import upload from "../utils/upload";

function Signup() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    school: "",
    img: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="account_page">
      <div className="col-1">
        <div className="login_container">
          <img
            className="login_logo"
            alt="webiste logo"
            src="assets/header_logo.svg"
          />

          <h1>Sign Up</h1>
          <h3>
            Already a member?
            <Link to="/login" className="linkBtn">
              Log In
            </Link>
          </h3>

          <form onSubmit={handleSubmit}>
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
            />
            <input
              name="school"
              className="school"
              type="text"
              placeholder="Your University"
              onChange={handleChange}
            />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            <button type="submit"> Create Account</button>
          </form>
        </div>
      </div>

      {/* <div className="col-2">
        <img src={bgImg} alt="Image of university students" />
      </div> */}
    </div>
  );
}

export default Signup;
