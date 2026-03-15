/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import Card from "../../components/ui/Card"
import Modal from "../../components/ui/Modal"
import Loader from "../../components/ui/Loader"

import {
  getAttendance,
  markAttendance,
  updateAttendance,
  deleteAttendance
} from "../../api/attendanceApi"

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
  const [loading, setLoading] = useState(true)

  // =========================
  // FETCH DATA
  // =========================

  useEffect(() => {
    async function loadAll() {
      setLoading(true)
      await Promise.all([fetchAttendance(), fetchEmployees()])
      setLoading(false)
    }
    loadAll()
  }, [])

  async function fetchAttendance() {
    const res = await getAttendance()
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

    await markAttendance({
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

    await updateAttendance(selected._id, updated)

    await fetchAttendance()

    setOpenEdit(false)
  }

  // =========================
  // DELETE ATTENDANCE
  // =========================

  async function handleDelete(id) {

    await deleteAttendance(id)

    await fetchAttendance()
  }

  // =========================
  // UI
  // =========================

  return (
    <MainLayout>
      {loading ? (
        <Loader fullScreen={false} />
      ) : (
        <>
      <h1 className="text-3xl font-bold text-white mb-8 tracking-tight">
        Attendance
      </h1>

      <Card>

        {/* MARK ATTENDANCE */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          <select
            className="w-full bg-black/50 border border-white/10 text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all appearance-none"
            onChange={e => setEmployee(e.target.value)}
          >
            <option value="" className="bg-black">Select Employee</option>
            {employees.map(emp => (
              <option key={emp._id} value={emp._id} className="bg-black">
                {emp.employeeId} - {emp.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="w-full bg-black/50 border border-white/10 text-white placeholder-gray-500 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all [color-scheme:dark]"
            onChange={e => setDate(e.target.value)}
          />

          <select
            className="w-full bg-black/50 border border-white/10 text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all appearance-none"
            onChange={e => setStatus(e.target.value)}
          >
            <option className="bg-black">Present</option>
            <option className="bg-black">Absent</option>
            <option className="bg-black">Leave</option>
          </select>

          <button
            onClick={handleMark}
            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all transform hover:-translate-y-0.5"
          >
            Mark
          </button>

        </div>

        {/* TABLE */}

        <div className="w-full overflow-hidden rounded-xl border border-white/10">
          <table className="min-w-full text-left border-collapse">

            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-4 text-gray-400 font-semibold text-sm tracking-wide">Employee ID</th>
                <th className="p-4 text-gray-400 font-semibold text-sm tracking-wide">Name</th>
                <th className="p-4 text-gray-400 font-semibold text-sm tracking-wide">Date</th>
                <th className="p-4 text-gray-400 font-semibold text-sm tracking-wide">Status</th>
                <th className="p-4 text-gray-400 font-semibold text-sm tracking-wide">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10 bg-white/[0.02]">

              {attendance.map(item => (

                <tr key={item._id} className="hover:bg-white/5 transition-colors">

                  <td className="p-4 text-gray-300 font-medium whitespace-nowrap">
                    {item.employee?.employeeId}
                  </td>

                  <td className="p-4 text-gray-300 whitespace-nowrap">
                    {item.employee?.name}
                  </td>

                  <td className="p-4 text-gray-400 whitespace-nowrap">
                    {new Date(item.date).toLocaleDateString()}
                  </td>

                  <td className="p-4 whitespace-nowrap">
                     <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                        item.status?.toLowerCase() === 'active' || item.status?.toLowerCase() === 'present' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        item.status?.toLowerCase() === 'leave' || item.status?.toLowerCase() === 'absent' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-gray-500/10 text-gray-400 border-gray-500/20'
                     }`}>
                        {item.status || 'N/A'}
                     </span>
                  </td>

                  <td className="p-4 space-x-3 whitespace-nowrap">

                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-400 hover:text-red-300 transition-colors font-medium text-sm"
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
        </>
      )}
    </MainLayout>
  )
}
