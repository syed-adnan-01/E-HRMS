import { NavLink } from "react-router-dom"

const menu = [
  { name: "Dashboard", path: "/" },
  { name: "Employees", path: "/employees" },
  { name: "Attendance", path: "/attendance" },
  { name: "Payroll", path: "/payroll" },
  { name: "Settings", path: "/settings" },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6 font-bold text-xl border-b">
        E-HRMS
      </div>

      <nav className="p-4 space-y-2">
        {menu.map(item => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded 
              ${isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"}`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
