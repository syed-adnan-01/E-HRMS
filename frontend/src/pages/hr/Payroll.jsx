/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import Card from "../../components/ui/Card"
import Modal from "../../components/ui/Modal"

import {
  getPayroll,
  addPayroll,
  updatePayroll,
  deletePayroll
} from "../../api/payrollApi"

import { getEmployees } from "../../api/employeeApi"

import EditPayrollForm from "../../components/hr/EditPayrollForm"

export default function Payroll() {

  const [payroll, setPayroll] = useState([])
  const [employees, setEmployees] = useState([])

  const [employee, setEmployee] = useState("")
  const [month, setMonth] = useState("")
  const [basicSalary, setBasicSalary] = useState("")
  const [allowances, setAllowances] = useState("")
  const [deductions, setDeductions] = useState("")

  const [selected, setSelected] = useState(null)
  const [openEdit, setOpenEdit] = useState(false)

  useEffect(() => {
    fetchPayroll()
    fetchEmployees()
  }, [])

  async function fetchPayroll() {
    const res = await getPayroll()
    setPayroll(res.data)
  }

  async function fetchEmployees() {
    const res = await getEmployees()
    setEmployees(res.data)
  }

  async function handleAdd() {

    await addPayroll({
      employee,
      month,
      basicSalary,
      allowances,
      deductions
    })

    await fetchPayroll()
  }

  function handleEdit(item) {
    setSelected(item)
    setOpenEdit(true)
  }

  async function handleUpdate(updated) {

    await updatePayroll(selected._id, updated)

    await fetchPayroll()

    setOpenEdit(false)
  }

  async function handleDelete(id) {

    await deletePayroll(id)

    await fetchPayroll()
  }

  return (
    <MainLayout>

      <h1 className="text-2xl font-semibold mb-6">
        Payroll
      </h1>

      <Card>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

          <select
            className="border px-3 py-2 rounded"
            onChange={e => setEmployee(e.target.value)}
          >
            <option>Select Employee</option>
            {employees.map(emp => (
              <option key={emp._id} value={emp._id}>
                {emp.employeeId} - {emp.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Month"
            className="border px-3 py-2 rounded"
            onChange={e => setMonth(e.target.value)}
          />

          <input
            type="number"
            placeholder="Basic Salary"
            className="border px-3 py-2 rounded"
            onChange={e => setBasicSalary(e.target.value)}
          />

          <input
            type="number"
            placeholder="Allowances"
            className="border px-3 py-2 rounded"
            onChange={e => setAllowances(e.target.value)}
          />

          <input
            type="number"
            placeholder="Deductions"
            className="border px-3 py-2 rounded"
            onChange={e => setDeductions(e.target.value)}
          />

          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>

        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full text-left border-collapse">

            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">Employee</th>
                <th className="px-4 py-2">Month</th>
                <th className="px-4 py-2">Net Salary</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>

              {payroll.map(item => (

                <tr key={item._id} className="border-t">

                  <td className="px-4 py-2">
                    {item.employee?.employeeId} - {item.employee?.name}
                  </td>

                  <td className="px-4 py-2">
                    {item.month}
                  </td>

                  <td className="px-4 py-2">
                    {item.netSalary}
                  </td>

                  <td className="px-4 py-2 space-x-2">

                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        </div>

      </Card>

      <Modal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        title="Edit Payroll"
      >
        {selected && (
          <EditPayrollForm
            initial={selected}
            onSubmit={handleUpdate}
          />
        )}
      </Modal>

    </MainLayout>
  )
}
