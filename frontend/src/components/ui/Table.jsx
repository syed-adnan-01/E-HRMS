export default function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map(col => (
              <th
                key={col}
                className="text-left px-4 py-2 border-b text-sm font-semibold"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {Object.values(row).map((cell, idx) => (
                <td
                  key={idx}
                  className="px-4 py-2 border-b text-sm"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
