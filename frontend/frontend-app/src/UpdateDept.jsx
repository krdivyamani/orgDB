import { useState } from "react";
import axios from "axios";

function UpdateDept() {
  // Stateful variable representing attributes and messages
  const [departmentId, setDepartmentaId] = useState(null);
  const [departmentName, setDepartmentName] = useState("");
  const [message, setMessage] = useState("");

  function handleDeptIdChange(event) {
    setDepartmentaId((d) => event.target.value);
  }
  function handleDeptNameChange(event) {
    setDepartmentName((d) => event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Create the department object to send to the backend
    const departmentData = {
      name: departmentName,
    };

    try {
      // Make a POST request to the FastAPI backend
      const response = await axios.put(
        `localhost/departments/${departmentId}`,
        departmentData
      );

      // Handle successful response
      setMessage("Department Updated successfully!");

      // Reset the attributes
      setDepartmentName("");
    } catch (error) {
      console.error("Error updating department:", error);
      setMessage("Failed to update department.");
    }
  };

  return (
    <div>
      <h2>Update a Department</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">Department ID:</label>
          <input
            type="number"
            id="id"
            value={departmentId}
            onChange={handleDeptIdChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Department Name:</label>
          <input
            type="text"
            id="name"
            placeholder="department name"
            value={departmentName}
            onChange={handleDeptNameChange}
            required
          />
        </div>
        <button type="submit">Add Department</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateDept;
