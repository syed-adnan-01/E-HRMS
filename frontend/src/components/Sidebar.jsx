import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  ShieldCheck,
  DollarSign,
  BarChart3,
  X,
  ChevronRight
} from "lucide-react"

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user } = useAuth()

  const menu = [
    { name: "Dashboard", path: "/dashboard", roles: ["ADMIN", "HR", "MANAGER"], icon: LayoutDashboard },
    { name: "Employees", path: "/employees", roles: ["ADMIN", "HR"], icon: Users },
    { name: "Attendance", path: "/attendance", roles: ["ADMIN", "HR", "MANAGER"], icon: CalendarCheck },
    { name: "Manage Staff", path: "/admin/manage-staff", roles: ["ADMIN"], icon: ShieldCheck },
    { name: "Payroll", path: "/payroll", roles: ["ADMIN", "HR"], icon: DollarSign },
    { name: "Reports", path: "/reports", roles: ["ADMIN", "HR"], icon: BarChart3 },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          ></motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 bg-[#0a0a0c]/80 backdrop-blur-2xl border-r border-white/5 text-slate-400 w-72 z-50 transform transition-transform duration-500 md:relative md:translate-x-0 flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-8 pb-10 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary px-3 py-1.5 rounded-xl text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center justify-center">
              <span className="text-xl font-black font-heading leading-none">W</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight font-heading">WorkSphere</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <nav className="p-6 space-y-2 flex-1 overflow-y-auto">
          <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Main Menu</p>
          {menu
            .filter(item => user && item.roles.includes(user.role))
            .map(item => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                    ? "bg-primary/10 text-primary shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]"
                    : "hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <item.icon size={20} className={`${isActive ? "text-primary" : "group-hover:text-white"} transition-colors`} />
                      <span className="font-medium text-[14px]">{item.name}</span>
                    </div>
                    {isActive && <motion.div layoutId="activeInd" className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,1)]" />}
                    {!isActive && <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />}
                  </>
                )}
              </NavLink>
            ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
            <p className="text-xs font-semibold text-primary mb-1">Enterprise Pro</p>
            <p className="text-[11px] text-slate-500领先 mb-3">Your company workspace is active.</p>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

