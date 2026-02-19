import { useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import Card from "../../components/ui/Card"
import Select from "../../components/ui/Select"
import { employees } from "../../data/employees"
import { exportToCsv } from "../../utils/exportCsv"


export default function Reports() {
  const [department, setDepartment] = useState("")

  const filtered = employees.filter(e =>
    department ? e.department === department : true
  )

  return (
    <MainLayout>
      <h1 className="text-2xl font-semibold mb-6">Reports</h1>

      <Card title="Employee Report">
        <div className="flex gap-4 mb-4">
          <Select onChange={e => setDepartment(e.target.value)}>
            <option value="">All Departments</option>
            <option>Engineering</option>
            <option>HR</option>
            <option>Finance</option>
          </Select>

          <button
            onClick={() => exportToCsv("employees_report.csv", filtered)}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Export CSV
          </button>
        </div>

        <p className="text-sm text-gray-600">
          {filtered.length} records
        </p>
      </Card>
    </MainLayout>
  )
}
