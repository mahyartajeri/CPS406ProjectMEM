import React from "react";
import { useState } from "react";
import Logout from "./Logout";

const TreasurerPage = ({ classes, members, logoutFunc }) => {
  const [newTab, setNewTab] = useState(0);

  function calculateTotalRevenue() {
    let sum = 0;
    members.forEach((m) => {
      m.pricesPaid.forEach((p) => {
        sum += p;
      });
    });

    return sum;
  }

  function calculateAttendedClasses(m) {
    let sum = 0;
    m.booked.forEach((id) => {
      if (classes.find((c) => c.id == id).dateTime < new Date()) {
        sum += 1;
      }
    });

    return sum;
  }

  function calculateOverduePayments(m) {
    let sum = 0;
    m.booked.forEach((id) => {
      if (
        classes.find((c) => c.id == id).dateTime < new Date() &&
        !m.paid.includes(id)
      ) {
        sum += 1;
      }
    });

    return sum;
  }

  function openTab(tabNum) {
    setNewTab(tabNum);
  }
  return (
    <div>
      <>
        <h1 className="welcome">Welcome, Treasurer</h1>
        <button className="tablink" onClick={() => openTab(0)}>
          Income Statement
        </button>
        <button className="tablink" onClick={() => openTab(1)}>
          Members Log
        </button>

        {newTab == 0 && (
          <>
            <h2>Income Statement</h2>
            <h3>Class Revenue</h3>
            <table className="revenue">
              <thead>
                <tr>
                  <th>Member Name</th>
                  <th>Class Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => {
                  return m.paid.map((id) => (
                    <tr>
                      <td>{m.name}</td>
                      <td>
                        {classes
                          .find((c) => c.id == id)
                          .dateTime.toDateString()}
                      </td>
                      {classes.find((c) => c.id == id).dateTime > new Date() ? (
                        <td>Paid in Advance</td>
                      ) : (
                        <td>Paid</td>
                      )}
                      <td>${m.pricesPaid[m.paid.indexOf(id)]}</td>
                    </tr>
                  ));
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th colspan="3" id="total">
                    Total Revenue:
                  </th>
                  <td id="totalRevenue">${calculateTotalRevenue()}</td>
                </tr>
              </tfoot>
            </table>
          </>
        )}

        {newTab == 1 && (
          <>
            <h3>Members Log</h3>
            <table className="memberslog">
              <thead>
                <tr>
                  <th>Member Name</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Booked Classes</th>
                  <th>Paid Classes</th>
                  <th>Overdue Payments</th>
                  <th>Attended Classes</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr>
                    <td>{m.name}</td>
                    <td>1234567890</td>
                    <td>123 Swag Street</td>
                    <td>{m.booked.length}</td>
                    <td>{m.paid.length}</td>
                    <td>{calculateOverduePayments(m)}</td>
                    <td>{calculateAttendedClasses(m)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </>

      <Logout logoutFunc={logoutFunc}></Logout>
    </div>
  );
};

export default TreasurerPage;
