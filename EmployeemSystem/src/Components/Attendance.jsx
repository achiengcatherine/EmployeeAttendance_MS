import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";



const Attendance = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    
 
  });
  const [attendanceStatus, setAttendanceStatus] = useState("present");
  const [attendanceDateTime, setAttendanceDateTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
   axios
      .get("http://localhost:3000/auth/employee/" + id)
      .then((result) => {
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
         
        });
      })
      .catch(err => console.log(err));
  }, []);
  

   const handleSubmit = (e) => {
     e.preventDefault();
      const currentTime = new Date().toLocaleString(); // Get current date and time
      setAttendanceDateTime(currentTime);
     axios
       .post("http://localhost:3000/auth/markAttendance/"+id , {
         employee,
         attendanceStatus: attendanceStatus,
         attendanceDateTime: currentTime,
       })
       .then((result) => {
         if (result.data.Status) {
           navigate("/dashboard/record");
         } else {
           console.log(result.data.Error);
         }
       })
       .catch((err) => console.log(err));
   };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h2 className="">Submit Attendance</h2>
        <form className="row g-1 " onSubmit={handleSubmit}>
          <div className="col-12 mt-2">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="inputName"
              value={employee.name}
              className="form-control rounded-0"
              disabled
            />
          </div>

          <div className="col-12 mt-2">
            <label htmlFor="inputEmail2" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="inputEmail2"
              value={employee.email}
              className="form-control rounded-0"
              disabled
            />
          </div>

          <div className="col-12 mt-2">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              onChange={(e) => setAttendanceStatus(e.target.value)}
              value={attendanceStatus}
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>

          <div className="col-12 mt-2">
            <label className="form-label">Attendance Time</label>
            <input
              type="text"
              className="form-control rounded-0"
              value={attendanceDateTime} // Display attendance date and time
              readOnly
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-info w-100 mt-3 ">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
 
}
export default Attendance;
