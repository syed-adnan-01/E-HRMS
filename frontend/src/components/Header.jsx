import { useAuth } from "../context/AuthContext"
import { Menu, Search, Bell, LogOut, User as UserIcon } from "lucide-react"

export default function Header({ toggleSidebar }) {
  const { user, logout } = useAuth()

  return (
    <header className="h-20 flex-shrink-0 bg-background/50 backdrop-blur-xl border-b border-white/5 text-slate-200 flex items-center justify-between px-6 md:px-10 w-full z-20">
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
          <button className="relative text-slate-400 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]"></span>
          </button>

          <div className="h-8 w-[1px] bg-white/5 mx-2"></div>

          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white leading-tight">{user.username}</p>
              <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{user.role}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-blue-600/20 border border-white/10 flex items-center justify-center text-primary group-hover:border-primary/50 transition-all">
              <UserIcon size={20} />
            </div>
            
            <button
              onClick={logout}
              className="p-2 text-slate-500 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

