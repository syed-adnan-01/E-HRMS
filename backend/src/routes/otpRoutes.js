import express from "express"
import {
  requestLoginOtp,
  resendLoginOtp,
  verifyLoginOtp
} from "../controllers/otpController.js"

const router = express.Router()

router.post("/request-login", requestLoginOtp)
router.post("/resend-login", resendLoginOtp)
router.post("/verify-login", verifyLoginOtp)

export default router
