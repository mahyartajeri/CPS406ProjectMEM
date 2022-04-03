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
            <input type="text" onChange={handleFullName}></input>
            <br></br>
          </>
        )}
        <label for="un">Username:</label>
        <br></br>
        <input type="text" onChange={handleUsername} id="un" name="un"></input>
        <br></br>
        <label dor="pw">Password:</label>
        <br></br>
        <input
          type="password"
          onChange={handlePassword}
          id="pw"
          name="pw"
        ></input>
        <br></br>
        <input type="submit" value="Submit"></input>
        <input type="reset" value="Reset"></input>
      </form>
    </div>
  );
};

export default Login;
