import { useNavigate } from "react-router-dom"

export default function LandingPage() {
    const navigate = useNavigate()
    const handleGetStarted = () => {
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-black font-sans selection:bg-blue-500/30 text-white flex flex-col">

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 p-6 bg-black/50 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-2 rounded-xl text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">WorkSphere</span>
                    </div>

                    <button
                        onClick={handleGetStarted}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative flex-1 flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none"></div>

                <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium mb-8">
                        <span className="flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,1)]"></span>
                        Enterprise HR Management System
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 max-w-4xl">
                        Streamline your workforce with <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-500">
                            WorkSphere
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
                        The ultimate platform to automate payroll, track attendance, and manage performance. Say goodbye to manual HR tasks and empower your team to focus on what matters most.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleGetStarted}
                            className="px-8 py-4 text-white bg-blue-600 rounded-full font-bold text-lg hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Get Started
                        </button>
                        <a
                            href="#features"
                            className="px-8 py-4 text-white bg-white/5 border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            Learn More
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </a>
                    </div>
                </div>

                {/* Learn More / Features Section */}
                <div id="features" className="relative z-10 container mx-auto px-6 mt-32 pb-20 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 inline-block pb-2">
                            Everything you need to scale your team
                        </h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
                            WorkSphere replaces fragmented tools with a single, intuitive platform to manage your entire employee lifecycle from onboarding to performance reviews.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Attendance Tracking</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">Automate time tracking, monitor absences, and manage leave requests effortlessly. Our smart dashboard gives managers a real-time overview of who is in the office.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Automated Payroll</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">Say goodbye to spreadsheet anxiety. Generate error-free runs, automate tax calculations, and distribute secure payslips in a fraction of your usual time.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Performance Analytics</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">Establish clear KPIs, conduct data-driven performance reviews, and identify top talent rapidly to align individual growth with company success.</p>
                        </div>
                    </div>

                    {/* Deep Dive Details */}
                    <div className="rounded-3xl bg-white/[0.03] border border-white/5 p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 mx-auto relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
                        
                        <div className="flex-1 space-y-6 relative z-10 w-full">
                            <h3 className="text-3xl font-bold text-white">Why Modern Enterprises Choose WorkSphere</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Traditional HR software is clunky, isolated, and painful for employees to use. WorkSphere is built from the ground up to empower both HR leaders and their workforce alike. 
                            </p>
                            <ul className="space-y-4 pt-4">
                                <li className="flex items-center gap-4 text-gray-300">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <span><strong>Complete Security</strong> — Robust role-based access for Admins, HR, and Staff.</span>
                                </li>
                                <li className="flex items-center gap-4 text-gray-300">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <span><strong>Unified Dashboards</strong> — Stop context switching between different apps.</span>
                                </li>
                                <li className="flex items-center gap-4 text-gray-300">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <span><strong>Lightning Fast</strong> — Designed with modern aesthetics and zero latency.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full max-w-md bg-black/60 rounded-2xl border border-white/10 p-6 backdrop-blur-md relative z-10 transition-transform hover:scale-[1.02] duration-300">
                           <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                               <h4 className="text-white font-semibold flex items-center gap-2">
                                   <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                   Live Activity
                               </h4>
                               <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]">JS</div>
                           </div>
                           
                           <div className="space-y-4">
                               {/* Mock Activity 1 */}
                               <div className="flex items-center gap-4 group">
                                  <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-200">Payroll Approved</p>
                                    <p className="text-xs text-gray-500">October run processed</p>
                                  </div>
                                  <span className="text-xs text-gray-400 font-mono">2m ago</span>
                               </div>
                               
                               {/* Mock Activity 2 */}
                               <div className="flex items-center gap-4 group">
                                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-200">Sarah Connor</p>
                                    <p className="text-xs text-gray-500">Requested 2 days of PTO</p>
                                  </div>
                                  <span className="text-xs text-gray-400 font-mono">1h ago</span>
                               </div>
                               
                               {/* Mock Activity 3 */}
                               <div className="flex items-center gap-4 group">
                                  <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-200">New Onboarding</p>
                                    <p className="text-xs text-gray-500">John joined Engineering</p>
                                  </div>
                                  <span className="text-xs text-gray-400 font-mono">3h ago</span>
                               </div>
                           </div>
                           
                           <div className="mt-6 pt-6 border-t border-white/10 flex gap-4">
                               <div className="flex-1 bg-gradient-to-br from-blue-600/20 to-blue-600/5 hover:from-blue-600/30 border border-blue-500/20 rounded-xl p-4 transition-colors">
                                   <p className="text-xs text-blue-400 font-medium mb-1">Active Staff</p>
                                   <p className="text-3xl font-bold text-white">124</p>
                                   <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-medium">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                                        +4 this month
                                   </p>
                               </div>
                               <div className="flex-1 bg-gradient-to-br from-emerald-600/20 to-emerald-600/5 hover:from-emerald-600/30 border border-emerald-500/20 rounded-xl p-4 transition-colors">
                                   <p className="text-xs text-emerald-400 font-medium mb-1">Open Roles</p>
                                   <p className="text-3xl font-bold text-white">8</p>
                                   <p className="text-xs text-red-400 mt-2 flex items-center gap-1 font-medium">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                                        -2 this week
                                   </p>
                               </div>
                           </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-black py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-1.5 rounded-lg text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                        </div>
                        <span className="text-lg font-bold text-white tracking-tight">WorkSphere</span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} WorkSphere HRMS. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Terms of Service</a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
