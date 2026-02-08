/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem("ehrms_user")
    if (stored) setUser(JSON.parse(stored))
  }, [])

  function login(username, role) {
    const u = { username, role }
    setUser(u)
    localStorage.setItem("ehrms_user", JSON.stringify(u))
  }

  function logout() {
    setUser(null)
    localStorage.removeItem("ehrms_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
