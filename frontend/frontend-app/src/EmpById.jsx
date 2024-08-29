import { useState, useEffect } from "react";
import axios from "axios";

function EmpById({ id }) {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employees from FastAPI backend
  useEffect(() => {
    if (id) {
      axios
        .get(`localhost/employees/${id}`)
        .then((response) => {
          setEmployee(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading ... </div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div>
      <h1>Employee Details</h1>
      {employee ? (
        <div>
          <p>
            <strong>ID:</strong> {employee.id}
          </p>
          <p>
            <strong>Name:</strong> {employee.name}
          </p>
          <p>
            <strong>Age:</strong> {employee.age}
          </p>
          <p>
            <strong>Email:</strong> {employee.Email}
          </p>
          <p>
            <strong>Dept ID:</strong> {employee.deptID}
          </p>
          <p>
            <strong>Created At:</strong> {employee.created_at}
          </p>
        </div>
      ) : (
        <p>No Employee found with ID: {id}</p>
      )}
    </div>
  );
}

export default EmpById;
