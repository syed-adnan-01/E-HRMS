import express from "express"
import { loginUser, organizationSignup } from "../controllers/authController.js"

const router = express.Router()

router.post("/login", loginUser)
router.post("/organization-signup", organizationSignup)

export default router
