import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.password !== values.confirm_password) {
      setError('Passwords do not match');
      return;
    }
    axios
      .post("http://localhost:3000/auth/register", values)
      .then((result) => {
        if (result.data.registerStatus) {
          navigate("/userLogin");
        } else {
          setError(result.data.Error);
        }
      })

      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 registerPage">
      <div className="p-3 rounded w-25 border registerForm">
        <div className="text-danger">{error && error}</div>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              placeholder="Enter your name"
              className="form-control rounded-0"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            <div className="mb-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                placeholder="Enter your email"
                className="form-control rounded-0"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Create Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Create Password"
                className="form-control rounded-0"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_password">Confirm Password:</label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm Password"
              className="form-control rounded-0"
              onChange={(e) =>
                setValues({ ...values, confirm_password: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <input type="checkbox" name="tick" id="tick" />
            <label htmlFor="password">I accept all terms & conditions</label>
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-3">
            Register Now
          </button>
          <div>
            <h5 className="signup">
              Already have an account<Link to="/userLogin">Login now</Link>
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register