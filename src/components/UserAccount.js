import React from "react";
import "./UserAccount.css";

function UserAccount() {
  return (
    <div className="account_page">
      <div className="col-1">
        <div className="login_container">
          <div className="info">
            <img
              src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
          </div>

          <h1>Username</h1>
          <h2>Universirty</h2>
          <h2>Description</h2>
          <h2>Created Events</h2>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
