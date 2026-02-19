import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import {
  getAttendanceReport,
  getPayrollReport
} from "../controllers/reportController.js"

const router = express.Router()

router.get("/attendance", protect, getAttendanceReport)
router.get("/payroll", protect, getPayrollReport)

export default router
