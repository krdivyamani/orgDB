import "./App.css";
import EmployeeList from "./EmployeeList";
import DepartmentList from "./DepartmentList.jsx";
import DeptById from "./DeptById.jsx";
import EmpById from "./EmpById.jsx";
import AddDept from "./AddDept.jsx";
import AddEmp from "./AddEmp.jsx";
import DeleteDept from "./DeleteDept.jsx";
import DeleteEmp from "./DeleteEmp.jsx";
import UpdateEmp from "./UpdateEmp.jsx";
import UpdateDept from "./UpdateDept.jsx";
import DeptEmpReport from "./DeptEmpReport.jsx";

function App() {
  //const deptId = some ID int type;
  // pass in return: <DeptById id={deptId} />
  //similarly for employee
  return (
    <>
      <EmployeeList />
    </>
  );
}

export default App;
