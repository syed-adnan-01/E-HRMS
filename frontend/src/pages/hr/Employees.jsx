import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import Card from "../../components/ui/Card"
import Table from "../../components/ui/Table"
import Input from "../../components/ui/Input"
import Select from "../../components/ui/Select"
import Modal from "../../components/ui/Modal"

import AddEmployeeForm from "../../components/hr/AddEmployeeForm"
import EditEmployeeForm from "../../components/hr/EditEmployeeForm"

import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from "../../api/employeeApi"

export default function Employees() {

  const [employees, setEmployees] = useState([])
  const [search, setSearch] = useState("")
  const [department, setDepartment] = useState("")

  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const columns = ["ID", "Name", "Department", "Role", "Status"]

  // 🔹 LOAD EMPLOYEES (GET)
  const loadEmployees = () => {
    getEmployees()
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    loadEmployees()
  }, [])

  // 🔹 ADD EMPLOYEE (POST)
  const handleAddEmployee = async (data) => {
    await addEmployee(data)
    setOpen(false)
    loadEmployees()
  }


  // 🔹 EDIT CLICK
  const handleEditClick = (emp) => {
    setSelected(emp)
    setEditOpen(true)
  }

  // 🔹 UPDATE EMPLOYEE (PUT)
  const handleUpdateEmployee = async (data) => {
    await updateEmployee(selected._id, data)
    setEditOpen(false)
    setSelected(null)
    loadEmployees()
  }


  // 🔹 DELETE EMPLOYEE (DELETE)
  const handleDeleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return
    try {
      await deleteEmployee(id)
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
        <h1 className="text-3xl font-bold text-white tracking-tight">Employees</h1>
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

        <div className="overflow-x-auto">
          <Table
            columns={columns}
            data={filtered}
            onEdit={handleEditClick}
            onDelete={handleDeleteEmployee}
          />
        </div>
      </Card>

      {/* ADD EMPLOYEE MODAL */}
      <Modal open={open} onClose={() => setOpen(false)} title="Add Employee">
        <AddEmployeeForm onSubmit={handleAddEmployee} />
      </Modal>

      {/* EDIT EMPLOYEE MODAL */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Employee">
        {selected && (
          <EditEmployeeForm
            initial={selected}
            onSubmit={handleUpdateEmployee}
          />
        )}
      </Modal>

    </MainLayout>
  )
}
