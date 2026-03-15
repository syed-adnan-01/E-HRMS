/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import KpiCard from "../../components/dashboard/KpiCard"
import AttendanceSummary from "../../components/dashboard/AttendanceSummary"
import EmployeeStatus from "../../components/dashboard/EmployeeStatus"
import { getDashboardStats } from "../../api/dashboardApi"
import Loader from "../../components/ui/Loader"


export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    monthlyPayroll: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    try {
      const res = await getDashboardStats()
      setStats(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      {loading ? (
        <Loader fullScreen={false} />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-white mb-8 tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard title="Total Employees" value={stats.totalEmployees} />
        <KpiCard title="Present Today" value={stats.presentToday} />
        <KpiCard title="Absent Today" value={stats.absentToday} />
        <KpiCard title="Monthly Payroll" value={`₹ ${stats.monthlyPayroll}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceSummary />
        <EmployeeStatus />
      </div>
        </>
      )}
    </MainLayout>
  )
}
