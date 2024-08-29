// src/components/DepartmentReport.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function DeptEmpReport() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data from the FastAPI backend
  const fetchData = async () => {
    try {
      const response = await axios.get("localhost/departments/reports");
      setReportData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Fetch data when the component is mounted
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Department Employee Report</h2>
      <table>
        <thead>
          <tr>
            <th>Dept ID</th>
            <th>Dept Name</th>
            <th>Dept Created At</th>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Employee Age</th>
            <th>Employee Email</th>
            <th>Employee Dept ID</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((dept) =>
            dept.employees.map((emp) => (
              <tr key={emp.id}>
                <td>{dept.id}</td>
                <td>{dept.name}</td>
                <td>{dept.created_at}</td>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.age}</td>
                <td>{emp.email}</td>
                <td>{emp.deptID}</td>
                <td>{emp.created_at}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DeptEmpReport;
