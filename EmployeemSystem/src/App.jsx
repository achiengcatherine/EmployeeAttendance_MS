import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelection from "./Components/RoleSelection";
import Login from "./Components/AdminLogin";
import Register from "./Components/Register";
import UserLogin from "./Components/EmployeeLogin";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";
import Category from "./Components/Category";
import Home from "./Components/Home";
import Employee from "./Components/Employee";
import AddCategory from "./Components/AddCategory";
import AddEmployee from "./Components/AddEmployee";
import EditEmployee from "./Components/EditEmployee";
import Attendance from "./Components/Attendance";
import Record from "./Components/Record";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/role" element={<RoleSelection />}></Route>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/userLogin" element={<UserLogin />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard/employee" element={<Employee />}></Route>
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
          <Route path="/dashboard/employee" element={<Employee />}></Route>
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
          <Route path="/dashboard/record" element={<Record />}></Route>
          <Route
            path="/dashboard/addCategory"
            element={<AddCategory />}
          ></Route>
          <Route
            path="/dashboard/addEmployee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/dashboard/editEmployee/:id"
            element={<EditEmployee />}
          ></Route>

          <Route
            path="/dashboard/markAttendance/:id"
            element={<Attendance />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
