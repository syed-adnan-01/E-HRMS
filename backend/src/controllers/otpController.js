import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import sendEmail from "../utils/sendEmail.js"
import {
  OTP_PURPOSE_LOGIN,
  createOrRefreshOtp,
  verifyStoredOtp,
  buildLoginOtpMessage
} from "../services/otpService.js"

const buildLoginToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

const sendOtpError = (res, error) =>
  res.status(error.statusCode || 500).json({
    message: error.message || "OTP request failed",
    retryAfter: error.retryAfterSeconds,
    remainingAttempts: error.remainingAttempts
  })

const validateLoginCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    return null
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  return isPasswordValid ? user : null
}

const sendLoginOtp = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" })
  }

  try {
    const user = await validateLoginCredentials(email, password)

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const otpData = await createOrRefreshOtp({
      email: user.email,
      purpose: OTP_PURPOSE_LOGIN
    })

    await sendEmail({
      email: user.email,
      subject: "Your WorkSphere OTP Code",
      message: buildLoginOtpMessage({
        name: user.name,
        otpCode: otpData.otpCode
      })
    })

    return res.json({
      message: "OTP sent successfully",
      email: user.email,
      expiresIn: otpData.expiresIn,
      resendAfter: otpData.resendAfter
    })
  } catch (error) {
    return sendOtpError(res, error)
  }
}

export const requestLoginOtp = async (req, res) => {
  return sendLoginOtp(req, res)
}

export const resendLoginOtp = async (req, res) => {
  return sendLoginOtp(req, res)
}

export const verifyLoginOtp = async (req, res) => {
  const { email, password, otp } = req.body

  if (!email || !password || !otp) {
    return res
      .status(400)
      .json({ message: "Email, password and OTP are required" })
  }

  try {
    const user = await validateLoginCredentials(email, password)

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    await verifyStoredOtp({
      email: user.email,
      otp: String(otp).trim(),
      purpose: OTP_PURPOSE_LOGIN
    })

    const token = buildLoginToken(user)

    return res.json({
      token,
      role: user.role,
      name: user.name,
      message: "OTP verified successfully"
    })
  } catch (error) {
    return sendOtpError(res, error)
  }
}
