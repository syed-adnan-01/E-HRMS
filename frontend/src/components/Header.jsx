import { useAuth } from "../context/AuthContext"

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold">E-HRMS</h2>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm">
            {user.username} ({user.role})
          </span>
          <button
            onClick={logout}
            className="text-sm text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  )
}
