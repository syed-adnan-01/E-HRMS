import express from "express"
import { loginUser, registerUser, organizationSignup } from "../controllers/authController.js"

const router = express.Router()

router.post("/login", loginUser)
router.post("/register", registerUser)
router.post("/organization-signup", organizationSignup)

export default router
