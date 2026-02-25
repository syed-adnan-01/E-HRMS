import Employee from "../models/Employee.js"
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

// GET DASHBOARD STATS
export const getDashboardStats = async (req, res) => {
  try {

    // TOTAL EMPLOYEES (ACTIVE ONLY)
    const totalEmployees = await Employee.countDocuments({ status: 'Active' })

    // TODAY DATE RANGE
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    // PRESENT TODAY
    const presentToday = await Attendance.countDocuments({
      status: "Present",
      date: { $gte: today, $lt: tomorrow }
    })

    // ABSENT TODAY
    const absentToday = await Attendance.countDocuments({
      status: "Absent",
      date: { $gte: today, $lt: tomorrow }
    })

    // CURRENT MONTH RANGE
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    // MONTHLY PAYROLL
    const payroll = await Payroll.aggregate([
      {
        $match: {
          createdAt: { $gte: firstDay, $lte: lastDay }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$netSalary" }
        }
      }
    ])

    const monthlyPayroll = payroll.length ? payroll[0].total : 0

    res.json({
      totalEmployees,
      presentToday,
      absentToday,
      monthlyPayroll
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET ATTENDANCE SUMMARY
export const getAttendanceSummary = async (req, res) => {
  try {
    const summary = await Attendance.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            $lte: new Date(new Date().setHours(23, 59, 59, 999))
          }
        }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ])

    res.json(summary)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET EMPLOYEE STATUS
export const getEmployeeStatus = async (req, res) => {
  try {
    const active = await Employee.countDocuments({
      status: "Active"
    })

    const inactive = await Employee.countDocuments({
      status: "Inactive"
    })

    res.json({
      active,
      inactive
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET HEADCOUNT & ATTENDANCE CHART DATA
export const getHeadcountChart = async (req, res) => {
  try {

    const active = await Employee.countDocuments({
      status: "Active"
    })

    const inactive = await Employee.countDocuments({
      status: "Inactive"
    })

    res.json({
      labels: ["Active", "Inactive"],
      data: [active, inactive]
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getAttendanceChart = async (req, res) => {
  try {

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const present = await Attendance.countDocuments({
      date: { $gte: today, $lt: tomorrow },
      status: "Present"
    })

    const absent = await Attendance.countDocuments({
      date: { $gte: today, $lt: tomorrow },
      status: "Absent"
    })

    const leave = await Attendance.countDocuments({
      date: { $gte: today, $lt: tomorrow },
      status: "Leave"
    })

    res.json({
      labels: ["Present", "Absent", "Leave"],
      data: [present, absent, leave]
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}