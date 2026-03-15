import Attendance from "../models/attendanceModel.js"
import Employee from "../models/Employee.js"
import sendEmail from "../utils/sendEmail.js"

// Mark Attendance
export const markAttendance = async (req, res) => {

  const { employee, date, status } = req.body

  try {

    const selectedDate = new Date(date + "T00:00:00Z")


    const startOfDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      0, 0, 0, 0
    )

    const endOfDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      23, 59, 59, 999
    )

    const existing = await Attendance.findOne({
      employee,
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    })

    if (existing) {
      if (existing.status !== "Absent" && status === "Absent") {
        const emp = await Employee.findById(employee)
        if (emp) {
          await sendEmail({
            email: emp.email,
            subject: "Attendance Notification: Marked Absent",
            message: `Dear ${emp.name},\n\nYou have been marked as absent for ${new Date(date).toLocaleDateString()}.\n\nRegards,\nHR Department`
          })
        }
      }

      existing.status = status
      await existing.save()

      return res.json(existing)
    }

    const attendance = await Attendance.create({
      employee,
      date,
      status
    })

    if (status === "Absent") {
      const emp = await Employee.findById(employee)
      if (emp) {
        await sendEmail({
          email: emp.email,
          subject: "Attendance Notification: Marked Absent",
          message: `Dear ${emp.name},\n\nYou have been marked as absent for ${new Date(date).toLocaleDateString()}.\n\nRegards,\nHR Department`
        })
      }
    }

    res.status(201).json(attendance)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// Get Attendance Records
export const getAttendance = async (req, res) => {
  try {

    const records = await Attendance
      .find()
      .populate("employee", "employeeId name")

    res.json(records)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update Attendance
export const updateAttendance = async (req, res) => {
  try {
    const original = await Attendance.findById(req.params.id)

    const updated = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (original && original.status !== "Absent" && updated.status === "Absent") {
      const emp = await Employee.findById(updated.employee)
      if (emp) {
        await sendEmail({
          email: emp.email,
          subject: "Attendance Notification: Marked Absent",
          message: `Dear ${emp.name},\n\nYou have been marked as absent for ${new Date(updated.date).toLocaleDateString()}.\n\nRegards,\nHR Department`
        })
      }
    }

    res.json(updated)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Delete Attendance
export const deleteAttendance = async (req, res) => {
  try {

    await Attendance.findByIdAndDelete(req.params.id)
    res.json({ message: "Deleted" })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
