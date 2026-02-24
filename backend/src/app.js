import express from "express"
import cors from "cors"
import employeeRoutes from "./routes/employeeRoutes.js"

const app = express()

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Use env var for Vercel, fallback to Vite default local
  credentials: true,
};
app.use(cors(corsOptions))
app.use(express.json())

// 👇 THIS LINE IS CRITICAL
app.use("/api/employees", employeeRoutes)

app.get("/", (req, res) => {
  res.json({ message: "E-HRMS API running" })
})

export default app
