import express from "express"
import {
  markAttendance,
  getAttendance,
  updateAttendance,
  deleteAttendance
} from "../controllers/attendanceController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", protect, getAttendance)
router.post("/", protect, markAttendance)
router.put("/:id", protect, updateAttendance)
router.delete("/:id", protect, deleteAttendance)

export default router
