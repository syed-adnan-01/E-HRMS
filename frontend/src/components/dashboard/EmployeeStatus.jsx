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
      <h2 className="text-lg font-semibold mb-4">
        Employee Status
      </h2>

      <div className="mb-4">
        <p>Active</p>
        <div className="w-full bg-gray-200 h-2 rounded">
          <div
            className="bg-green-500 h-2 rounded"
            style={{ width: `${activePercent}%` }}
          />
        </div>
        <p className="text-right">
          {activePercent.toFixed(0)}%
        </p>
      </div>

      <div>
        <p>Inactive</p>
        <div className="w-full bg-gray-200 h-2 rounded">
          <div
            className="bg-red-500 h-2 rounded"
            style={{ width: `${inactivePercent}%` }}
          />
        </div>
        <p className="text-right">
          {inactivePercent.toFixed(0)}%
        </p>
      </div>
    </Card>
  )
}