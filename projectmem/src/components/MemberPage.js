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
  const [classID, setClassID] = useState(undefined);
  const [creditCardInfo, setCreditCardInfo] = useState({
    num: undefined,
    exp: undefined,
    sc: undefined,
  });

  function openTab(tabNum) {
    setNewTab(tabNum);
    console.log(tabNum);
  }

  function resetPay() {
    setCreditCardInfo({
      num: undefined,
      exp: undefined,
      sc: undefined,
    });
  }

  function payForClass(e) {
    e.preventDefault();
    if (!creditCardInfo.exp || !creditCardInfo.num || !creditCardInfo.sc) {
      alert("Missing Information!");
      return;
    } else if (creditCardInfo.sc.length != 3) {
      alert("A 3 Digit Security Code is Required!");
      return;
    } else {
      let memberCopy = { ...member };
      if (!memberCopy.paid.includes(classID)) {
        memberCopy.paid.push(classID);
        if (memberCopy.discounts > 0) {
          memberCopy.pricesPaid.push(
            classes.find((c) => c.id == classID).price * 0.9
          );
          memberCopy.discounts--;
        } else {
          memberCopy.pricesPaid.push(
            classes.find((c) => c.id == classID).price
          );
        }
      }
      updateMembers(memberCopy);
      togglePaying();
    }
    console.log(member);
  }

  function togglePaying(e) {
    if (!paying) {
      let id = parseInt(e.currentTarget.value);
      setClassID(id);
    } else {
      setClassID(undefined);
      setCreditCardInfo({
        num: undefined,
        exp: undefined,
        sc: undefined,
      });
    }
    setPaying(!paying);
  }

  return (
    <>
      <h1 className="welcome">Welcome, {memberName}</h1>
      <button
        className="tablink"
        onClick={() => {
          openTab(0);
          resetPay();
        }}
      >
        Schedule
      </button>
      <button className="tablink" onClick={() => openTab(1)}>
        Payment
      </button>
      <button
        className="tablink"
        onClick={() => {
          openTab(2);
          resetPay();
        }}
      >
        Inbox
      </button>

      {newTab == 0 && (
        <div className="schedule">
          <h2>Schedule a Class</h2>

          <div className="bookedDiv">
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
            </ul>
            {emptyBookings && <p className="empty">No Bookings</p>}
          </div>

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
          <br></br>
          <br></br>
        </div>
      )}
      {newTab == 1 && !paying && (
        <div className="payment">
          <h2>Manage Payment</h2>
          <h4>Remaining Discounts (10% off): {member.discounts}</h4>
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
                      <td>{c.coach ? "Coach " + c.coach.name : "N/A"}</td>
                      <td>${member.pricesPaid[member.paid.indexOf(c.id)]}</td>
                      <td>Paid</td>
                    </tr>
                  ) : (
                    <tr className="unpaid">
                      <td>{c.dateTime.toDateString()}</td>
                      <td>{c.coach ? "Coach " + c.coach.name : "N/A"}</td>
                      <td>${member.discounts > 0 ? c.price * 0.9 : c.price}</td>
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

          <Logout logoutFunc={logoutFunc}></Logout>
          <br></br>
          <br></br>
        </div>
      )}

      {newTab == 1 && paying && (
        <div className="payingDiv">
          <form>
            <label for="creditCardNumber" id="creditCardNumber">
              Credit Card Number
            </label>
            <br></br>
            <input
              onChange={(e) => {
                let creditCardInfoCopy = {
                  ...creditCardInfo,
                  num: e.currentTarget.value,
                };
                setCreditCardInfo(creditCardInfoCopy);
              }}
              type="text"
              id="creditCardNumber"
            ></input>
            <br></br>
            <label for="exipiryDate" id="expiryDate">
              Expiry Date
            </label>
            <br></br>
            <input
              onChange={(e) => {
                let creditCardInfoCopy = {
                  ...creditCardInfo,
                  exp: e.currentTarget.value,
                };
                setCreditCardInfo(creditCardInfoCopy);
              }}
              type="text"
              id="expiryDate"
            ></input>
            <br></br>
            <label for="securityCode" id="securityCode">
              Security Code
            </label>
            <br></br>
            <input
              onChange={(e) => {
                let creditCardInfoCopy = {
                  ...creditCardInfo,
                  sc: e.currentTarget.value,
                };
                setCreditCardInfo(creditCardInfoCopy);
              }}
              type="text"
              id="securityCode"
            ></input>
            <br></br>

            <input
              type="submit"
              onClick={(e) => payForClass(e)}
              value="Process Payment"
            ></input>
          </form>
          <button className="backButton" onClick={(e) => togglePaying(e)}>
            Back
          </button>
        </div>
      )}
      {newTab == 2 && (
        <>
          <h2>Messages Inbox</h2>
          <hr></hr>
          <ul>
            {member.inbox.map((message) => (
              <>
                <li className="inboxMessage">
                  <b className="from">From: {message.from}</b>
                  <p className="smallIndent">{"\t" + message.msg}</p>
                </li>
                <hr></hr>
              </>
            ))}
          </ul>

          <Logout logoutFunc={logoutFunc}></Logout>
          <br></br>
          <br></br>
        </>
      )}
    </>
  );
};

export default MemberPage;
