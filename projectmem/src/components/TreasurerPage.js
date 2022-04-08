import React from "react";
import { useState } from "react";
import Logout from "./Logout";

const TreasurerPage = ({ classes, members, setMembers, logoutFunc }) => {
  const [newTab, setNewTab] = useState(0);
  const [yearMonth, setYearMonth] = useState(new Date());
  const [classDetails, setClassDetails] = useState(false);
  const [classID, setClassID] = useState(undefined);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
          from: "Admin on " + new Date().toString(),
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
          from: "Admin on " + new Date().toString(),
          msg: document.getElementById(id).value,
        };
        m.inbox.push(message);
      }
    });

    setMembers(membersCopy);
    console.log(membersCopy);
  }

  function firstOfTheMonth() {
    let d = new Date(yearMonth.getTime());
    d.setDate(1);

    return d.toDateString();
  }

  function calculateTotalRevenue() {
    let sum = 0;
    members.forEach((m) => {
      m.pricesPaid.forEach((p, i) => {
        if (
          classes.find((c) => c.id == m.paid[i]).dateTime.getMonth() ==
            yearMonth.getMonth() &&
          classes.find((c) => c.id == m.paid[i]).dateTime.getYear() ==
            yearMonth.getYear()
        )
          sum += p;
      });
    });

    return sum;
  }

  function calculateTotalExpenses() {
    let sum = 0;
    classes.forEach((c) => {
      if (
        c.coach &&
        c.dateTime.getMonth() == yearMonth.getMonth() &&
        c.dateTime.getYear() == yearMonth.getYear()
      ) {
        sum += 100;
      }
    });
    sum += 500; //for rent

    return sum;
  }

  function incrementMonth() {
    let d = new Date(yearMonth.getTime());
    d.setMonth(yearMonth.getMonth() + 1);

    setYearMonth(d);
  }

  function decrementMonth() {
    let d = new Date(yearMonth.getTime());
    d.setMonth(yearMonth.getMonth() - 1);

    setYearMonth(d);
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

  // This sorting function is taken from https://www.w3schools.com/howto/howto_js_sort_table.asp
  function sortTable(n) {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById("sortable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < rows.length - 1; i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
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
        <button className="tablink" onClick={() => openTab(2)}>
          Classes
        </button>

        {newTab == 0 && (
          <>
            <button id="bar" onClick={decrementMonth}>
              Prev Month
            </button>
            <h2 id="bar">
              {monthNames[yearMonth.getMonth()].toString() +
                " " +
                (yearMonth.getYear() + 1900).toString() +
                " "}
              Income Statement
            </h2>
            <button id="bar" onClick={incrementMonth}>
              Next Month
            </button>
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
                  if (!m.isCoach) {
                    return m.paid.map((id) => {
                      if (
                        classes.find((c) => c.id == id).dateTime.getMonth() ==
                          yearMonth.getMonth() &&
                        classes.find((c) => c.id == id).dateTime.getYear() ==
                          yearMonth.getYear()
                      )
                        return (
                          <tr>
                            <td>{m.name}</td>
                            <td>
                              {classes
                                .find((c) => c.id == id)
                                .dateTime.toDateString()}
                            </td>
                            {classes.find((c) => c.id == id).dateTime >
                            new Date() ? (
                              <td>Paid in Advance</td>
                            ) : (
                              <td>Paid</td>
                            )}
                            <td>${m.pricesPaid[m.paid.indexOf(id)]}</td>
                          </tr>
                        );
                    });
                  }
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
            <br></br>
            <h3>Expenses</h3>
            <table className="revenue">
              <thead>
                <tr>
                  <th>Expense Type</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((c) => {
                  if (
                    c.coach &&
                    c.dateTime.getMonth() == yearMonth.getMonth() &&
                    c.dateTime.getYear() == yearMonth.getYear()
                  ) {
                    return (
                      <tr>
                        <td>Coach {c.coach.name}'s Salary</td>
                        <td>{c.dateTime.toDateString()}</td>
                        <td>-$100</td>
                      </tr>
                    );
                  }
                })}
                <tr>
                  <td>Clubroom Rent</td>
                  <td>{firstOfTheMonth()}</td>
                  <td>-$500</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th colspan="2" id="total">
                    Total Expenses:
                  </th>
                  <td id="totalExpenses">-${calculateTotalExpenses()}</td>
                </tr>
              </tfoot>
            </table>
            <br></br>
            <h3>
              Profit:{" "}
              {calculateTotalRevenue() - calculateTotalExpenses() >= 0
                ? "$" +
                  (
                    calculateTotalRevenue() - calculateTotalExpenses()
                  ).toString()
                : "-$" +
                  Math.abs(
                    calculateTotalRevenue() - calculateTotalExpenses()
                  ).toString()}
            </h3>
            <br></br>
          </>
        )}

        {newTab == 1 && (
          <>
            <h3>Members Log</h3>
            <table id="sortable" className="memberslog">
              <thead>
                <tr>
                  <th onClick={() => sortTable(0)}>Member Name</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th onClick={() => sortTable(3)}>Booked Classes</th>
                  <th onClick={() => sortTable(4)}>Paid Classes</th>
                  <th onClick={() => sortTable(5)}>Overdue Payments</th>
                  <th onClick={() => sortTable(6)}>Attended Classes</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => {
                  if (!m.isCoach) {
                    return (
                      <tr>
                        <td>{m.name}</td>
                        <td>{m.phoneNumber}</td>
                        <td>{m.address}</td>
                        <td>{m.booked.length}</td>
                        <td>{m.paid.length}</td>
                        <td>{calculateOverduePayments(m)}</td>
                        <td>{calculateAttendedClasses(m)}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </>
        )}

        {newTab == 2 && (
          <>
            {!classDetails && (
              <>
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
                                <button
                                  value={c.id}
                                  onClick={toggleClassDetails}
                                >
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
                              <td>N/A</td>
                              <td>
                                <button
                                  onClick={toggleClassDetails}
                                  value={c.id}
                                >
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
                                  onClick={(id) =>
                                    sendMessageToMember(m.username)
                                  }
                                >
                                  Send Msg to {m.name}
                                </button>
                              </td>
                            </tr>
                          );
                        } else if (
                          new Date() >
                          classes.find((c) => c.id == classID).dateTime
                        ) {
                          return (
                            <tr>
                              <td>{m.name}</td>
                              <td>Overdue</td>
                              <td>
                                <input type="text" id={m.username}></input>
                                <button
                                  onClick={(id) =>
                                    sendMessageToMember(m.username)
                                  }
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
                                  onClick={(id) =>
                                    sendMessageToMember(m.username)
                                  }
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
          </>
        )}
      </>

      <Logout logoutFunc={logoutFunc}></Logout>
      <br></br>
      <br></br>
    </div>
  );
};

export default TreasurerPage;
