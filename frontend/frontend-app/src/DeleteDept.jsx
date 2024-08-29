import React, { useState } from "react";
import axios from "axios";

function DeleteDept() {
  // State to hold the department ID to delete
  const [departmentId, setDepartmentId] = useState("");
  const [message, setMessage] = useState("");

  function handleDeptIdChange(event) {
    setDepartmentId((d) => event.target.value);
  }

  // Function to handle delete request
  const handleDelete = async (event) => {
    event.preventDefault(); // To prevent default form submission behavior

    try {
      // DELETE request to the FastAPI backend
      const response = await axios.delete(
        `localhost/departments/${departmentId}`
      );

      setMessage("Department deleted successfully!");

      // Reset the ID attribute after deletion
      setDepartmentId("");
    } catch (error) {
      // Handle errors
      console.error("Error deleting department:", error);
      setMessage("Failed to delete department.");
    }
  };

  return (
    <div>
      <h2>Delete a Department</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label htmlFor="id">Department ID:</label>
          <input
            type="text"
            id="id"
            value={departmentId}
            onChange={handleDeptIdChange}
            required
          />
        </div>
        <button type="submit">Delete Department</button>
      </form>
      {/* Display message */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default DeleteDept;
