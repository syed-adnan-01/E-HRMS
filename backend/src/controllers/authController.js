import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const searchEmail = email.toLowerCase().trim()
    console.log(`[AUTH] Searching for user: ${searchEmail}`)
    const user = await User.findOne({ email: searchEmail })
    
    if (!user) {
      console.warn(`[AUTH] User not found: ${searchEmail}`)
      return res.status(400).json({ message: "User not found" })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" })

    const token = jwt.sign(
      { id: user._id, role: user.role, companyId: user.companyId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({
      token,
      role: user.role,
      name: user.name,
      companyId: user.companyId
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body

  try {
    const normalizedEmail = email.toLowerCase().trim()
    const existing = await User.findOne({ email: normalizedEmail })
    if (existing) {
      return res.status(400).json({ message: "User already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "EMPLOYEE"
    })

    await newUser.save()
    res.status(201).json({ message: "User registered successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

