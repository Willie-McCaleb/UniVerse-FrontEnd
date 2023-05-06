import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavMenu } from "./NavMenu";
import MenuItems from "./MenuItems";
import newRequest from "../../utils/newRequest";
import "./Navbar.css";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <nav className="NavBarItems">
      <Link to="/">
        <img
          className="navbar-logo"
          src="https://res.cloudinary.com/willsenior/image/upload/v1682986013/universe/UniVerse_lrd4dz.svg"
          alt="Website Logo"
        ></img>
      </Link>

      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {NavMenu.map((item, index) => {
          const depthlevel = 0;
          return <MenuItems menu={item} key={index} depthlevel={depthlevel} />;
        })}
      </ul>

      {currentUser ? (
        <div className="user" onClick={() => setOpen(!open)}>
          <img src={currentUser.img || "assets/noavatar.png"} alt="" />
          <span>{currentUser?.username}</span>

          {open && (
            <div className="options">
              <Link className="menu-items" to="/myEvents">
                Your Events
              </Link>
              {/* <Link className="menu-items" to="/messages">
                Messages
              </Link> */}
              <Link className="menu-items" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          )}
        </div>
      ) : (
        <>
          <Link to="/login" className="login-btn">
            <button>Sign Up / Login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
