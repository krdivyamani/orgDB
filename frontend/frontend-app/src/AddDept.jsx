import { useState } from "react";
import axios from "axios";

function AddDept() {
  // Stateful variable representing attributes and messages
  const [departmentName, setDepartmentName] = useState("");
  const [message, setMessage] = useState("");

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
      const response = await axios.post(
        "localhost/departments",
        departmentData
      );

      // Handle successful response
      setMessage("Department added successfully!");

      // Reset the attributes
      setDepartmentName("");
    } catch (error) {
      console.error("Error adding department:", error);
      setMessage("Failed to add department.");
    }
  };

  return (
    <div>
      <h2>Add a New Department</h2>
      <form onSubmit={handleSubmit}>
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

export default AddDept;
