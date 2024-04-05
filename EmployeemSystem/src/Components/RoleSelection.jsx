import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === "admin") {
      navigate("/adminlogin");
    } else if (selectedRole === "employee") {
      navigate("/userLogin");
    }
  };

  return (
    <div className="justify-content-center align-items-center p-4 rounded w-25 border m-5 vh-70 rolePage">
      <h2>Select a Role</h2>
      <div className="d-flex">
        <button
          className="btn btn-info m-2"
          onClick={() => handleRoleSelection("admin")}
        >
          Admin
        </button>
        <button
          className="btn btn-info m-2"
          onClick={() => handleRoleSelection("employee")}
        >
          Employee
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
