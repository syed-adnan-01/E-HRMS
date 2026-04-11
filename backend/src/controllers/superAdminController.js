import AdminRegister from "../models/AdminRegister.js";
import Company from "../models/Company.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

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
