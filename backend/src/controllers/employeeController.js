import Employee from "../models/Employee.js"

export const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body)
    res.status(201).json(employee)
  } catch (error) {

    // Duplicate Key Error
    if (error.code === 11000) {
      return res.status(400).json({
        message: `${Object.keys(error.keyValue)} already exists`,
      })
    }

    // Validation Errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        val => val.message
      )
      return res.status(400).json({ message: messages.join(", ") })
    }

    res.status(500).json({ message: error.message })
  }
}


export const getEmployees = async (req, res) => {
  const employees = await Employee.find().sort({ employeeId: 1 })
  res.json(employees)
}

export const getEmployeeById = async (req, res) => {
  const employee = await Employee.findById(req.params.id)
  if (!employee) {
    return res.status(404).json({ message: "Employee not found" })
  }
  res.json(employee)
}

export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" })
    }

    res.json(employee)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id)

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" })
    }

    res.json({ message: "Employee deleted successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
