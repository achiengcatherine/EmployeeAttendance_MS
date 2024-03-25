import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminRecords();
  }, []);

  const adminRecords = () => {
    axios.get("http://localhost:3000/auth/adminRecords").then((result) => {
        if (result.data.Status) {
            setAdmins(result.data.Result);
        }
        else {
            alert('result.data.Error')
        }
    });
  };
  return (
    <div className="mt-4 px-5 pt-3">
      <h3>List of Admins</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((a) => (
            <tr>
              <td>{a.email}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-3"
                >
                  Edit
                </button>
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
  );
};

export default Home;
