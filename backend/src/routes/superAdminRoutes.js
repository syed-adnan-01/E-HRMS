import express from "express";
import { 
    getRegistrations, 
    approveRegistration, 
    rejectRegistration,
    getCompanies,
    updateCompanyStatus,
    getCompanyDetails,
    getSystemHealth,
    createAnnouncement,
    getAnnouncements,
    getActiveAnnouncements,
    deleteAnnouncement,
    exportCompanyData,
    purgeCompanyData
} from "../controllers/superAdminController.js";

const router = express.Router();

router.get("/registrations", getRegistrations);
router.post("/approve/:id", approveRegistration);
router.post("/reject/:id", rejectRegistration);
router.get("/companies", getCompanies);
router.patch("/company-status/:id", updateCompanyStatus);
router.get("/company-details/:id", getCompanyDetails);
router.get("/health-stats", getSystemHealth);

// Data Sovereignty
router.get("/export/:id", exportCompanyData);
router.delete("/purge/:id", purgeCompanyData);

// Announcements
router.post("/announcements", createAnnouncement);
router.get("/announcements", getAnnouncements);
router.get("/announcements/active", getActiveAnnouncements);
router.delete("/announcements/:id", deleteAnnouncement);

export default router;
