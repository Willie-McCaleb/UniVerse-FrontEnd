import React, { useState } from "react";
import "./login_signup.css";
import newRequest from "../utils/newRequest";
import { Link, useNavigate } from "react-router-dom";
// import bgImg from "../background_img/login_pic.jpg";

function Login() {
  //Login Connection to DB
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // function to navagite to different pages

  const handleSubmit = async (e) => {
    e.preventDefault(); //Prevent refreashing page
    try {
      const res = await newRequest.post("auth/login", { email, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
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

          <h1>Log In</h1>
          <h3>
            Not a member yet?
            <Link to="/signup" className="linkBtn">
              Sign Up
            </Link>
          </h3>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit"> Log In</button>
            {error && error} {/*show error*/}
          </form>
        </div>
      </div>

      {/* <div className="col-2">
        <img src={bgImg} alt="Image of university students" />
      </div> */}
    </div>
  );
}

export default Login;
