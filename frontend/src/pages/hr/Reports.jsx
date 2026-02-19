/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import Card from "../../components/ui/Card"
import Select from "../../components/ui/Select"
import { getAttendanceReport, getPayrollReport } from "../../api/reportApi"
import { exportToCsv } from "../../utils/exportCsv"

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

        const formatted = res.data.map(item => ({
          id: item.employee?.employeeId || "",
          name: item.employee?.name || "",
          date: item.date
            ? new Date(item.date).toLocaleDateString()
            : "",
          status: item.status || ""
        }))
        

        setData(formatted)

      } else {

        const res = await getPayrollReport()

        const formatted = res.data.map(item => ({
          id: item.employee?.employeeId || "",
          name: item.employee?.name || "",
          month: item.month || "",
          netSalary: item.netSalary || ""
        }))

        setData(formatted)
      }

    } catch (err) {
      console.log(err)
    }
  }

  function handleExport() {
    exportToCsv(data, type)
  }

  return (
    <MainLayout>

      <h1 className="text-2xl font-semibold mb-6">Reports</h1>

      <Card>

        <div className="flex justify-between mb-10 space-x-80">

          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="attendance">Attendance Report</option>
            <option value="payroll">Payroll Report</option>
          </Select>

          <button
            onClick={handleExport}
            className="
              h-9
              px-3
              text-sm
              font-medium
              text-black
              border
              border-green-500
              rounded-md
              bg-green-400
              hover:bg-green-200
              hover:border-green-600
              transition
              whitespace-nowrap
            "
          >
              Export CSV
          </button>
          
        </div>

        <table className="w-full border">

          <thead className="bg-gray-100">
            <tr>

              <th className="border px-4 py-2">Employee ID</th>
              <th className="border px-4 py-2">Name</th>

              {type === "attendance" ? (
                <>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Status</th>
                </>
              ) : (
                <>
                  <th className="border px-4 py-2">Month</th>
                  <th className="border px-4 py-2">Net Salary</th>
                </>
              )}

              <th className="border px-4 py-2">Actions</th>

            </tr>
          </thead>

          <tbody>

            {data.map((row, index) => (

              <tr key={index}>

                <td className="border px-4 py-2">{row.id}</td>
                <td className="border px-4 py-2">{row.name}</td>

                {type === "attendance" ? (
                  <>
                    <td className="border px-4 py-2">{row.date}</td>
                    <td className="border px-4 py-2">{row.status}</td>
                  </>
                ) : (
                  <>
                    <td className="border px-4 py-2">{row.month}</td>
                    <td className="border px-4 py-2">{row.netSalary}</td>
                  </>
                )}

                <td className="border px-4 py-2">
                  <span className="text-blue-600 cursor-pointer mr-2">
                    Edit
                  </span>
                  <span className="text-red-600 cursor-pointer">
                    Delete
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </Card>

    </MainLayout>
  )
}
