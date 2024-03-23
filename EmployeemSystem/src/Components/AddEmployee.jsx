import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    image: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append("salary", employee.salary);
    formData.append("address", employee.address);
    formData.append("category_id", employee.category_id);
    formData.append("image", employee.image);

    axios
      .post("http://localhost:3000/auth/addEmployee", formData)
      .then((result => {
        if (result.data.Status) {
          navigate("/dashboard/employee")
        } else {
          alert(result.data.Error)
        }
      }))
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h2 className="">Add Employee</h2>
        <form className="row g-1 " onSubmit={handleSubmit}>
          <div className="col-12 mt-2">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="inputName"
              placeholder="Enter Name"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>

          <div className="col-12 mt-2">
            <label htmlFor="inputEmail2" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="inputEmail2"
              placeholder="Enter Email"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12 mt-2">
            <label htmlFor="inputPassword2" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="inputPassword2"
              placeholder="Enter password"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
          </div>

          <div className="col-12 mt-2">
            <label htmlFor="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              id="inputSalary"
              placeholder="Enter Salary"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>

          <div className="col-12 mt-2">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="inputAddress"
              placeholder="4545 Main St"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>

          <div className="col-12 mt-2">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              {category.map((c) => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col-12 mt-2">
            <label htmlFor="inputGroupFile01" className="form-label">
              Select Image
            </label>
            <input
              type="file"
              id="inputGroupFile01"
              name="image"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, image: e.target.files[0] })
              }
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success w-100 mt-3 ">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
