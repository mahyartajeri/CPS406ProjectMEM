import React from "react";
import Login from "./Login";
import { useState } from "react";
const MainMenu = ({
  loginFunc,
  createAccountFunc,
  handleUsername,
  handlePassword,
  handleFullName,
}) => {
  const [login, setLogin] = useState(true);

  function toggleLogin() {
    setLogin(!login);
  }
  return (
    <div>
      {login ? (
        <Login
          func={loginFunc}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          newAccount={false}
        ></Login>
      ) : (
        <Login
          func={createAccountFunc}
          newAccount={true}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          handleFullName={handleFullName}
        ></Login>
      )}
      {login ? (
        <button className="regButton" onClick={toggleLogin}>
          Create Account
        </button>
      ) : (
        <button className="regButton" onClick={toggleLogin}>
          Login Instead
        </button>
      )}
    </div>
  );
};

export default MainMenu;
