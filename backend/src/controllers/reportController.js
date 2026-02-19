import Attendance from "../models/attendanceModel.js"
import Payroll from "../models/Payroll.js"

// GET ATTENDANCE REPORT
export const getAttendanceReport = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("employee", "employeeId name")

    const report = attendance.map(a => ({
      _id: a._id,
      employeeId: a.employee.employeeId,
      name: a.employee.name,
      date: a.date,
      status: a.status
    }))

    res.json(report)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// GET PAYROLL REPORT
export const getPayrollReport = async (req, res) => {
  try {
    const payroll = await Payroll.find()
      .populate("employee", "employeeId name")

    const report = payroll.map(p => ({
      _id: p._id,
      employeeId: p.employee.employeeId,
      name: p.employee.name,
      month: p.month,
      netSalary: p.netSalary
    }))

    res.json(report)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}