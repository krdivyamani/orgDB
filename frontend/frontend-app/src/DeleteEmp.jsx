import React, { useState } from "react";
import axios from "axios";

function DeleteEmp() {
  // State to hold the department ID to delete
  const [employeeId, setEmployeeId] = useState("");
  const [message, setMessage] = useState("");

  function handleEmpIdChange(event) {
    setEmployeeId((e) => event.target.value);
  }

  // Function to handle delete request
  const handleDelete = async (event) => {
    event.preventDefault(); // To prevent default form submission behavior

    try {
      // DELETE request to the FastAPI backend
      const response = await axios.delete(`localhost/employees/${employeeId}`);

      setMessage("Employee deleted successfully!");

      // Reset the ID attribute after deletion
      setDepartmentId("");
    } catch (error) {
      // Handle errors
      console.error("Error deleting employee:", error);
      setMessage("Failed to delete employee.");
    }
  };

  return (
    <div>
      <h2>Delete an Employee</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label htmlFor="id">Department ID:</label>
          <input
            type="text"
            id="id"
            value={employeeId}
            onChange={handleEmpIdChange}
            required
          />
        </div>
        <button type="submit">Delete Employee</button>
      </form>
      {/* Display message */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default DeleteEmp;
