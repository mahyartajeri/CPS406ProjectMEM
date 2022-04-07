import "./App.css";
import MainMenu from "./components/MainMenu";
import MemberPage from "./components/MemberPage";
import { useState } from "react";
import TreasurerPage from "./components/TreasurerPage";

function App() {
  // temp
  const mems = [
    {
      name: "Mahyar",
      username: "mahyar420",
      password: "cps406",
      booked: [],
      paid: [],
      prices: [],
      pricesPaid: [],
    },
    {
      name: "Cedric",
      username: "cedric420",
      password: "cps406",
      booked: [],
      paid: [],
      prices: [],
      pricesPaid: [],
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
        id: i,
        dateTime: d,
        coach: undefined,
        membersList: [],
        price: 10,
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
  const [treasurerAuthenticated, setTreasurerAuthenticated] = useState(
    undefined
  );
  const [treasurerPassword, setTreasurerPassword] = useState("");

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

  function handleTreasurerPassword(e) {
    setTreasurerPassword(e.currentTarget.value);
  }

  function updateMembers(updatedMember) {
    let membersCopy = [...members];
    membersCopy.forEach((m) => {
      if (m.username == updatedMember.username) {
        m = { ...updatedMember };
      }
    });

    setMembers(membersCopy);
    if (updatedMember.username == memberAuthenticated.username) {
      setMemberAuthenticated(updatedMember);
    }
    console.log(membersCopy);
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

  function loginTreasurerFunc(e) {
    e.preventDefault();
    if (treasurerPassword == "cps406") {
      setTreasurerAuthenticated(true);
    } else {
      alert("Incorrect Treasurer Password!");
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
        booked: [],
        paid: [],
        prices: [],
        pricesPaid: [],
      };
      let membersCopy = [...members, newMember];
      setMembers(membersCopy);
      console.log(membersCopy);
      alert("New account successfully created!");
    }
  }

  function logoutFunc() {
    setMemberAuthenticated(undefined);
    setUsername("");
    setPassword("");
    setFullName("");
  }

  function logoutTreasurerFunc() {
    setTreasurerAuthenticated(false);
    setTreasurerPassword("");
  }

  function bookClass(e) {
    e.preventDefault();
    if (!memberAuthenticated) return;
    let classesCopy = [...classes];
    let membersCopy = [...members];
    let found = false;
    let repeat = false;
    classesCopy.forEach((c) => {
      if (c.dateTime.toDateString() == selectedClass) {
        if (
          !c.membersList.find((m) => m.username == memberAuthenticated.username)
        ) {
          c.membersList.push(memberAuthenticated);
          membersCopy.forEach((m) => {
            if (m.username == memberAuthenticated.username) {
              m.booked.push(c.id);
              m.prices.push(c.price);
            }
          });
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
    setMembers(membersCopy);
  }

  function deleteBooking(e) {
    let classesCopy = [...classes];
    let membersCopy = [...members];
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
        membersCopy.forEach((m) => {
          if (m.username == memberAuthenticated.username) {
            let pricesIndex = m.booked.indexOf(c.id);
            m.booked = m.booked.filter((id) => id != c.id);
            let pricesPaidIndex = m.paid.indexOf(c.id);
            m.paid = m.paid.filter((id) => id != c.id);
            m.prices.splice(pricesIndex, 1);
            m.pricesPaid.splice(pricesPaidIndex, 1);
          }
        });
      }
    });

    setClasses(classesCopy);
    setMembers(membersCopy);
  }

  return (
    <div className="App">
      {!memberAuthenticated && !treasurerAuthenticated && (
        <MainMenu
          loginFunc={loginFunc}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          handleFullName={handleFullName}
          createAccountFunc={createAccountFunc}
          handleTreasurerPassword={handleTreasurerPassword}
          loginTreasurerFunc={loginTreasurerFunc}
          setTreasurerPassword={setTreasurerPassword}
        ></MainMenu>
      )}
      {memberAuthenticated && !treasurerAuthenticated && (
        <MemberPage
          memberName={memberAuthenticated.name}
          memberUserName={memberAuthenticated.username}
          tab={memberTab}
          updateTab={setMemberTab}
          classes={classes}
          bookClass={bookClass}
          handleSelectedClass={handleSelectedClass}
          deleteBooking={deleteBooking}
          logoutFunc={logoutFunc}
          updateMembers={updateMembers}
          member={memberAuthenticated}
        ></MemberPage>
      )}

      {treasurerAuthenticated && !memberAuthenticated && (
        <>
          <TreasurerPage
            classes={classes}
            members={members}
            logoutFunc={logoutTreasurerFunc}
          ></TreasurerPage>
        </>
      )}
    </div>
  );
}

export default App;
