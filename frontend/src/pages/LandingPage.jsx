import { useNavigate } from "react-router-dom"

export default function LandingPage() {
    const navigate = useNavigate()
    const handleGetStarted = () => {
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-slate-950 font-sans selection:bg-blue-500/30 text-slate-200">

            {/* Navigation */}
            <nav className="absolute top-0 w-full z-10 p-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                            
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">E-HRMS</span>
                    </div>

                    <button
                        onClick={handleGetStarted}
                        className="px-6 py-2.5 text-sm font-semibold text-slate-100 bg-slate-800/80 border border-slate-700 backdrop-blur-sm rounded-full hover:bg-blue-600 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden pt-20">

                {/* Background decorative elements */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob animation-delay-4000"></div>

                <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-sm font-medium mb-8 animate-fade-in-up shadow-[0_0_10px_rgba(59,130,246,0.2)] backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_5px_rgba(96,165,250,0.8)]"></span>
                        Enterprise HR Management
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 animate-fade-in-up animation-delay-100 max-w-4xl drop-shadow-lg">
                        Empower your team with <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 drop-shadow-[0_0_12px_rgba(96,165,250,0.4)]">
                            seamless management.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed animate-fade-in-up animation-delay-200">
                        A comprehensive solution for tracking attendance, running payroll, evaluating performance, and driving employee success—all in one beautiful interface.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
                        <button
                            onClick={handleGetStarted}
                            className="px-8 py-4 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full font-bold text-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all duration-300 ease-in-out transform hover:-translate-y-1 relative before:absolute before:inset-0 before:rounded-full before:bg-white/20 before:w-full before:h-full before:scale-0 hover:before:scale-100 before:transition-transform before:duration-300 overflow-hidden"
                        >
                            <span className="relative z-10">Start for free</span>
                        </button>
                        <a
                            href="#features"
                            className="px-8 py-4 text-slate-300 bg-slate-800/50 border border-slate-700 backdrop-blur-sm rounded-full font-bold text-lg hover:bg-slate-800 hover:text-white hover:border-slate-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            Learn more
                            <svg className="w-5 h-5 group-hover:translate-x-1 group-hover:text-blue-400 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </a>
                    </div>
                </div>

                {/* Mockup / Dashboard Preview */}
                <div className="relative mt-20 w-full max-w-5xl px-6 animate-fade-in-up animation-delay-400 group">
                    {/* Outer glow ring wrapper */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative rounded-2xl bg-slate-900 border border-slate-700/50 p-2 shadow-2xl overflow-hidden backdrop-blur-md">
                        {/* Top Bar Fake */}
                        <div className="bg-slate-800/80 rounded-t-xl h-8 flex items-center gap-1.5 px-4 mb-1">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="w-full aspect-[16/9] bg-slate-950 rounded-b-xl border border-slate-800 shadow-inner flex overflow-hidden">
                            {/* Dashboard Mock Content */}
                            <div className="w-48 bg-slate-900/50 border-r border-slate-800 p-4 hidden md:block backdrop-blur-sm">
                                <div className="h-6 w-24 bg-slate-700/50 rounded mb-8 glow-pulse"></div>
                                <div className="space-y-4">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="h-4 w-full bg-slate-800/80 rounded"></div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 p-6 sm:p-8">
                                <div className="flex justify-between mb-8">
                                    <div className="h-8 w-40 bg-slate-800 rounded"></div>
                                    <div className="h-8 w-8 bg-slate-800 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.05)]"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="h-24 bg-slate-800/40 border border-slate-700/50 shadow-sm rounded-xl p-4 flex flex-col justify-end relative overflow-hidden group/card hover:border-blue-500/30 transition-colors">
                                            {/* card subtle glow */}
                                            <div className="absolute -inset-2 bg-blue-500/5 opacity-0 group-hover/card:opacity-100 blur transition-opacity"></div>
                                            <div className="h-3 w-1/2 bg-slate-700/50 rounded mb-2"></div>
                                            <div className="h-6 w-3/4 bg-slate-600 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="h-48 bg-slate-800/30 border border-slate-700/50 shadow-sm rounded-xl w-full p-4 relative overflow-hidden">
                                    <div className="h-full w-full bg-gradient-to-tr from-slate-900/80 to-slate-800/30 rounded flex items-end px-4 gap-2 pb-2">
                                        {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                                            <div key={i} className={`w-full bg-blue-500/80 rounded-t shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-500 hover:bg-blue-400 hover:shadow-[0_0_15px_rgba(96,165,250,0.8)]`} style={{ height: `${h}%` }}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main >


            <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .glow-pulse {
          animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; box-shadow: 0 0 5px rgba(59,130,246,0.2); }
          50% { opacity: .7; box-shadow: 0 0 15px rgba(59,130,246,0.6); }
        }
      `}</style>
        </div >
    )
}
