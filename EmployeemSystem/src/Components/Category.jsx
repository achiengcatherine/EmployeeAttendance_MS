import React from "react";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className="px-5 mt-3">
      <div className="d-flex, justify-content-center">
        <h3>List of Categories</h3>
        <Link to="dashboard/addCategory" className="btn btn-success">
          Add Category
        </Link>
      </div>
    </div>
  );
};

export default Category;
