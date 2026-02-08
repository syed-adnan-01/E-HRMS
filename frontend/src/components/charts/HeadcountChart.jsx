import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import Card from "../ui/Card"
import { headcountTrend } from "../../data/analytics"

export default function HeadcountChart() {
  return (
    <Card title="Headcount Trend">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={headcountTrend}>
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
