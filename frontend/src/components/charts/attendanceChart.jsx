import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import Card from "../ui/Card"
import { attendanceTrend } from "../../data/analytics"

export default function AttendanceChart() {
  return (
    <Card title="Attendance Trend">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={attendanceTrend}>
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="present"
            stroke="#16a34a"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
