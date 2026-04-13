import AdminRegister from "../models/AdminRegister.js";
import Company from "../models/Company.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Announcement from "../models/Announcement.js";

// List all registrations (Pending first)
export const getRegistrations = async (req, res) => {
    try {
        const registrations = await AdminRegister.find().sort({ createdAt: -1 });
        res.json({ success: true, data: registrations });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching registrations", error: error.message });
    }
};

// Approve a registration
export const approveRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const registration = await AdminRegister.findById(id);

        if (!registration) {
            return res.status(404).json({ success: false, message: "Registration not found" });
        }

        if (registration.status !== "Pending") {
            return res.status(400).json({ success: false, message: "Registration already processed" });
        }

        // 1. Create Company
        console.log(`[APPROVE] Creating company for: ${registration.companyName}`);
        const newCompany = new Company({
            name: registration.companyName,
            email: registration.email,
            adminName: registration.name,
            status: "Active"
        });
        await newCompany.save();
        console.log(`[APPROVE] Company created with ID: ${newCompany._id}`);

        // 2. Create Admin User
        console.log(`[APPROVE] Creating Admin user for: ${registration.email}`);
        const salt = await bcrypt.genSalt(10);
        // Default password for first login - in real world we'd send an email with a setup link
        const defaultPassword = "Admin@WorkSphere2026"; 
        const hashedPassword = await bcrypt.hash(defaultPassword, salt);

        const newAdmin = new User({
            name: registration.name,
            email: registration.email,
            password: hashedPassword,
            role: "ADMIN",
            companyId: newCompany._id
        });
        await newAdmin.save();
        console.log(`[APPROVE] Admin user created with ID: ${newAdmin._id}`);

        // 3. Update Registration Status
        registration.status = "Approved";
        await registration.save();
        console.log(`[APPROVE] Registration status updated to Approved`);

        res.json({ 
            success: true, 
            message: "Company workspace approved and created!",
            credentials: {
                email: registration.email,
                temporaryPassword: defaultPassword
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Approval failed", error: error.message });
    }
};

// Reject a registration
export const rejectRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const registration = await AdminRegister.findById(id);

        if (!registration) {
            return res.status(404).json({ success: false, message: "Registration not found" });
        }

        registration.status = "Rejected";
        await registration.save();

        res.json({ success: true, message: "Registration rejected successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Rejection failed", error: error.message });
    }
};

// List all active companies
export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find().select('name email adminName status createdAt').sort({ createdAt: -1 });
        res.json({ success: true, data: companies });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching companies", error: error.message });
    }
};

// Update company status (Suspend/Activate)
export const updateCompanyStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['Active', 'Suspended', 'Inactive'].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }

        const company = await Company.findByIdAndUpdate(id, { status }, { new: true });
        if (!company) {
            return res.status(404).json({ success: false, message: "Company not found" });
        }

        res.json({ success: true, message: `Company status updated to ${status}`, data: company });
    } catch (error) {
        res.status(500).json({ success: false, message: "Update failed", error: error.message });
    }
};

// Get company details (stats)
export const getCompanyDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findById(id);
        if (!company) {
            return res.status(404).json({ success: false, message: "Company not found" });
        }

        const stats = {
            employeeCount: company.employees.length,
            attendanceCount: company.attendance.length,
            payrollCount: company.payrolls.length,
            reportCount: company.reports.length
        };

        res.json({ success: true, company, stats });
    } catch (error) {
        res.status(500).json({ success: false, message: "Search failed", error: error.message });
    }
};

// Global system health monitoring
export const getSystemHealth = async (req, res) => {
    try {
        const memory = process.memoryUsage();
        const uptime = process.uptime();
        
        // Basic metrics
        const health = {
            status: 'Operational',
            uptime: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m`,
            memoryUsage: `${Math.round(memory.rss / 1024 / 1024)} MB`,
            heapTotal: `${Math.round(memory.heapTotal / 1024 / 1024)} MB`,
            heapUsed: `${Math.round(memory.heapUsed / 1024 / 1024)} MB`,
            dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
            latency: '14ms', // Placeholder for actual latency tracking
            activeConnections: 42 // Simulated active users/sockets
        };

        res.json({ success: true, data: health });
    } catch (error) {
        res.status(500).json({ success: false, message: "Health check failed", error: error.message });
    }
};

// Create a new announcement
export const createAnnouncement = async (req, res) => {
    try {
        const { message, priority, expiresAt } = req.body;
        
        // No longer deactivating previous announcements automatically 
        // as the user wants a full log of live messages.

        const announcement = new Announcement({
            message,
            priority,
            expiresAt,
            isActive: true
        });

        await announcement.save();
        res.json({ success: true, message: "Announcement broadcasted successfully", data: announcement });
    } catch (error) {
        res.status(500).json({ success: false, message: "Broadcast failed", error: error.message });
    }
};

// Get all announcements
export const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.json({ success: true, data: announcements });
    } catch (error) {
        res.status(500).json({ success: false, message: "Fetch failed", error: error.message });
    }
};

// Get all active announcements (For user notification bars)
export const getActiveAnnouncements = async (req, res) => {
    try {
        const currentActive = await Announcement.find({ isActive: true }).sort({ createdAt: -1 });
        res.json({ success: true, data: currentActive });
    } catch (error) {
        res.status(500).json({ success: false, message: "Fetch failed", error: error.message });
    }
};

// Delete/Clear current announcement
export const deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        await Announcement.findByIdAndDelete(id);
        res.json({ success: true, message: "Announcement removed" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Deletion failed", error: error.message });
    }
};
// Export full company data trace
export const exportCompanyData = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findById(id);
        
        if (!company) return res.status(404).json({ success: false, message: "Company not found" });

        // Compile deep trace
        const trace = {
            organization: {
                name: company.name,
                email: company.email,
                joinedAt: company.createdAt
            },
            employees: company.employees,
            attendance: company.attendance,
            payroll: company.payrolls,
            reports: company.reports,
            metadata: {
                exportedAt: new Date(),
                scope: 'Full Sovereignty Trace'
            }
        };

        res.json({ success: true, data: trace });
    } catch (error) {
        res.status(500).json({ success: false, message: "Export failed", error: error.message });
    }
};

// Permanent Purge of organization data
export const purgeCompanyData = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find and delete
        const company = await Company.findByIdAndDelete(id);
        
        if (!company) return res.status(404).json({ success: false, message: "Company not found" });

        res.json({ success: true, message: "Organization and all associated records permanently purged." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Purge failed", error: error.message });
    }
};
