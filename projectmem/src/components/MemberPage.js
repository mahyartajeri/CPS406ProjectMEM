import React from "react";
import { useState } from "react";

const MemberPage = ({
  tab,
  updateTab,
  memberName,
  memberUserName,
  classes,
  bookClass,
  handleSelectedClass,
  deleteBooking,
}) => {
  const [newTab, setNewTab] = useState(tab);
  const [emptyBookings, setEmptyBookings] = useState(true);

  function openTab(tabNum) {
    setNewTab(tabNum);
    console.log(tabNum);
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
          <ul className="bookedList">
            {classes.map((c) => {
              let foundClass = c.membersList.find(
                (m) => m.username == memberUserName
              );
              if (foundClass) {
                return (
                  <li className="booking" onClick={deleteBooking}>
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
            <input type="submit" value="Submit"></input>
          </form>
        </div>
      )}
    </>
  );
};

export default MemberPage;
