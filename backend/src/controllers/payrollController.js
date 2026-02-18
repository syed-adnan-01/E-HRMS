import Payroll from "../models/Payroll.js"

export const createPayroll = async (req, res) => {

  try {

    const { employee, month, basicSalary, allowances, deductions } = req.body

    const netSalary = Number(basicSalary) + Number(allowances) - Number(deductions)


    const payroll = await Payroll.create({
      employee,
      month,
      basicSalary,
      allowances,
      deductions,
      netSalary
    })

    res.status(201).json(payroll)

  } catch (err) {

    res.status(500).json({ message: err.message })

  }
}


export const getPayroll = async (req, res) => {

  const payroll = await Payroll.find()
    .populate("employee", "employeeId name")

  res.json(payroll)
}


export const updatePayroll = async (req, res) => {

  const { basicSalary, allowances, deductions } = req.body

  const netSalary = Number(basicSalary) + Number(allowances) - Number(deductions)

  const updated = await Payroll.findByIdAndUpdate(
    req.params.id,
    {
      basicSalary,
      allowances,
      deductions,
      netSalary
    },
    { new: true }
  )

  res.json(updated)
}


export const deletePayroll = async (req, res) => {

  await Payroll.findByIdAndDelete(req.params.id)

  res.json({ message: "Payroll Deleted" })
}
