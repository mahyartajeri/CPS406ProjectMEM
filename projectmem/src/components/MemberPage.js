import React from "react";
import Logout from "./Logout";
import { useState } from "react";

const MemberPage = ({
  tab,
  updateTab,
  memberName,
  memberUserName,
  updateMembers,
  classes,
  bookClass,
  handleSelectedClass,
  deleteBooking,
  logoutFunc,
  member,
}) => {
  const [newTab, setNewTab] = useState(tab);
  const [emptyBookings, setEmptyBookings] = useState(true);
  const [paying, setPaying] = useState(false);

  function openTab(tabNum) {
    setNewTab(tabNum);
    console.log(tabNum);
  }

  function togglePaying(e) {
    if (!paying) {
      let memberCopy = { ...member };
      if (!memberCopy.paid.includes(parseInt(e.currentTarget.value))) {
        memberCopy.paid.push(parseInt(e.currentTarget.value));
      }
      updateMembers(member);
      console.log("WOWWW", member);
    }
    setPaying(!paying);
  }

  return (
    <>
      <h1 className="welcome">Welcome, {memberName}</h1>
      <button className="tablink" onClick={() => openTab(0)}>
        Schedule
      </button>
      <button className="tablink" onClick={() => openTab(1)}>
        Payment
      </button>

      {newTab == 0 && (
        <div className="schedule">
          <h2>Schedule a Class</h2>

          <h3>Booked Classes</h3>
          <ul id="bookedList" className="bookedList">
            {classes.map((c) => {
              let foundClass = c.membersList.find(
                (m) => m.username == memberUserName
              );
              if (foundClass) {
                return (
                  <li
                    className="booking"
                    onClick={(e) => {
                      document
                        .getElementById("bookedList")
                        .getElementsByTagName("li").length == 1 &&
                        setEmptyBookings(true);
                      deleteBooking(e);
                    }}
                  >
                    {c.dateTime.toDateString()}
                  </li>
                );
              }
            })}
            {emptyBookings && <li>No Bookings</li>}
          </ul>

          <form
            onSubmit={(e) => {
              setEmptyBookings(false);
              bookClass(e);
            }}
          >
            <select name="classTimes" onChange={handleSelectedClass}>
              <option value="">Select a Time</option>
              {classes.map((c) => (
                <option value={c.dateTime.toDateString()}>
                  {c.dateTime.toDateString()}
                </option>
              ))}
            </select>
            <input type="submit" value="Book"></input>
          </form>

          <Logout logoutFunc={logoutFunc}></Logout>
        </div>
      )}
      {newTab == 1 && !paying && (
        <div className="payment">
          <h2>Manage Payment</h2>
          <table className="dues">
            <thead>
              <tr>
                <th>Date</th>
                <th>Coach</th>
                <th>Amount Due</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {classes.map(
                (c) =>
                  c.membersList.find((m) => m.username == memberUserName) &&
                  (c.membersList
                    .find((m) => m.username == memberUserName)
                    .paid.includes(c.id) ? (
                    <tr className="paid">
                      <td>{c.dateTime.toDateString()}</td>
                      <td>Coach Carter</td>
                      <td>$10.00</td>
                      <td>Paid</td>
                    </tr>
                  ) : (
                    <tr className="unpaid">
                      <td>{c.dateTime.toDateString()}</td>
                      <td>Coach Carter</td>
                      <td>$10.00</td>
                      <td>
                        <button
                          className="payButton"
                          value={c.id}
                          onClick={(e) => togglePaying(e)}
                        >
                          Pay
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {newTab == 1 && paying && (
        <div>
          <button className="backButton" onClick={(e) => togglePaying(e)}>
            Back
          </button>
        </div>
      )}
    </>
  );
};

export default MemberPage;
