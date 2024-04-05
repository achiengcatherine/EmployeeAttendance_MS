// Import necessary dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";

const Record = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    // Fetch attendance records from the server
    axios
      .get("http://localhost:3000/auth/attendance")
      .then((result) => {
        setAttendanceRecords(result.data.Result);
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to download attendance progress
  const downloadAttendanceProgress = () => {
    // Create a CSV file with attendance data
    const csvContent =
      "data:text/csv;charset=utf-8," +
      attendanceRecords
        .map((record) => Object.values(record).join(","))
        .join("\n");

    // Create a temporary link and trigger the download
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "attendance_progress.csv";
    link.click();
  };

  return (
    <div>
      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Attendance Status</th>
            <th>Attendance DateTime</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.employee_id}</td>
              <td>{record.attendance_status}</td>
              <td>{record.attendance_datetime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={downloadAttendanceProgress}>
        Download Progress
      </button>
    </div>
  );
};

export default Record;

/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Record = () => {
  const { employee_id } = useParams();

  const [attendanceRecord, setAttendanceRecord] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/attendanceRecord"+employee_id)
      .then((result) => {
        if (result.data.Status) {
          setAttendanceRecord(result.data.Result);
        } else {
          console.log(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDownload = () => {
    // Convert attendance records to CSV format
    const csv = attendanceRecord
      .map((record) => {
        return `${record.name},${record.email},${record.attendanceStatus},${record.attendanceDateTime}`;
      })
      .join("\n");

    // Create a Blob object with the CSV data
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary <a> element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance_records.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="p-3 rounded w-100 border m-5">
        <h2>Attendance Record</h2>
      
          <table className="table">
            <thead>
              <tr>
               <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Attendance Time</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecord.map((record) => (
                <tr key={record.employee_id}>
                  
                  <td>{record.attendanceStatus}</td>
                  <td>{record.attendanceDateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        
        <button className="btn btn-info" onClick={handleDownload}>
          Download Record
        </button>
      </div>
    </div>
  );
};

export default Record;*/
