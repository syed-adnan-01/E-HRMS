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
          {data.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="p-2 border">{row.id}</td>
              <td className="p-2 border text-blue-600">
                <Link to={`/employees/${row.id}`}>{row.name}</Link>
              </td>
              <td className="p-2 border">{row.department}</td>
              <td className="p-2 border">{row.role}</td>
              <td className="p-2 border">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
