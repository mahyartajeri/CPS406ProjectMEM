import React from "react";
import Login from "./Login";
import { useState } from "react";
const MainMenu = ({
  loginFunc,
  createAccountFunc,
  handleUsername,
  handlePassword,
  handleFullName,
  handlePhoneNumber,
  handleAddress,
  handleIsCoach,
  handleTreasurerPassword,
  loginTreasurerFunc,
  setTreasurerPassword,
  resetCredentials,
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
          resetCredentials={resetCredentials}
        ></Login>
      )}
      {!login && !treasurer && (
        <Login
          func={createAccountFunc}
          newAccount={true}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          handleFullName={handleFullName}
          handlePhoneNumber={handlePhoneNumber}
          handleAddress={handleAddress}
          handleIsCoach={handleIsCoach}
          resetCredentials={resetCredentials}
        ></Login>
      )}
      {login && !treasurer && (
        <>
          <button
            className="regButton"
            onClick={() => {
              toggleLogin();
              resetCredentials();
            }}
          >
            Create Account
          </button>
          <button
            className="treasurerButton"
            onClick={() => {
              toggleTreasurer();
              resetCredentials();
            }}
          >
            Login as Treasurer
          </button>
        </>
      )}
      {!login && !treasurer && (
        <button
          className="regButton"
          onClick={() => {
            toggleLogin();
            resetCredentials();
          }}
        >
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
