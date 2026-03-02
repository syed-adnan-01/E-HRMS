import { useAuth } from "../context/AuthContext"

export default function Header({ toggleSidebar }) {
  const { user, logout } = useAuth()

  return (
    <header className="h-16 flex-shrink-0 bg-slate-900 border-b border-slate-800 text-slate-200 flex items-center justify-between px-4 md:px-6 w-full">
      <div className="flex items-center gap-3">
        {toggleSidebar && (
          <button onClick={toggleSidebar} className="md:hidden text-slate-400 hover:text-white transition-colors focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        )}
        <h2 className="text-lg font-semibold truncate max-w-[150px] sm:max-w-none">E-HRMS</h2>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm">
            {user.username} ({user.role})
          </span>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  )
}
