/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import Card from "../../components/ui/Card"
import Select from "../../components/ui/Select"
import { getAttendanceReport, getPayrollReport } from "../../api/reportApi"

export default function Reports() {
  const [type, setType] = useState("attendance")
  const [data, setData] = useState([])

  useEffect(() => {
    fetchReports()
  }, [type])

  async function fetchReports() {
    try {
      if (type === "attendance") {
        const res = await getAttendanceReport()
        setData(res.data)
      } else {
        const res = await getPayrollReport()
        setData(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <MainLayout>
      <h1 className="text-2xl font-semibold mb-6">Reports</h1>

      <Card>
        <div className="mb-4">
          <Select onChange={(e) => setType(e.target.value)}>
            <option value="attendance">Attendance Report</option>
            <option value="payroll">Payroll Report</option>
          </Select>
        </div>

        {/* ================= ATTENDANCE REPORT ================= */}
        {type === "attendance" && (
          <table className="w-full border">
            <thead>
              <tr>
                <th className="p-2 border">Employee ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map((a) => (
                <tr key={a._id}>
                  <td className="p-2 border">{a.employeeId}</td>
                  <td className="p-2 border">{a.name}</td>
                  <td className="p-2 border">
                    {new Date(a.date).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ================= PAYROLL REPORT ================= */}
        {type === "payroll" && (
          <table className="w-full border">
            <thead>
              <tr>
                <th className="p-2 border">Employee ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Month</th>
                <th className="p-2 border">Net Salary</th>
              </tr>
            </thead>

            <tbody>
              {data.map((p) => (
                <tr key={p._id}>
                  <td className="p-2 border">{p.employeeId}</td>
                  <td className="p-2 border">{p.name}</td>
                  <td className="p-2 border">{p.month}</td>
                  <td className="p-2 border">{p.netSalary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </MainLayout>
  )
}
