export default function Card({ children, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-[2.5rem] bg-[#111113]/50 backdrop-blur-3xl border border-white/[0.05] p-8 shadow-2xl ${className}`}>
      {/* Subtle corner glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

