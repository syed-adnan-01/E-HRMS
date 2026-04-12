import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api/axios"
import { motion } from "framer-motion"
import {
    ArrowRight,
    Clock,
    Banknote,
    BarChart3,
    CheckCircle2,
    Zap,
    Activity,
    ChevronRight,
    ShieldAlert
} from "lucide-react"

export default function LandingPage() {
    const navigate = useNavigate()
    const [adminData, setAdminData] = useState({ name: '', email: '', companyName: '' })
    const [loading, setLoading] = useState(false)

    const handleAdminRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await api.post("/admin/register", adminData)
            alert(response.data.message || "Registration request sent successfully!")
            setAdminData({ name: '', email: '', companyName: '' })
        } catch (error) {
            console.error("Registration error:", error)
            alert(error.response?.data?.message || "Failed to submit registration request.")
        } finally {
            setLoading(false)
        }
    }

    const handleGetStarted = () => navigate('/login')

    const fadeInHeader = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }

    return (
        <div className="min-h-screen bg-background font-sans selection:bg-primary/30 text-white flex flex-col relative overflow-hidden">
            {/* Background Effects */}
            <div className="ambient-glow top-0 left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full animate-pulse-slow"></div>
            <div className="ambient-glow bottom-0 right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full animate-slow-drift"></div>
            <div className="absolute inset-0 bg-dot-pattern opacity-[0.1] pointer-events-none"></div>

            {/* Navigation */}
            <motion.nav
                variants={fadeInHeader}
                initial="hidden"
                animate="visible"
                className="fixed top-0 w-full z-50 p-6 bg-background/50 backdrop-blur-xl border-b border-white/5"
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary px-2.5 py-1 rounded-xl text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center">
                            <span className="text-lg font-black font-heading leading-none">W</span>
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tighter font-heading">WorkSphere</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/super-login"
                            className="hidden md:flex items-center gap-2 px-4 py-2 text-[10px] font-bold text-slate-500 hover:text-white transition-all duration-300 uppercase tracking-[0.2em] group"
                        >
                            <ShieldAlert size={14} className="group-hover:text-amber-400 transition-colors" />
                            Super Login
                        </Link>
                        <button
                            onClick={handleGetStarted}
                            className="px-6 py-2.5 text-sm font-bold text-white bg-primary rounded-2xl hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all active:scale-95"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <main className="relative flex-1 flex flex-col items-center pt-48 pb-20 z-10">
                <div className="container mx-auto px-6 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-10"
                    >
                        <Zap size={12} fill="currentColor" />
                        Next-Gen Enterprise Management
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-10 max-w-5xl font-heading"
                    >
                        Master your workforce <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-primary">
                            without the friction.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-lg md:text-xl text-slate-400 max-w-2xl mb-14 leading-relaxed font-medium"
                    >
                        WorkSphere simplifies payroll, attendance, and performance analytics into one high-performance interface. Designed for teams that value speed and precision.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-6"
                    >
                        <button
                            onClick={handleGetStarted}
                            className="px-10 py-5 text-white bg-primary rounded-3xl font-bold text-lg hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all flex items-center gap-3 active:scale-95"
                        >
                            Get Started Free
                            <ArrowRight size={20} />
                        </button>
                        <a
                            href="#features"
                            className="px-10 py-5 text-white bg-white/5 border border-white/10 rounded-3xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
                        >
                            View Features
                        </a>
                    </motion.div>
                </div>

                {/* Features Section */}
                <div id="features" className="container mx-auto px-6 mt-48 pb-20 max-w-7xl">
                    <div className="text-center mb-24">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-4xl md:text-6xl font-black text-white mb-6 font-heading tracking-tight"
                        >
                            Built for scale.
                        </motion.h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
                            Say goodbye to fragmented tools. WorkSphere provides a unified architecture for your entire employee lifecycle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Smart Attendance", desc: "Real-time presence monitoring with automated leave logic.", icon: Clock },
                            { title: "Dynamic Payroll", desc: "Automated tax calculations and instant payslip generation.", icon: Banknote },
                            { title: "Growth Metrics", desc: "Data-driven performance reviews and KPI tracking.", icon: BarChart3 }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-10 rounded-[2.5rem] bg-[#111113]/50 border border-white/5 hover:border-primary/50 transition-all group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all text-primary group-hover:scale-110">
                                    <feature.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 font-heading">{feature.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Stats Widget */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mt-32 rounded-[3.5rem] bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 p-12 md:p-16 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>

                        <div className="flex-1 space-y-8 relative z-10 w-full">
                            <h3 className="text-4xl font-black text-white font-heading leading-tight">The industry <br /> benchmark.</h3>
                            <div className="space-y-6">
                                {[
                                    "Complete role-based security (Admin, HR, Staff)",
                                    "Zero-latency unified data synchronization",
                                    "Exportable enterprise-grade reporting"
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-4 text-slate-300 font-medium text-lg">
                                        <div className="bg-primary/20 text-primary p-1.5 rounded-full">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        {text}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full max-w-md bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 relative z-10 shadow-3xl">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-3">
                                    <Activity className="text-primary" />
                                    <span className="text-white font-bold tracking-tight">System Status</span>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">Operational</div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <span className="text-slate-400 text-sm font-bold">Latency</span>
                                    <span className="text-white font-mono font-bold">14ms</span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <span className="text-slate-400 text-sm font-bold">Uptime</span>
                                    <span className="text-white font-mono font-bold">99.98%</span>
                                </div>
                                <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
                                    <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Total Managed Staff</p>
                                    <h4 className="text-4xl font-extrabold text-white font-heading">4,281</h4>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Admin Registration Section */}
                <div id="admin-register" className="container mx-auto px-6 mt-48 pb-20 max-w-4xl relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative p-12 md:p-16 rounded-[3.5rem] bg-[#111113]/50 border border-white/5 backdrop-blur-3xl overflow-hidden shadow-3xl"
                    >
                        {/* Decorative Background Glows */}
                        <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"></div>
                        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px]"></div>

                        <div className="relative z-10">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-heading tracking-tight">Register as Admin</h2>
                                <p className="text-slate-500 text-lg font-medium">Empower your team. Deploy your company's workspace in seconds.</p>
                            </div>

                            <form onSubmit={handleAdminRegister} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Full Name</label>
                                        <input 
                                            type="text"
                                            required
                                            placeholder="Enter your name"
                                            value={adminData.name}
                                            onChange={(e) => setAdminData({...adminData, name: e.target.value})}
                                            className="w-full px-6 py-5 rounded-3xl bg-white/5 border border-white/10 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Corporate Email</label>
                                        <input 
                                            type="email"
                                            required
                                            placeholder="name@company.com"
                                            value={adminData.email}
                                            onChange={(e) => setAdminData({...adminData, email: e.target.value})}
                                            className="w-full px-6 py-5 rounded-3xl bg-white/5 border border-white/10 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Organization Name</label>
                                    <input 
                                        type="text"
                                        required
                                        placeholder="Enter your organization"
                                        value={adminData.companyName}
                                        onChange={(e) => setAdminData({...adminData, companyName: e.target.value})}
                                        className="w-full px-6 py-5 rounded-3xl bg-white/5 border border-white/10 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all font-medium"
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-6 mt-8 bg-primary hover:bg-blue-500 text-white font-bold text-xl rounded-3xl shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all transform active:scale-95 flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                            Deploying Workspace...
                                        </>
                                    ) : (
                                        <>
                                            Register Workspace
                                            <ArrowRight size={22} />
                                        </>
                                    )}
                                </button>
                            </form>
                            
                            <p className="text-center mt-12 text-[11px] font-bold uppercase tracking-widest text-slate-600">
                                Protected by Enterprise Grade SSL • Instant Deployment
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Section - Simplified & Refined */}
                <footer className="w-full border-t border-white/5 mt-32 py-20 px-6">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary px-2 py-0.5 rounded-lg text-white flex items-center justify-center">
                                <span className="text-sm font-black font-heading leading-none">W</span>
                            </div>
                            <span className="text-xl font-bold text-white tracking-tighter">WorkSphere</span>
                        </div>
                        <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Support</a>
                            <Link to="/super-login" className="text-primary hover:underline">Super Admin Portal</Link>
                        </div>
                        <p className="text-slate-600 text-xs">
                            © {new Date().getFullYear()} WorkSphere Engineering.
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    )
}

