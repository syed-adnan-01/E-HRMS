import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import Card from "../../components/ui/Card"
import Table from "../../components/ui/Table"
import Input from "../../components/ui/Input"
import Select from "../../components/ui/Select"
import Modal from "../../components/ui/Modal"
import AddEmployeeForm from "../../components/hr/AddEmployeeForm"

import { getEmployees, addEmployee } from "../../api/employeeApi"

export default function Employees() {

  const [employees, setEmployees] = useState([])
  const [search, setSearch] = useState("")
  const [department, setDepartment] = useState("")
  const [open, setOpen] = useState(false)

  const columns = ["ID", "Name", "Department", "Role", "Status"]

  // 🔹 LOAD EMPLOYEES FROM BACKEND
  const loadEmployees = () => {
    getEmployees()
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err))
  }

  // 🔹 INITIAL FETCH (GET)
  useEffect(() => {
    loadEmployees()
  }, [])

  // 🔹 ADD EMPLOYEE (POST)
  const handleAddEmployee = async (data) => {
    try {
      await addEmployee(data)
      setOpen(false)
      loadEmployees()
    } catch (err) {
      console.error(err)
    }
  }

  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) &&
    (department ? emp.department === department : true)
  )

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Employee
        </button>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

          <Input
            placeholder="Search by name"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <Select onChange={e => setDepartment(e.target.value)}>
            <option value="">All Departments</option>
            <option>Engineering</option>
            <option>HR</option>
            <option>Finance</option>
          </Select>

        </div>

        <Table columns={columns} data={filtered} />
      </Card>

      {/* ADD EMPLOYEE MODAL */}
      <Modal open={open} onClose={() => setOpen(false)} title="Add Employee">
        <AddEmployeeForm onSubmit={handleAddEmployee} />
      </Modal>

    </MainLayout>
  )
}
