import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Employee = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/deleteEmployee/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };
  return (
    <div className=" px-3 mt-5">
      <div className="d-flex justify-content-center">
        <h3>List of Employees</h3>
      </div>
      {req.user.role === "admin" && (
        <Link to="/dashboard/addEmployee" className="btn btn-success">
          Add Employee
        </Link>
      )}
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>
                  <img
                    src={"http://localhost/3000/images/" + e.image}
                    className="empImage"
                  />
                </td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>{e.salary}</td>
                <td>
                  <Link
                    to={"/dashboard/markAttendance/" + e.id}
                    className="btn btn-info btn-sm me-3"
                  >
                    markAttendance
                  </Link>
                  <Link
                    to={"/dashboard/editEmployee/" + e.id}
                    className="btn btn-info btn-sm me-3"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm me-3"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
