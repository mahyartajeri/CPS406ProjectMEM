import "./App.css";
import MainMenu from "./components/MainMenu";
import { useState } from "react";

function App() {
  // temp
  const mems = [
    {
      name: "Mahyar",
      username: "mahyar420",
      password: "cps406",
    },
    {
      name: "Cedric",
      username: "cedric420",
      password: "cps406",
    },
  ];

  // useStates
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [members, setMembers] = useState(mems);
  const [fullName, setFullName] = useState("");

  function handleUsername(e) {
    setUsername(e.currentTarget.value);
  }

  function handlePassword(e) {
    setPassword(e.currentTarget.value);
  }

  function handleFullName(e) {
    setFullName(e.currentTarget.value);
  }

  function loginFunc(e) {
    e.preventDefault();

    console.log(username, password);
    const mem = members.find((member) => member.username == username);
    if (mem) {
      console.log(mem);
      mem.password == password
        ? alert(`Welcome, ${mem.name}`)
        : alert("Incorrect Password!");
    } else {
      alert("Username did not match our records");
    }
  }

  function createAccountFunc(e) {
    e.preventDefault();
    const mem = members.find((member) => member.username == username);
    if (mem) {
      alert("This username already exists!");
      //setFullName("");
    } else {
      let newMember = {
        name: fullName,
        username: username,
        password: password,
      };
      let membersCopy = [...members, newMember];
      setMembers(membersCopy);
      console.log(membersCopy);
      alert("New account successfully created!");
    }
  }

  return (
    <div className="App">
      <MainMenu
        loginFunc={loginFunc}
        handleUsername={handleUsername}
        handlePassword={handlePassword}
        handleFullName={handleFullName}
        createAccountFunc={createAccountFunc}
      ></MainMenu>
    </div>
  );
}

export default App;
