export default function KpiCard({ title, value, subtext }) {
  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl w-full p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] group">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-[30px] group-hover:bg-blue-500/20 transition-colors"></div>
      <p className="text-sm font-medium text-gray-400 z-10 relative">{title}</p>
      <p className="text-3xl font-bold text-white mt-2 z-10 relative">{value}</p>
      {subtext && (
        <p className="text-xs text-gray-500 mt-2 z-10 relative">{subtext}</p>
      )}
    </div>
  )
}
