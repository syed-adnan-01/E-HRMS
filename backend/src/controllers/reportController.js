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

    // TODAY DATE RANGE (Normalized to UTC midnight of local today)
    const now = new Date()
    const todayStartUtc = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0))
    const todayEndUtc = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999))

    // PRESENT TODAY
    const presentToday = await Attendance.countDocuments({
      status: "Present",
      date: { $gte: todayStartUtc, $lte: todayEndUtc }
    })

    // ABSENT TODAY
    const absentToday = await Attendance.countDocuments({
      status: "Absent",
      date: { $gte: todayStartUtc, $lte: todayEndUtc }
    })

    // CURRENT MONTH RANGE
    const firstDay = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1))
    const lastDay = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999))

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
    const now = new Date()
    const todayStartUtc = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0))
    const todayEndUtc = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999))

    const summary = await Attendance.aggregate([
      {
        $match: {
          date: {
            $gte: todayStartUtc,
            $lte: todayEndUtc
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
    const now = new Date()
    const todayStartUtc = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0))
    const todayEndUtc = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999))

    const present = await Attendance.countDocuments({
      date: { $gte: todayStartUtc, $lte: todayEndUtc },
      status: "Present"
    })

    const absent = await Attendance.countDocuments({
      date: { $gte: todayStartUtc, $lte: todayEndUtc },
      status: "Absent"
    })

    const leave = await Attendance.countDocuments({
      date: { $gte: todayStartUtc, $lte: todayEndUtc },
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