import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js"
import { getAttendanceChart } from "../../api/reportApi"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)

export default function AttendanceChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Today",
        data: [],
        backgroundColor: "#3b82f6"
      }
    ]
  })

  useEffect(() => {
    async function fetchData() {
      const res = await getAttendanceChart()

      setChartData({
        labels: res.data.labels,
        datasets: [
          {
            label: "Today",
            data: res.data.data,
            backgroundColor: "#3b82f6"
          }
        ]
      })
    }

    fetchData()
  }, [])

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">
        Attendance Chart
      </h2>
      <Bar data={chartData} />
    </div>
  )
}