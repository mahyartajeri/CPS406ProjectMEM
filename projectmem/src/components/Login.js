import React from "react";

const Login = ({ loginFunc }) => {
  return (
    <div>
      <form onSubmit={loginFunc}>
        <label for="un">Username:</label>
        <br></br>
        <input type="text" id="un" name="un"></input>
        <br></br>
        <label dor="pw">Password:</label>
        <br></br>
        <input type="password" id="pw" name="pw"></input>
        <br></br>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default Login;
