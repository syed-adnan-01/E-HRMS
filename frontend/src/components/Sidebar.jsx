import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Sidebar() {
  const { user } = useAuth()

  const menu = [
    { name: "Dashboard", path: "/", roles: ["ADMIN", "HR", "MANAGER"] },
    { name: "Employees", path: "/employees", roles: ["ADMIN", "HR"] },
    { name: "Attendance", path: "/attendance", roles: ["ADMIN", "HR", "MANAGER"] },
    { name: "Payroll", path: "/payroll", roles: ["ADMIN", "HR"] },
    { name: "Reports", path: "/reports", roles: ["ADMIN", "HR"] },
  ]

  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6 font-bold text-xl border-b">E-HRMS</div>

      <nav className="p-4 space-y-2">
        {menu
          .filter(item => user && item.roles.includes(user.role))
          .map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
      </nav>
    </aside>
  )
}
