import { useState } from "react"
import Input from "../ui/Input"
import Select from "../ui/Select"

export default function AddEmployeeForm({ onSubmit }) {

  const [form, setForm] = useState({
    employeeId: "",
    name: "",
    email: "",
    department: "",
    role: "",
    status: "Active"
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <Input
        name="employeeId"
        placeholder="Employee ID"
        onChange={handleChange}
      />

      <Input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
      />

      <Input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <Select name="department" onChange={handleChange}>
        <option value="">Select Department</option>
        <option value="Engineering">Engineering</option>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
      </Select>

      <Input
        name="role"
        placeholder="Role"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Save Employee
      </button>

    </form>
  )
}
