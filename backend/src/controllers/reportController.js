import Attendance from "../models/attendanceModel.js"
import Payroll from "../models/Payroll.js"

// GET ATTENDANCE REPORT
export const getAttendanceReport = async (req, res) => {

  const records = await Attendance.find()
    .populate("employee", "employeeId name")
    .sort({ date: -1 })

  res.json(records)
}



// GET PAYROLL REPORT
export const getPayrollReport = async (req, res) => {

  const records = await Payroll.find()
    .populate("employee", "employeeId name")
    .sort({ createdAt: -1 })

  res.json(records)
}
