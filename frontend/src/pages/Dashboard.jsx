import MainLayout from "../layouts/MainLayout"
import KpiCard from "../components/dashboard/KpiCard"
import AttendanceSummary from "../components/dashboard/AttendanceSummary"
import EmployeeStatus from "../components/dashboard/EmployeeStatus"

export default function Dashboard() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-semibold mb-6">
        Dashboard
      </h1>

      {/* KPI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KpiCard title="Total Employees" value="50" />
        <KpiCard title="Active Employees" value="45" />
        <KpiCard title="Departments" value="3" />
        <KpiCard title="Open Positions" value="3" />
      </div>

      {/* INSIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AttendanceSummary />
        <EmployeeStatus />
      </div>
    </MainLayout>
  )
}
