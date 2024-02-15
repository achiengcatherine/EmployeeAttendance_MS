
import './App.css' 
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'             
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import Category from './Components/Category';
import Home from './Components/Home';
import Employee from "./Components/Employee";
import AddCategory from './Components/AddCategory';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard/employee" element={<Employee />}></Route>
        <Route path="/dashboard/category" element={<Category />}></Route>
        <Route path="/dashboard/profile" element={<Profile />}></Route>
        <Route path="/dashboard/addCategory" element={<AddCategory />}></Route>
      </Routes>
    </BrowserRouter>
  );
 
}

export default App
