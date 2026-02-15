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

  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await onSubmit(form)
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded">
          {error}
        </div>
      )}

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
