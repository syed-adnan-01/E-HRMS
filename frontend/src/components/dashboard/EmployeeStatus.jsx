/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react"
import Card from "../ui/Card"
import { getEmployeeStatus } from "../../api/dashboardApi"

export default function EmployeeStatus() {
  const [active, setActive] = useState(0)
  const [inactive, setInactive] = useState(0)

  useEffect(() => {
    fetchStatus()
  }, [])

  async function fetchStatus() {
    try {
      const res = await getEmployeeStatus()
      setActive(res.data.active)
      setInactive(res.data.inactive)
    } catch (err) {
      console.log(err)
    }
  }

  const total = active + inactive
  const activePercent = total ? (active / total) * 100 : 0
  const inactivePercent = total ? (inactive / total) * 100 : 0

  return (
    <Card>
      <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
        Employee Status
      </h2>

      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
            <p className="text-gray-300 font-medium">Active</p>
            <p className="text-emerald-400 font-semibold text-sm">
            {activePercent.toFixed(0)}%
            </p>
        </div>
        <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-green-400 h-full rounded-full relative"
            style={{ width: `${activePercent}%` }}
          >
             {/* Glow effect on progress bar */}
             <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-[2px]"></div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-2">
            <p className="text-gray-300 font-medium">Inactive</p>
            <p className="text-gray-400 font-medium text-sm">
            {inactivePercent.toFixed(0)}%
            </p>
        </div>
        <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-white/30 h-full rounded-full"
            style={{ width: `${inactivePercent}%` }}
          />
        </div>
      </div>
    </Card>
  )
}