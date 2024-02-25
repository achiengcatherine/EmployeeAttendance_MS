import React from "react";

const Employee = () => {
  return (
    <div className=" px-3 mt-5">
      <div className="d-flex justify-content-center">
        <h3>List of Employees</h3>
      </div>
      <Link to="/dashboard/employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3"></div>
    </div>
  );
};

export default Employee;
