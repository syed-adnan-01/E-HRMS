import { Link } from "react-router-dom"

export default function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            {columns.map(c => (
              <th key={c} className="p-2 border text-left">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((emp, idx) => (
            <tr key={emp._id || idx}>
              <td>{emp.employeeId}</td>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
              <td>{emp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
