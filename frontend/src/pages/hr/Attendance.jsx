/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import Card from "../../components/ui/Card"
import Modal from "../../components/ui/Modal"

import * as attendanceApi from "../../api/attendanceApi"

import { getEmployees } from "../../api/employeeApi"

import EditAttendanceForm from "../../components/hr/EditAttendanceForm"

export default function Attendance() {

  const [attendance, setAttendance] = useState([])
  const [employees, setEmployees] = useState([])

  const [employee, setEmployee] = useState("")
  const [date, setDate] = useState("")
  const [status, setStatus] = useState("Present")

  const [selected, setSelected] = useState(null)
  const [openEdit, setOpenEdit] = useState(false)

  // =========================
  // FETCH DATA
  // =========================

  useEffect(() => {
    fetchAttendance()
    fetchEmployees()
  }, [])

  async function fetchAttendance() {
    const res = await attendanceApi.getAttendance()
    setAttendance(res.data)
  }

  async function fetchEmployees() {
    const res = await getEmployees()
    setEmployees(res.data)
  }

  // =========================
  // MARK ATTENDANCE
  // =========================

  async function handleMark() {

    await attendanceApi.markAttendance({
      employee,
      date,
      status
    })

    await fetchAttendance()
  }

  // =========================
  // EDIT ATTENDANCE
  // =========================

  function handleEdit(item) {
    setSelected(item)
    setOpenEdit(true)
  }

  // =========================
  // UPDATE ATTENDANCE
  // =========================

  async function handleUpdateAttendance(updated) {

    await attendanceApi.updateAttendance(selected._id, updated)

    await fetchAttendance()

    setOpenEdit(false)
  }

  // =========================
  // DELETE ATTENDANCE
  // =========================

  async function handleDelete(id) {

    await attendanceApi.deleteAttendance(id)

    await fetchAttendance()
  }

  // =========================
  // UI
  // =========================

  return (
    <MainLayout>

      <h1 className="text-2xl font-semibold mb-6">
        Attendance
      </h1>

      <Card>

        {/* MARK ATTENDANCE */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

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
            type="date"
            className="border px-3 py-2 rounded"
            onChange={e => setDate(e.target.value)}
          />

          <select
            className="border px-3 py-2 rounded"
            onChange={e => setStatus(e.target.value)}
          >
            <option>Present</option>
            <option>Absent</option>
            <option>Leave</option>
          </select>

          <button
            onClick={handleMark}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Mark
          </button>

        </div>

        {/* TABLE */}

        <table className="w-full text-left">

          <thead>
            <tr className="border-b">
              <th className="px-4 py-2">Employee ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>

            {attendance.map(item => (

              <tr key={item._id} className="border-t">

                <td className="px-4 py-2">
                  {item.employee?.employeeId}
                </td>

                <td className="px-4 py-2">
                  {item.employee?.name}
                </td>

                <td className="px-4 py-2">
                  {new Date(item.date).toLocaleDateString()}
                </td>

                <td className="px-4 py-2">
                  {item.status}
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

      </Card>

      {/* EDIT MODAL */}

      <Modal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        title="Edit Attendance"
      >
        {selected && (
          <EditAttendanceForm
            initial={selected}
            onSubmit={handleUpdateAttendance}
          />
        )}
      </Modal>

    </MainLayout>
  )
}
