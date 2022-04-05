import React from "react";

const Login = ({
  func,
  handleUsername,
  handlePassword,
  handleFullName,
  newAccount,
}) => {
  return (
    <div>
      <form onSubmit={func}>
        {newAccount && (
          <>
            <label for="fullname">Full Name</label>
            <br></br>
            <input
              type="text"
              className="textbox"
              onChange={handleFullName}
            ></input>
            <br></br>
          </>
        )}
        <label for="un">Username:</label>
        <br></br>
        <input
          type="text"
          className="textbox"
          onChange={handleUsername}
          id="un"
          name="un"
        ></input>
        <br></br>
        <label for="pw">Password:</label>
        <br></br>
        <input
          type="password"
          className="textbox"
          onChange={handlePassword}
          id="pw"
          name="pw"
        ></input>
        <br></br>
        <input type="submit" className="regButton" value="Submit"></input>
        <input type="reset" className="regButton" value="Reset"></input>
      </form>
    </div>
  );
};

export default Login;
