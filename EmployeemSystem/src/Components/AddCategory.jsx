import React, { useState } from 'react'

const AddCategory = () => {
    const [category, setCategory] = useState()
    return (
      
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-3 rounded w-25 border">
        <h2>Add Category</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="category">Categoty:</label>
            <input
              type="text"
              name="category"
              placeholder="Enter Category"
              className="form-control rounded-0"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button className="btn btn-success w-100 rounded-0 mb-3">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory