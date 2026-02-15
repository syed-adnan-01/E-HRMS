export default function Table({ columns, data, onEdit }) {
  return (
    <table className="min-w-full border">

      <thead>
        <tr>
          {columns.map(col => (
            <th key={col} className="p-2 border text-left">
              {col}
            </th>
          ))}
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((emp) => (
          <tr key={emp._id} className="border">

            <td className="p-2">{emp.employeeId}</td>
            <td className="p-2">{emp.name}</td>
            <td className="p-2">{emp.department}</td>
            <td className="p-2">{emp.role}</td>
            <td className="p-2">{emp.status}</td>

            <td className="p-2">
              <button
                onClick={() => onEdit(emp)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  )
}
