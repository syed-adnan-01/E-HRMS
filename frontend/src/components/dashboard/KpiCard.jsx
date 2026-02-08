export default function KpiCard({ title, value, subtext }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
      {subtext && (
        <p className="text-xs text-gray-400 mt-1">{subtext}</p>
      )}
    </div>
  )
}
