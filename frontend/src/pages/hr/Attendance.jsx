import MainLayout from "../../layouts/MainLayout"
import Card from "../../components/ui/Card"

export default function Attendance() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-semibold mb-4">Attendance</h1>

      <Card>
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">Ankit Sharma</td>
              <td className="p-2 border">2026-02-08</td>
              <td className="p-2 border text-green-600">Present</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </MainLayout>
  )
}
