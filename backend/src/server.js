import dotenv from "dotenv"
dotenv.config()

import app from "./app.js"
import { connectDB } from "./config/db.js"

import authRoutes from "./routes/authRoutes.js"
app.use("/api/auth", authRoutes)

import attendanceRoutes from "./routes/attendanceRoutes.js"
app.use("/api/attendance", attendanceRoutes)

import payrollRoutes from "./routes/payrollRoutes.js"
app.use("/api/payroll", payrollRoutes)

import reportRoutes from "./routes/reportRoutes.js"
app.use("/api/reports", reportRoutes)

const PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Trigger nodemon restart for Atlas
