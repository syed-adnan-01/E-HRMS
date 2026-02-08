import Input from "../ui/Input"
import Select from "../ui/Select"

export default function AddEmployeeForm({ onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target)

    const employee = Object.fromEntries(form.entries())
    onSubmit(employee)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="id" placeholder="Employee ID" required />
      <Input name="name" placeholder="Name" required />

      <Select name="department">
        <option>Engineering</option>
        <option>HR</option>
        <option>Finance</option>
      </Select>

      <Input name="role" placeholder="Role" required />

      <Select name="status">
        <option>Active</option>
        <option>Inactive</option>
      </Select>

      <button className="w-full bg-blue-600 text-white py-2 rounded">
        Save Employee
      </button>
    </form>
  )
}
