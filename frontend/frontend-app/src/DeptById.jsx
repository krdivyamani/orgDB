import { useState, useEffect } from "react";
import axios from "axios";

function DeptById({ id }) {
  const [department, setDepartment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employees from FastAPI backend
  useEffect(() => {
    if (id) {
      axios
        .get(`localhost/departments/${id}`)
        .then((response) => {
          setDepartment(response.data);
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
      <h1>Department Details</h1>
      {department ? (
        <div>
          <p>
            <strong>ID:</strong> {department.id}
          </p>
          <p>
            <strong>Name:</strong> {department.name}
          </p>
          <p>
            <strong>Description:</strong> {department.created_at}
          </p>
        </div>
      ) : (
        <p>No department found with ID: {id}</p>
      )}
    </div>
  );
}

export default DeptById;
