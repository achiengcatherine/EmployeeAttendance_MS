import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const UserLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.email || !values.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/userLogin",
        {
          email: values.email,
          password: values.password,
        }
      );
      if (response.data.loginStatus) {
        navigate("/dashboard");
      } else {
        setError(response.data.Error);
      }
    } catch (error) {
      setError("An error occurred while logging in");
      console.error("Login Error:", error); // Log detailed error information
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-danger">{error && error}</div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              placeholder="Enter your email"
              className="form-control rounded-0"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="form-control rounded-0"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <button className="btn btn-primary w-100 rounded-0 mb-3">
            Login
          </button>
          <div>
            <h5 className="signup">
              Don't have an account? <Link to="/register">Register now</Link>
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;

/*import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const UserLogin = () => {

    const [values, setValues] = useState({
      email: "",
      password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/userLogin",
          values
        );
        if (response.data.loginStatus) {
          // Login successful, redirect to dashboard or desired page
          navigate("/dashboard");
        } else {
          setError(response.data.Error);
        }
      } catch (error) {
        setError("An error occurred while logging in");
      }
    };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-danger">{error && error}</div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              placeholder="Enter your email"
              className="form-control rounded-0"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="form-control rounded-0"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <button className="btn btn-primary w-100 rounded-0 mb-3">
            Login
          </button>
          <div>
            <h5 className="signup">
              Don't have an account? <Link to="/register">Register now</Link>
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin*/
