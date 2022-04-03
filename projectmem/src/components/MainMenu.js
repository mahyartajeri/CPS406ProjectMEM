import React from "react";
import Login from "./Login";

const MainMenu = ({ loginFunc }) => {
  return (
    <div>
      <Login loginFunc={loginFunc}></Login>
    </div>
  );
};

export default MainMenu;
