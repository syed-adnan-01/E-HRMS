import { Edit2, Trash2, MoreHorizontal } from "lucide-react"

export default function Table({ columns, data, onEdit, onDelete }) {
  return (
    <div className="w-full overflow-x-auto rounded-[2rem] border border-white/5 bg-white/[0.02]">
      <table className="min-w-full text-left border-separate border-spacing-0">
        <thead>
          <tr className="bg-white/5">
            {columns.map((col, idx) => (
              <th 
                key={col} 
                className={`p-6 text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] border-b border-white/5 ${idx === 0 ? 'rounded-tl-[2rem]' : ''}`}
              >
                {col}
              </th>
            ))}
            <th className="p-6 text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] border-b border-white/5 text-right rounded-tr-[2rem]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/[0.03]">
          {data.map((emp) => (
            <tr key={emp._id} className="group hover:bg-white/[0.03] transition-all duration-300">
              <td className="p-6 text-sm font-mono text-primary font-bold whitespace-nowrap">{emp.employeeId}</td>
              <td className="p-6 whitespace-nowrap">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                   </div>
                   <span className="text-sm font-bold text-white">{emp.name}</span>
                </div>
              </td>
              <td className="p-6 text-sm font-medium text-slate-400 whitespace-nowrap">{emp.department}</td>
              <td className="p-6 text-sm font-medium text-slate-400 whitespace-nowrap">{emp.role}</td>
              <td className="p-6 whitespace-nowrap">
                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                   emp.status?.toLowerCase() === 'active' || emp.status?.toLowerCase() === 'present' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                   emp.status?.toLowerCase() === 'leave' || emp.status?.toLowerCase() === 'absent' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                   'bg-white/5 text-slate-500 border-white/10'
                }`}>
                   {emp.status || 'N/A'}
                </span>
              </td>

              <td className="p-6 text-right whitespace-nowrap">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(emp)}
                    className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-primary hover:bg-primary/10 transition-all"
                    title="Edit Record"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(emp._id)}
                    className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                    title="Delete Record"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="p-20 text-center">
           <MoreHorizontal size={40} className="mx-auto text-slate-700 mb-4 animate-pulse" />
           <p className="text-slate-500 font-medium">No records found matching your filters.</p>
        </div>
      )}
    </div>
  )
}

