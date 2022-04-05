import React from "react";

const Logout = ({ logoutFunc }) => {
  return (
    <div className="logout">
      <button className="logoutButton" onClick={logoutFunc}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
