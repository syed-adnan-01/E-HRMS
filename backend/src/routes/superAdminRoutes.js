import express from "express";
import { getRegistrations, approveRegistration, rejectRegistration } from "../controllers/superAdminController.js";
// In a real app, I'd add a middleware to check specifically for SUPERADMIN role
// For now, I'll keep it simple as requested to start work on the portal

const router = express.Router();

router.get("/registrations", getRegistrations);
router.post("/approve/:id", approveRegistration);
router.post("/reject/:id", rejectRegistration);

export default router;
