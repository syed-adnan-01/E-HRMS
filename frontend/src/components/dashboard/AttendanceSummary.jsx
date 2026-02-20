/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react"
import Card from "../ui/Card"
import { getAttendanceSummary } from "../../api/dashboardApi"

export default function AttendanceSummary() {
  const [present, setPresent] = useState(0)
  const [absent, setAbsent] = useState(0)
  const [leave, setLeave] = useState(0)

  useEffect(() => {
    fetchSummary()
  }, [])

  async function fetchSummary() {
    try {
      const res = await getAttendanceSummary()

      let p = 0
      let a = 0
      let l = 0

      res.data.forEach((item) => {
        if (item._id === "Present") p = item.count
        if (item._id === "Absent") a = item.count
        if (item._id === "Leave") l = item.count
      })

      setPresent(p)
      setAbsent(a)
      setLeave(l)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">
        Today's Attendance
      </h2>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-green-600 font-semibold">
            Present
          </p>
          <p className="text-xl">{present}</p>
        </div>

        <div>
          <p className="text-red-600 font-semibold">
            Absent
          </p>
          <p className="text-xl">{absent}</p>
        </div>

        <div>
          <p className="text-yellow-600 font-semibold">
            Leave
          </p>
          <p className="text-xl">{leave}</p>
        </div>
      </div>
    </Card>
  )
}