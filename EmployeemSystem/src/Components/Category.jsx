import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Category = () => {

  const[category, setCategory] = useState([])


  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
      .then(result => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error)
      }
    }).catch(err=>console.log(err))
  },[])
  return (
    <div className=" px-3 mt-5">
      <div className="d-flex justify-content-center">
        <h3>List of Categories</h3>
      </div>
      <Link to="/dashboard/addCategory" className="btn btn-success">
        Add Category
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {category.map((c) => (
              <tr>
                <td>{c.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
