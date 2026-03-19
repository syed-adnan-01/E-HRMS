import api from "./axios"

export const loginUser = (data) =>
  api.post("/auth/login", data)

export const registerUser = (data) =>
  api.post("/auth/register", data)

// OTP login helpers stay separate from the existing login API.
export const requestLoginOtp = (data) =>
  api.post("/auth/otp/request-login", data)

export const verifyLoginOtp = (data) =>
  api.post("/auth/otp/verify-login", data)

export const resendLoginOtp = (data) =>
  api.post("/auth/otp/resend-login", data)
