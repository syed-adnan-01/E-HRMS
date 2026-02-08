import { useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import Card from "../../components/ui/Card"
import Select from "../../components/ui/Select"
import { employees } from "../../data/employees"

export default function Attendance() {
  const [records, setRecords] = useState([])

  function markAttendance(emp, status) {
    setRecords([
      ...records,
      {
        emp,
        date: new Date().toISOString().slice(0, 10),
        status,
      },
    ])
  }

  return (
    <MainLayout>
      <h1 className="text-2xl font-semibold mb-4">Attendance</h1>

      <Card>
        {employees.map(e => (
          <div key={e.id} className="flex justify-between items-center mb-2">
            <span>{e.name}</span>
            <Select onChange={ev => markAttendance(e.name, ev.target.value)}>
              <option>Mark</option>
              <option>Present</option>
              <option>Absent</option>
            </Select>
          </div>
        ))}
      </Card>

      <Card className="mt-6">
        <h2 className="font-semibold mb-2">Records</h2>
        {records.map((r, i) => (
          <p key={i}>
            {r.emp} – {r.date} – {r.status}
          </p>
        ))}
      </Card>
    </MainLayout>
  )
}
