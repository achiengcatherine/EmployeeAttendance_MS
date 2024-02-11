
import './App.css' 
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'             
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import Category from './Components/Category';
import Home from './Components/Home';
import Employee from "./Components/Employee";

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/employee" element={<Employee />}></Route>
        <Route path="/category" element={<Category />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
 
}

export default App
