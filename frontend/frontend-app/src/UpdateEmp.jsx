import { useState } from "react";
import axios from "axios";

function UpdateEmp() {
  // Stateful variable representing attributes and messages
  const [empId, setEmpId] = useState(null);
  const [empName, setEmpName] = useState("");
  const [empAge, setEmpAge] = useState(0);
  const [empEmail, setEmpEmail] = useState("");
  const [empDeptId, setEmpDeptId] = useState(null);
  const [message, setMessage] = useState("");

  function handleEmpIdChange(event) {
    setEmpId((e) => event.target.value);
  }
  function handleEmpNameChange(event) {
    setEmpName((e) => event.target.value);
  }
  function handleEmpAgeChange(event) {
    setEmpAge((e) => event.target.value);
  }
  function handleEmpEmailChange(event) {
    setEmpEmail((e) => event.target.value);
  }
  function handleEmpDeptChange(event) {
    setEmpDeptId((e) => event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Create the department object to send to the backend
    const employeeUpdatedData = {
      name: empName,
      age: empAge,
      email: empEmail,
      deptID: empDeptId,
    };

    try {
      // Make a POST request to the FastAPI backend
      const response = await axios.put(
        `localhost/employees/${empId}`,
        employeeUpdatedData
      );

      // Handle successful response
      setMessage("Employee added successfully!");

      // Reset the attributes
      setEmpName("");
      setEmpAge(0);
      setEmpEmail("");
      setEmpDeptId(null);
    } catch (error) {
      console.error("Error Updating employee:", error);
      setMessage("Failed to Update employee.");
    }
  };

  return (
    <div>
      <h2>Update an Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">Employee ID:</label>
          <input
            type="number"
            id="id"
            value={empId}
            onChange={handleEmpIdChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Employee Name:</label>
          <input
            type="text"
            id="name"
            value={empName}
            onChange={handleEmpNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Employee Age:</label>
          <input
            type="number"
            id="age"
            value={empAge}
            onChange={handleEmpAgeChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Employee Email:</label>
          <input
            type="text"
            id="email"
            value={empEmail}
            onChange={handleEmpEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="deptId">Employee Dept ID:</label>
          <input
            type="text"
            id="deptId"
            value={empDeptId}
            onChange={handleEmpDeptChange}
            required
          />
        </div>
        <button type="submit">Add Employee</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateEmp;
