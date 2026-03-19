import crypto from "crypto"
import bcrypt from "bcryptjs"
import OtpVerification from "../models/otpVerificationModel.js"

export const OTP_PURPOSE_LOGIN = "LOGIN"
export const OTP_EXPIRY_MS = 5 * 60 * 1000
export const OTP_EXPIRY_SECONDS = 5 * 60
export const OTP_RESEND_COOLDOWN_MS = 60 * 1000
export const OTP_RESEND_COOLDOWN_SECONDS = 60
export const OTP_MAX_SENDS = 3
export const OTP_MAX_VERIFY_ATTEMPTS = 5

const createOtpError = (message, statusCode, extra = {}) => {
  const error = new Error(message)
  error.statusCode = statusCode
  Object.assign(error, extra)
  return error
}

export const generateOtpCode = () =>
  crypto.randomInt(0, 1000000).toString().padStart(6, "0")

export const buildLoginOtpMessage = ({ name, otpCode }) =>
  [
    `Hi ${name},`,
    "",
    `Your E-HRMS OTP is: ${otpCode}`,
    "This code will expire in 5 minutes.",
    "",
    "If you did not request this OTP, please ignore this email."
  ].join("\n")

export const createOrRefreshOtp = async ({
  email,
  purpose = OTP_PURPOSE_LOGIN
}) => {
  const now = new Date()
  const existingOtp = await OtpVerification.findOne({ email, purpose })

  if (existingOtp && existingOtp.expiresAt.getTime() <= now.getTime()) {
    await existingOtp.deleteOne()
  }

  const activeOtp =
    existingOtp && existingOtp.expiresAt.getTime() > now.getTime()
      ? existingOtp
      : null

  if (activeOtp) {
    const cooldownLeftMs =
      OTP_RESEND_COOLDOWN_MS -
      (now.getTime() - activeOtp.lastSentAt.getTime())

    if (cooldownLeftMs > 0) {
      throw createOtpError("Please wait before requesting another OTP.", 429, {
        retryAfterSeconds: Math.ceil(cooldownLeftMs / 1000)
      })
    }

    if (activeOtp.sendCount >= OTP_MAX_SENDS) {
      throw createOtpError(
        "Resend limit reached. Please wait for the current OTP to expire.",
        429,
        {
          retryAfterSeconds: Math.ceil(
            (activeOtp.expiresAt.getTime() - now.getTime()) / 1000
          )
        }
      )
    }
  }

  const otpCode = generateOtpCode()
  const otpHash = await bcrypt.hash(otpCode, 10)
  const expiresAt = new Date(now.getTime() + OTP_EXPIRY_MS)

  if (!activeOtp) {
    await OtpVerification.create({
      email,
      purpose,
      otpHash,
      expiresAt,
      lastSentAt: now,
      sendCount: 1,
      verifyAttempts: 0
    })
  } else {
    activeOtp.otpHash = otpHash
    activeOtp.expiresAt = expiresAt
    activeOtp.lastSentAt = now
    activeOtp.sendCount += 1
    activeOtp.verifyAttempts = 0
    await activeOtp.save()
  }

  return {
    otpCode,
    expiresAt,
    expiresIn: OTP_EXPIRY_SECONDS,
    resendAfter: OTP_RESEND_COOLDOWN_SECONDS
  }
}

export const verifyStoredOtp = async ({
  email,
  otp,
  purpose = OTP_PURPOSE_LOGIN
}) => {
  const now = new Date()
  const otpRecord = await OtpVerification.findOne({ email, purpose })

  if (!otpRecord) {
    throw createOtpError("OTP not found. Please request a new OTP.", 400)
  }

  if (otpRecord.expiresAt.getTime() <= now.getTime()) {
    await otpRecord.deleteOne()
    throw createOtpError("OTP expired. Please request a new OTP.", 400)
  }

  if (otpRecord.verifyAttempts >= OTP_MAX_VERIFY_ATTEMPTS) {
    await otpRecord.deleteOne()
    throw createOtpError(
      "Too many invalid OTP attempts. Please request a new OTP.",
      429,
      {
        retryAfterSeconds: OTP_RESEND_COOLDOWN_SECONDS
      }
    )
  }

  const isValidOtp = await bcrypt.compare(otp, otpRecord.otpHash)

  if (!isValidOtp) {
    otpRecord.verifyAttempts += 1
    await otpRecord.save()

    throw createOtpError("Invalid OTP.", 400, {
      remainingAttempts: Math.max(
        OTP_MAX_VERIFY_ATTEMPTS - otpRecord.verifyAttempts,
        0
      )
    })
  }

  await otpRecord.deleteOne()
  return true
}
