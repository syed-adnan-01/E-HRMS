import AdminRegister from "../models/AdminRegister.js";

export const registerAdmin = async (req, res) => {
    try {
        const { name, email, companyName } = req.body;

        if (!name || !email || !companyName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if already registered
        const existingAdmin = await AdminRegister.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "This email is already registered for a workspace" });
        }

        const newRegistration = new AdminRegister({
            name,
            email,
            companyName
        });

        await newRegistration.save();

        res.status(201).json({
            success: true,
            message: "Workspace registration request submitted successfully!",
            data: newRegistration
        });
    } catch (error) {
        console.error("Admin Registration Error:", error);
        res.status(500).json({ 
            success: false,
            message: "Failed to process registration request", 
            error: error.message 
        });
    }
};
