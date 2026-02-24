import express from "express"
import cors from "cors"
import employeeRoutes from "./routes/employeeRoutes.js"

const app = express()

const frontendUrl = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, "") : "http://localhost:5173";

const corsOptions = {
  origin: [frontendUrl, `${frontendUrl}/`, "http://localhost:5173", "http://localhost:5001"],
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
