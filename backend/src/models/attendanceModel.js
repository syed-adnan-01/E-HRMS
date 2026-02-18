import mongoose from "mongoose"

const attendanceSchema = new mongoose.Schema({

  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  status: {
    type: String,
    enum: ["Present", "Absent", "Leave"],
    default: "Present"
  }

}, {
  timestamps: true
})

export default mongoose.model("Attendance", attendanceSchema)
