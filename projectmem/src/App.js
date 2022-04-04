import "./App.css";
import MainMenu from "./components/MainMenu";
import MemberPage from "./components/MemberPage";
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

  function createClasses() {
    let createdClasses = [];
    for (let i = 0; i < 8; i++) {
      let d = new Date();
      d.setDate(1 + 7 * i);
      d.setMinutes(0);
      d.setSeconds(0);
      d.setHours(18);
      let c = {
        dateTime: d,
        coach: undefined,
        membersList: [],
      };
      createdClasses.push(c);
    }
    return createdClasses;
  }

  // useStates
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [members, setMembers] = useState(mems);
  const [fullName, setFullName] = useState("");
  const [memberAuthenticated, setMemberAuthenticated] = useState(undefined);
  const [memberTab, setMemberTab] = useState(0);
  const [classes, setClasses] = useState(createClasses);
  const [selectedClass, setSelectedClass] = useState(undefined);

  function handleUsername(e) {
    setUsername(e.currentTarget.value);
  }

  function handlePassword(e) {
    setPassword(e.currentTarget.value);
  }

  function handleFullName(e) {
    setFullName(e.currentTarget.value);
  }

  function handleSelectedClass(e) {
    setSelectedClass(e.currentTarget.value);
  }

  function loginFunc(e) {
    e.preventDefault();

    console.log(username, password);
    const mem = members.find((member) => member.username == username);
    if (mem) {
      console.log(mem);
      if (mem.password == password) {
        alert(`Welcome, ${mem.name}`);
        setMemberAuthenticated(mem);
      } else {
        alert("Incorrect Password!");
      }
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

  function bookClass(e) {
    e.preventDefault();
    if (!memberAuthenticated) return;
    let classesCopy = [...classes];
    let found = false;
    let repeat = false;
    classesCopy.forEach((c) => {
      if (c.dateTime.toDateString() == selectedClass) {
        if (
          !c.membersList.find((m) => m.username == memberAuthenticated.username)
        ) {
          c.membersList.push(memberAuthenticated);
          found = true;
        } else {
          alert("You have already signed up for this class");
          repeat = true;
        }
      }
    });
    if (repeat) return;
    if (!found) alert("Class not found error");

    console.log(classesCopy);
    setClasses(classesCopy);
  }

  function deleteBooking(e) {
    let classesCopy = [...classes];
    classesCopy.forEach((c) => {
      let foundMember;
      if (e.currentTarget.textContent == c.dateTime.toDateString()) {
        foundMember = c.membersList.find(
          (m) => m.username == memberAuthenticated.username
        );
      }
      if (foundMember) {
        c.membersList = c.membersList.filter(
          (m) => m.username != memberAuthenticated.username
        );
      }
    });

    setClasses(classesCopy);
  }

  return (
    <div className="App">
      {!memberAuthenticated ? (
        <MainMenu
          loginFunc={loginFunc}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          handleFullName={handleFullName}
          createAccountFunc={createAccountFunc}
        ></MainMenu>
      ) : (
        <MemberPage
          memberName={memberAuthenticated.name}
          memberUserName={memberAuthenticated.username}
          tab={memberTab}
          updateTab={setMemberTab}
          classes={classes}
          bookClass={bookClass}
          handleSelectedClass={handleSelectedClass}
          deleteBooking={deleteBooking}
        ></MemberPage>
      )}
    </div>
  );
}

export default App;
