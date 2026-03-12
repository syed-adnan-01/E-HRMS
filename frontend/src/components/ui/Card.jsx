export default function Card({ children }) {
  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 relative overflow-hidden z-10 w-full mb-6 relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[50px] pointer-events-none"></div>
      {children}
    </div>
  )
}
