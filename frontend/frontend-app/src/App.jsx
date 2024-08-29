import "./App.css";
import EmployeeList from "./EmployeeList";
import DepartmentList from "./DepartmentList.jsx";
import DeptById from "./DeptById.jsx";

function App() {
  //const deptId = some ID int type;
  // pass in return: <DeptById id={deptId} />
  return (
    <>
      <EmployeeList />
    </>
  );
}

export default App;
