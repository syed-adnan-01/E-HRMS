import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user } = useAuth()

  const menu = [
    { name: "Dashboard", path: "/dashboard", roles: ["ADMIN", "HR", "MANAGER"] },
    { name: "Employees", path: "/employees", roles: ["ADMIN", "HR"] },
    { name: "Attendance", path: "/attendance", roles: ["ADMIN", "HR", "MANAGER"] },
    { name: "Payroll", path: "/payroll", roles: ["ADMIN", "HR"] },
    { name: "Reports", path: "/reports", roles: ["ADMIN", "HR"] },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 bg-slate-900 border-r border-slate-800 text-slate-300 w-64 z-30 transform transition-transform duration-300 md:relative md:translate-x-0 flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-6 font-bold text-xl border-b border-slate-800 text-white flex justify-between items-center">
          WorkSphere
          <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {menu
            .filter(item => user && item.roles.includes(user.role))
            .map(item => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded transition-colors ${isActive ? "bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]" : "hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
        </nav>
      </aside>
    </>
  )
}
