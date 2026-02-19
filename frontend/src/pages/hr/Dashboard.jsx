import MainLayout from "../../layouts/MainLayout"
import KpiCard from "../../components/dashboard/KpiCard"
import AttendanceSummary from "../../components/dashboard/AttendanceSummary"
import EmployeeStatus from "../../components/dashboard/EmployeeStatus"
import HeadcountChart from "../../components/charts/HeadcountChart"
import AttendanceChart from "../../components/charts/AttendanceChart"


export default function Dashboard() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KpiCard title="Total Employees" value="50" />
        <KpiCard title="Active Employees" value="45" />
        <KpiCard title="Departments" value="3" />
        <KpiCard title="Open Positions" value="3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <HeadcountChart />
        <AttendanceChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AttendanceSummary />
        <EmployeeStatus />
      </div>
    </MainLayout>
  )
}
