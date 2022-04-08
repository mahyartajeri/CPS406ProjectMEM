import React from "react";
import { useState } from "react";
import Logout from "./Logout";

const CoachPage = ({
  tab,
  memberName,
  memberUserName,
  updateMembers,
  classes,
  bookClass,
  handleSelectedClass,
  deleteBooking,
  logoutFunc,
  member,
  members,
  enrollCoachFunc,
  setMembers,
}) => {
  const [classDetails, setClassDetails] = useState(false);
  const [classID, setClassID] = useState(undefined);

  function toggleClassDetails(e) {
    if (!classDetails) {
      setClassID(parseInt(e.currentTarget.value));
    } else {
      setClassID(undefined);
    }
    setClassDetails(!classDetails);
  }

  function sendMessage(id) {
    let membersCopy = [...members];
    membersCopy.forEach((m) => {
      if (m.booked.includes(parseInt(id))) {
        let message = {
          from: "Coach " + member.name + " on " + new Date().toString(),
          msg: document.getElementById(id).value,
        };
        m.inbox.push(message);
      }
    });

    setMembers(membersCopy);
    console.log(membersCopy);
  }

  function sendMessageToMember(id) {
    let membersCopy = [...members];
    membersCopy.forEach((m) => {
      if (m.username == id) {
        let message = {
          from: "Coach " + member.name + " on " + new Date().toString(),
          msg: document.getElementById(id).value,
        };
        m.inbox.push(message);
      }
    });

    setMembers(membersCopy);
    console.log(membersCopy);
  }

  return (
    <>
      {!classDetails && (
        <>
          <h1 className="welcome">Welcome, Coach {memberName}</h1>
          <div>
            <h2>Classes List</h2>
            <table className="classesTable">
              <thead>
                <tr>
                  <th>Class ID</th>
                  <th>Date</th>
                  <th># of Members</th>
                  <th>Coach</th>
                  <th>Member List</th>
                  <th>Send Message</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((c) => {
                  if (c.coach) {
                    return (
                      <tr>
                        <td>{c.id}</td>
                        <td>{c.dateTime.toDateString()}</td>
                        <td>{c.membersList.length}</td>
                        <td>{c.coach.name}</td>
                        <td>
                          <button value={c.id} onClick={toggleClassDetails}>
                            View Member Details
                          </button>
                        </td>
                        <td>
                          <input type="text" id={c.id}></input>
                          <button onClick={(id) => sendMessage(c.id)}>
                            Send Msg
                          </button>
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr>
                        <td>{c.id}</td>
                        <td>{c.dateTime.toDateString()}</td>
                        <td>{c.membersList.length}</td>
                        <td>
                          <button
                            value={c.id}
                            onClick={(e) =>
                              enrollCoachFunc(e.currentTarget.value)
                            }
                          >
                            Claim
                          </button>
                        </td>
                        <td>
                          <button onClick={toggleClassDetails} value={c.id}>
                            View Member Details
                          </button>
                        </td>
                        <td>
                          <input type="text" id={c.id}></input>
                          <button onClick={(id) => sendMessage(c.id)}>
                            Send Msg
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {classDetails && (
        <>
          <h2>Members Enrolled</h2>
          <table className="memberslog">
            <thead>
              <tr>
                <th>Member Name</th>
                <th>Status</th>
                <th>Send Message</th>
              </tr>
            </thead>
            <tbody>
              {classes
                .find((c) => c.id == classID)
                .membersList.map((m) => {
                  if (m.paid.includes(classID)) {
                    return (
                      <tr>
                        <td>{m.name}</td>
                        <td>Paid</td>
                        <td>
                          <input type="text" id={m.username}></input>
                          <button
                            onClick={(id) => sendMessageToMember(m.username)}
                          >
                            Send Msg to {m.name}
                          </button>
                        </td>
                      </tr>
                    );
                  } else if (
                    new Date() > classes.find((c) => c.id == classID).dateTime
                  ) {
                    return (
                      <tr>
                        <td>{m.name}</td>
                        <td>Overdue</td>
                        <td>
                          <input type="text" id={m.username}></input>
                          <button
                            onClick={(id) => sendMessageToMember(m.username)}
                          >
                            Send Msg to {m.name}
                          </button>
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr>
                        <td>{m.name}</td>
                        <td>Not Paid</td>
                        <td>
                          <input type="text" id={m.username}></input>
                          <button
                            onClick={(id) => sendMessageToMember(m.username)}
                          >
                            Send Msg to {m.name}
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
          <button onClick={toggleClassDetails}>Back</button>
        </>
      )}

      <Logout logoutFunc={logoutFunc}></Logout>
      <br></br>
      <br></br>
    </>
  );
};

export default CoachPage;
