import dotenv from "dotenv"
dotenv.config()

import app from "./app.js"
import cors from "cors"
import { connectDB } from "./config/db.js"

// ✅ CORS (Render + Vercel compatible)
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
)

// ROUTES
import authRoutes from "./routes/authRoutes.js"
import attendanceRoutes from "./routes/attendanceRoutes.js"
import payrollRoutes from "./routes/payrollRoutes.js"
import reportRoutes from "./routes/reportRoutes.js"

app.use("/api/auth", authRoutes)
app.use("/api/attendance", attendanceRoutes)
app.use("/api/payroll", payrollRoutes)
app.use("/api/reports", reportRoutes)

const PORT = process.env.PORT || 5000

// ✅ WAIT FOR DB BEFORE SERVER START
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Server failed to start:", error)
    process.exit(1)
  }
}

startServer()