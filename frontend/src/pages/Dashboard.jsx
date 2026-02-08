import MainLayout from "../layouts/MainLayout"

export default function Dashboard() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-semibold mb-4">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          Total Employees
        </div>
        <div className="bg-white p-6 rounded shadow">
          Attendance Today
        </div>
        <div className="bg-white p-6 rounded shadow">
          Pending Payroll
        </div>
      </div>
    </MainLayout>
  )
}
