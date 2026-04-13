import { useState, useRef, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { Menu, Search, Bell, LogOut, User as UserIcon, Settings, ChevronDown, Shield, Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Header({ toggleSidebar }) {
  const { user, logout } = useAuth()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const menuRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="h-20 flex-shrink-0 bg-background/50 backdrop-blur-xl border-b border-white/5 text-slate-200 flex items-center justify-between px-6 md:px-10 w-full z-30">
      <div className="flex items-center gap-6 flex-1">
        {toggleSidebar && (
          <button onClick={toggleSidebar} className="md:hidden text-slate-400 hover:text-white transition-colors focus:outline-none">
            <Menu size={24} />
          </button>
        )}
        
        <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/5 rounded-xl w-full max-w-md group focus-within:border-primary/50 transition-all">
          <Search size={18} className="text-slate-500 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search records, employees..." 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-600"
          />
        </div>
      </div>

      {user && (
        <div className="flex items-center gap-6">
          <button className="relative text-slate-400 hover:text-white transition-colors hidden sm:block">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]"></span>
          </button>

          <div className="h-8 w-[1px] bg-white/5 mx-2 hidden sm:block"></div>

          <div className="relative" ref={menuRef}>
            <div 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-1.5 rounded-2xl transition-all border border-transparent hover:border-white/5"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white leading-tight">{user.name || "User"}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.1em]">{user.role}</p>
              </div>
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-blue-600/20 border border-white/10 flex items-center justify-center text-primary group-hover:border-primary/50 transition-all shadow-inner">
                  <UserIcon size={20} />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#09090b] rounded-full"></div>
              </div>
              <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`} />
            </div>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-3 w-72 bg-[#111113] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-50 backdrop-blur-2xl"
                >
                  {/* Dropdown Header */}
                  <div className="p-6 pb-4 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <UserIcon size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold truncate">{user.name || "Administrator"}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Online</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 text-slate-400 group/item">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/item:bg-primary/10 group-hover/item:text-primary transition-colors">
                          <Mail size={14} />
                        </div>
                        <span className="text-xs font-medium truncate">{user.email || "admin@worksphere.com"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 group/item">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/item:bg-blue-500/10 group-hover/item:text-blue-400 transition-colors">
                          <Shield size={14} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">{user.role}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Actions */}
                  <div className="p-3">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all group">
                      <Settings size={18} className="group-hover:rotate-45 transition-transform duration-500" />
                      <span className="text-sm font-semibold">Account Settings</span>
                    </button>
                    
                    <div className="h-[1px] bg-white/5 my-2 mx-2"></div>
                    
                    <button 
                      onClick={() => {
                        setIsProfileOpen(false)
                        logout()
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-2xl transition-all group"
                    >
                      <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                      <span className="text-sm font-bold">Sign Out</span>
                    </button>
                  </div>

                  {/* Dropdown Footer */}
                  <div className="bg-white/5 p-4 text-center">
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">WorkSphere Pro v1.0</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </header>
  )
}


