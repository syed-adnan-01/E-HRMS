export default function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full bg-black/50 border border-white/10 text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
    >
      {children}
    </select>
  )
}
