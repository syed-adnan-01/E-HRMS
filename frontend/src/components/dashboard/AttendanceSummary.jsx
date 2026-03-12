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
      <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
        Today's Attendance
      </h2>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors">
          <p className="text-emerald-400 font-medium text-sm mb-1 uppercase tracking-wider">
            Present
          </p>
          <p className="text-3xl font-bold text-white">{present}</p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-red-500/30 transition-colors">
          <p className="text-red-400 font-medium text-sm mb-1 uppercase tracking-wider">
            Absent
          </p>
          <p className="text-3xl font-bold text-white">{absent}</p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/30 transition-colors">
          <p className="text-amber-400 font-medium text-sm mb-1 uppercase tracking-wider">
            Leave
          </p>
          <p className="text-3xl font-bold text-white">{leave}</p>
        </div>
      </div>
    </Card>
  )
}