import { useState } from "react"
import Input from "../ui/Input"
import Select from "../ui/Select"

export default function EditEmployeeForm({ initial, onSubmit }) {

  const [form, setForm] = useState({
    employeeId: initial.employeeId,
    name: initial.name,
    email: initial.email,
    department: initial.department,
    role: initial.role,
    status: initial.status
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
        value={form.employeeId}
        onChange={handleChange}
      />

      <Input
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <Input
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <Select
        name="department"
        value={form.department}
        onChange={handleChange}
      >
        <option value="">Select Department</option>
        <option value="Engineering">Engineering</option>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
      </Select>

      <Input
        name="role"
        value={form.role}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Update Employee
      </button>

    </form>
  )
}
