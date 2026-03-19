import mongoose from "mongoose"

const otpVerificationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true
    },
    purpose: {
      type: String,
      required: true,
      default: "LOGIN"
    },
    otpHash: {
      type: String,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    },
    lastSentAt: {
      type: Date,
      required: true
    },
    sendCount: {
      type: Number,
      default: 1
    },
    verifyAttempts: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

otpVerificationSchema.index({ email: 1, purpose: 1 }, { unique: true })
otpVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export default mongoose.model("OtpVerification", otpVerificationSchema)
