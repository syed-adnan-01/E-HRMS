export default function Table({ columns, data, onEdit, onDelete }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 mt-4">
      <table className="min-w-full text-left border-collapse">

        <thead className="bg-white/5 border-b border-white/10">
          <tr>
            {columns.map(col => (
              <th key={col} className="p-4 text-gray-400 font-semibold text-sm tracking-wide">
                {col}
              </th>
            ))}
            <th className="p-4 text-gray-400 font-semibold text-sm tracking-wide">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/10 bg-white/[0.02]">
          {data.map((emp) => (
            <tr key={emp._id} className="hover:bg-white/5 transition-colors">

              <td className="p-4 text-gray-300 font-medium whitespace-nowrap">{emp.employeeId}</td>
              <td className="p-4 text-gray-300 whitespace-nowrap">{emp.name}</td>
              <td className="p-4 text-gray-400 whitespace-nowrap">{emp.department}</td>
              <td className="p-4 text-gray-400 whitespace-nowrap">{emp.role}</td>
              <td className="p-4 whitespace-nowrap">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                   emp.status?.toLowerCase() === 'active' || emp.status?.toLowerCase() === 'present' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                   emp.status?.toLowerCase() === 'leave' || emp.status?.toLowerCase() === 'absent' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                   'bg-gray-500/10 text-gray-400 border-gray-500/20'
                }`}>
                   {emp.status || 'N/A'}
                </span>
              </td>

              <td className="p-4 space-x-3 whitespace-nowrap">

                <button
                  onClick={() => onEdit(emp)}
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(emp._id)}
                  className="text-red-400 hover:text-red-300 transition-colors font-medium text-sm"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}
