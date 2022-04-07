import React from "react";
import Login from "./Login";
import { useState } from "react";
const MainMenu = ({
  loginFunc,
  createAccountFunc,
  handleUsername,
  handlePassword,
  handleFullName,
  handleTreasurerPassword,
  loginTreasurerFunc,
  setTreasurerPassword,
}) => {
  const [login, setLogin] = useState(true);
  const [treasurer, setTreasurer] = useState(false);

  function toggleLogin() {
    setLogin(!login);
  }

  function toggleTreasurer() {
    setTreasurer(!treasurer);
  }

  return (
    <div>
      {login && !treasurer && (
        <Login
          func={loginFunc}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          newAccount={false}
        ></Login>
      )}
      {!login && !treasurer && (
        <Login
          func={createAccountFunc}
          newAccount={true}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          handleFullName={handleFullName}
        ></Login>
      )}
      {login && !treasurer && (
        <>
          <button className="regButton" onClick={toggleLogin}>
            Create Account
          </button>
          <button className="treasurerButton" onClick={toggleTreasurer}>
            Login as Treasurer
          </button>
        </>
      )}
      {!login && !treasurer && (
        <button className="regButton" onClick={toggleLogin}>
          Login Instead
        </button>
      )}
      {treasurer && (
        <>
          <form onSubmit={loginTreasurerFunc}>
            <label for="tpassword" id="tpassword">
              Treasurer Password
            </label>
            <br></br>
            <input
              type="password"
              onChange={handleTreasurerPassword}
              id="tpassword"
            ></input>
            <input
              type="submit"
              onChange={handleTreasurerPassword}
              value="Login"
            ></input>
          </form>

          <button
            className="regButton"
            onClick={() => {
              toggleTreasurer();
              setTreasurerPassword("");
            }}
          >
            Login As Member Instead
          </button>
        </>
      )}
    </div>
  );
};

export default MainMenu;
