import express from "express"
import cors from "cors"
import employeeRoutes from "./routes/employeeRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())

// 👇 THIS LINE IS CRITICAL
app.use("/api/employees", employeeRoutes)

app.get("/", (req, res) => {
  res.json({ message: "E-HRMS API running" })
})

export default app
