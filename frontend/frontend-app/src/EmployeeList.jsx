import {useState, useEffect} from "react";
import axios from "axios";

function EmployeeList(){
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch employees from FastAPI backend
    useEffect(() => {
        axios.get("localhost/employees")
        .then(response => {
            setEmployees(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading ... </div>
    if (error) return <div>Error fetching data: {error.message}</div>

    return (
    <div>
      <h1>Employee Data</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Department ID</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.age}</td>
              <td>{employee.email}</td>
              <td>{employee.department_id}</td>
              <td>{employee.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )

}

export default EmployeeList;