import { useEffect, useState } from "react"
import { Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"
import { getHeadcount } from "../../api/reportApi"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function HeadcountChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Employees",
        data: [],
        backgroundColor: ["#22c55e", "#ef4444"]
      }
    ]
  })

  useEffect(() => {
    async function fetchData() {
      const res = await getHeadcount()

      setChartData({
        labels: res.data.labels,
        datasets: [
          {
            label: "Employees",
            data: res.data.data,
            backgroundColor: ["#22c55e", "#ef4444"]
          }
        ]
      })
    }

    fetchData()
  }, [])

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Headcount</h2>
      <Doughnut data={chartData} />
    </div>
  )
}