export default function Loader({ fullScreen = true }) {
  const containerClass = fullScreen 
    ? "flex items-center justify-center min-h-screen w-full bg-black/50 backdrop-blur-sm z-50 absolute inset-0"
    : "flex items-center justify-center p-8 w-full h-full";

  return (
    <div className={containerClass}>
      <div className="relative flex items-center justify-center">
        {/* Outer subtle ring */}
        <div className="w-16 h-16 border-4 border-white/5 rounded-full absolute"></div>
        {/* Spinning glowing ring */}
        <div className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
      </div>
    </div>
  )
}
