import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
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
  const [searchParams] = useSearchParams()
  const urlSearch = searchParams.get("search") || ""

  const [attendance, setAttendance] = useState([])
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [date, setDate] = useState("")
  const [bulkStatus, setBulkStatus] = useState({}) // { employeeId: status }
  const [search, setSearch] = useState(urlSearch)

  const [selected, setSelected] = useState(null)
  const [openEdit, setOpenEdit] = useState(false)
  const [loading, setLoading] = useState(true)

  // =========================
  // FETCH DATA
  // =========================


  useEffect(() => {
    async function loadAll() {
      setLoading(true)
      await fetchAttendance()
      // Fetch departments from backend employees
      const res = await getEmployees()
      const uniqueDepartments = Array.from(new Set(res.data.map(emp => emp.department)))
      setDepartments(uniqueDepartments)
      setLoading(false)
    }
    loadAll()
  }, [])

  async function fetchAttendance() {
    const res = await getAttendance()
    setAttendance(res.data)
  }

  // Fetch employees when department changes
  useEffect(() => {
    async function fetchByDepartment() {
      if (selectedDepartment) {
        setLoading(true)
        // Pass department as query param
        const res = await getEmployees(selectedDepartment)
        // Filter employees on frontend as fallback (in case backend returns all)
        const filtered = res.data.filter(emp => emp.department === selectedDepartment)
        setEmployees(filtered)
        // Reset bulkStatus for new department
        const initialStatus = {}
        filtered.forEach(emp => {
          initialStatus[emp._id] = "Present"
        })
        setBulkStatus(initialStatus)
        setLoading(false)
      } else {
        setEmployees([])
        setBulkStatus({})
      }
    }
    fetchByDepartment()
  }, [selectedDepartment])

  // =========================
  // MARK ATTENDANCE
  // =========================

  // Bulk mark attendance for all employees in department
  async function handleBulkMark() {
    if (!date) {
      alert("Please select a date!");
      return;
    }
    // Defensive: do not allow marking if date is empty
    if (!date.trim()) {
      alert("Date is required.");
      return;
    }
    const promises = employees.map(emp =>
      markAttendance({
        employee: emp._id,
        date,
        status: bulkStatus[emp._id] || "Present"
      })
    )
    try {
      await Promise.all(promises)
      await fetchAttendance()
      alert("Success! Attendance marked for all employees.")
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message))
    }
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
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Filter by employee name or ID..."
              className="w-full bg-black/50 border border-white/10 text-white px-10 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            {search && (
              <button 
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            )}
          </div>
          {search && (
            <p className="text-xs font-bold text-blue-500 uppercase tracking-widest">Filtering Active</p>
          )}
        </div>

        {/* MARK ATTENDANCE */}


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Department Select */}
          <select
            className="w-full bg-black/50 border border-white/10 text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all appearance-none"
            value={selectedDepartment}
            onChange={e => setSelectedDepartment(e.target.value)}
          >
            <option value="" className="bg-black">Select Department</option>
            {departments.map(dep => (
              <option key={dep} value={dep} className="bg-black">{dep}</option>
            ))}
          </select>

          {/* Date input */}
          <input
            type="text"
            placeholder="dd/mm/yyyy"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            className="w-full bg-black/50 border border-white/10 text-white placeholder-gray-500 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all [color-scheme:dark]"
            onChange={e => setDate(e.target.value)}
          />

          {/* Bulk Mark button */}
          <button
            onClick={handleBulkMark}
            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={!selectedDepartment || employees.length === 0 || !date}
          >
            Mark Attendance for All
          </button>
        </div>

        {/* Employee List for Bulk Marking */}
        {selectedDepartment && employees.length > 0 && (
          <div className="w-full mb-6">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="p-4 text-gray-400 font-semibold text-sm tracking-wide">Employee ID</th>
                  <th className="p-4 text-gray-400 font-semibold text-sm tracking-wide">Name</th>
                  <th className="p-4 text-gray-400 font-semibold text-sm tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-white/[0.02]">
                {employees.map(emp => (
                  <tr key={emp._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-gray-300 font-medium whitespace-nowrap">{emp.employeeId}</td>
                    <td className="p-4 text-gray-300 whitespace-nowrap">{emp.name}</td>
                    <td className="p-4 whitespace-nowrap">
                      <select
                        className="bg-black/50 border border-white/10 text-white px-2 py-1 rounded-xl focus:outline-none"
                        value={bulkStatus[emp._id] || "Present"}
                        onChange={e => setBulkStatus(prev => ({ ...prev, [emp._id]: e.target.value }))}
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Leave">Leave</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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

              {attendance
                .filter(item => 
                  item.employee?.name.toLowerCase().includes(search.toLowerCase()) ||
                  item.employee?.employeeId.toLowerCase().includes(search.toLowerCase())
                )
                .map(item => (

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
